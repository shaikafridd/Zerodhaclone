import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from "@mui/icons-material/Delete";
import GeneralContext from "./GeneralContext";
import DoughnutChart from "./DoughnutChart";

const WatchList = ({ isDrawerOpen }) => {
  const [watchlistData, setWatchlistData] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("watchlist_favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [watchlistUpdated, setWatchlistUpdated] = useState(0);

  const { openBuyWindow, openSellWindow, refetchTrigger } = useContext(GeneralContext);
  const doughnutChartRef = useRef(null);

  const handleScrollToChart = () => {
    doughnutChartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnalytics = (stockName) => {
    window.open(`https://www.google.com/finance/quote/${stockName}:NSE`, "_blank");
  };

  const toggleFavorite = (stockName) => {
    setFavorites((prev) => {
      const updated = prev.includes(stockName)
        ? prev.filter((name) => name !== stockName)
        : [...prev, stockName];
      localStorage.setItem("watchlist_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  // Search autocomplete
  useEffect(() => {
    const searchStocks = async () => {
      if (searchQuery.trim().length === 0) {
        setSearchResults([]);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3002/searchSymbol?q=${searchQuery}`);
        setSearchResults(response.data);
      } catch (err) {
        console.error("Error searching symbol:", err);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      searchStocks();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Fetch Watchlist
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get("http://localhost:3002/watchlist");
        setWatchlistData(response.data);
      } catch (err) {
        console.error("Error fetching live watchlist data", err);
      }
    };

    fetchWatchlist();
  }, [watchlistUpdated, refetchTrigger]);

  const handleAddToWatchlist = async (symbol) => {
    try {
      await axios.post("http://localhost:3002/watchlist/add", { symbol });
      setSearchQuery("");
      setSearchResults([]);
      setWatchlistUpdated(prev => prev + 1);
    } catch (err) {
      console.error("Error adding to watchlist:", err);
    }
  };

  const handleRemoveFromWatchlist = async (stock) => {
    try {
      const fullSymbol = stock.symbol || `${stock.name}.NS`;
      await axios.post("http://localhost:3002/watchlist/remove", { symbol: fullSymbol });
      setWatchlistUpdated(prev => prev + 1);
    } catch (err) {
      console.error("Error removing from watchlist:", err);
    }
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input 
          type="text" 
          name="search" 
          id="search" 
          placeholder="Search eg: infy, bse, nifty fut" 
          className="search" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
        <span className="counts">{watchlistData.length} / 50</span>

        {searchResults.length > 0 && (
          <ul className="search-results-dropdown">
            {searchResults.slice(0, 10).map((result, idx) => {
              const isAlreadyInWatchlist = watchlistData.some(w => w.name.toUpperCase() === result.name.toUpperCase());
              return (
                <li key={idx} className="search-result-item">
                  <div className="result-details">
                    <span className="result-symbol">{result.symbol}</span>
                    <span className="result-name">{result.name}</span>
                  </div>
                  <div className="result-actions">
                    <span className="result-exchange">{result.exchange}</span>
                    <button 
                      className="add-to-watchlist-btn"
                      onClick={() => handleAddToWatchlist(result.symbol)}
                      disabled={isAlreadyInWatchlist}
                    >
                      {isAlreadyInWatchlist ? "Added" : "Add"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <ul className="list">
        {watchlistData.map((stock, index) => {
          const isFav = favorites.includes(stock.name);
          return (
            <li className="item" key={index}>
              <p className={stock.isDown ? "item-name down" : "item-name up"}>{stock.name}</p>
              <div className="item-info">
                <span className="percent">
                  <span className={stock.isDown ? "down" : "up"}>
                    {stock.isDown ? <KeyboardArrowDownIcon className="arrow-icon"/> : <KeyboardArrowUpIcon className="arrow-icon"/>}
                    {stock.percent}
                  </span>
                </span>
                <span className={`item-price ${stock.isDown ? 'down' : 'up'}`}>{stock.price.toFixed(2)}</span>
              </div>
              <div className="item-action">
                <Tooltip title="Buy (B)" placement="top" arrow TransitionProps={{ timeout: 0 }}>
                  <button className="action-btn buy" onClick={() => openBuyWindow(stock)}>B</button>
                </Tooltip>
                <Tooltip title="Sell (S)" placement="top" arrow TransitionProps={{ timeout: 0 }}>
                  <button className="action-btn sell" onClick={() => openSellWindow(stock)}>S</button>
                </Tooltip>
                <Tooltip title="Analytics (A)" placement="top" arrow TransitionProps={{ timeout: 0 }}>
                  <button className="action-btn" onClick={() => handleAnalytics(stock.name)}><BarChartOutlinedIcon className="icon" /></button>
                </Tooltip>
                <Tooltip title="Chart (C)" placement="top" arrow TransitionProps={{ timeout: 0 }}>
                  <button className="action-btn" onClick={handleScrollToChart}><ShowChartIcon className="icon" /></button>
                </Tooltip>
                <Tooltip title={isFav ? "Remove Favorite" : "Add Favorite"} placement="top" arrow TransitionProps={{ timeout: 0 }}>
                  <button className="action-btn" onClick={() => toggleFavorite(stock.name)}>
                    {isFav 
                      ? <FavoriteIcon className="icon" style={{ color: "#e74c3c" }} /> 
                      : <FavoriteBorderIcon className="icon" />
                    }
                  </button>
                </Tooltip>
                <Tooltip title="Remove Stock" placement="top" arrow TransitionProps={{ timeout: 0 }}>
                  <button className="action-btn" onClick={() => handleRemoveFromWatchlist(stock)}>
                    <DeleteIcon className="icon" style={{ color: "#e74c3c" }} />
                  </button>
                </Tooltip>
              </div>
            </li>
          );
        })}
        <li ref={doughnutChartRef} style={{ listStyle: "none" }}>
          <DoughnutChart data={watchlistData} isDrawerOpen={isDrawerOpen} />
        </li>
      </ul>
    </div>
  );
};

export default WatchList;
