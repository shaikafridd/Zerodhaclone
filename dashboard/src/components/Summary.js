import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const { user, refetchTrigger } = useContext(GeneralContext);
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const username = user && user.username ? user.username : "AFRID";
  
  const balance = user && typeof user.balance === "number" ? user.balance : 0.0;
  const formattedBalance = balance.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const holdingsRes = await axios.get("http://localhost:3002/allHoldings");
        setHoldings(holdingsRes.data);

        const positionsRes = await axios.get("http://localhost:3002/allPositions");
        setPositions(positionsRes.data);
      } catch (err) {
        console.error("Error fetching summary data:", err);
      }
    };
    fetchSummaryData();
  }, [refetchTrigger]);

  // Holdings Calculations
  let totalInvestment = 0;
  let currentValue = 0;
  holdings.forEach((stock) => {
    totalInvestment += stock.avg * stock.qty;
    currentValue += stock.price * stock.qty;
  });
  const holdingsPnl = currentValue - totalInvestment;
  const isHoldingsProfit = holdingsPnl >= 0;

  // Positions Calculations
  let positionsPnl = 0;
  positions.forEach((stock) => {
    positionsPnl += (stock.price - stock.avg) * stock.qty;
  });
  const isPositionsProfit = positionsPnl >= 0;

  const formatKOrValue = (val) => {
    if (Math.abs(val) >= 1000) {
      return (val / 1000).toFixed(1) + "k";
    }
    return val.toFixed(2);
  };

  return (
    <div className="page-content">
      <h2 className="title">Hi, {username}</h2>
      <hr className="divider" />
      <div className="summary-section row">
        <div className="col">
          <div className="section-header">
            <h3>Equity</h3>
          </div>
          <div className="section-content">
            <div className="margin-data">
              <h1 className="margin">₹ {formattedBalance}</h1>
              <p>Margin available</p>
            </div>
            <div className="margin-data">
              <p>Margins used <span>₹ 0.00</span></p>
              <p>Opening balance <span>₹ {formattedBalance}</span></p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="section-header">
            <h3>Holdings ({holdings.length})</h3>
          </div>
          <div className="section-content">
            <div className="holding-data">
              <h1 className={isHoldingsProfit ? "up" : "down"}>
                {isHoldingsProfit ? "+" : ""}{holdingsPnl.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h1>
              <p>P&L</p>
            </div>
            <div className="holding-data row">
              <div>
                <p className="val">₹ {formatKOrValue(currentValue)}</p>
                <p>Current value</p>
              </div>
              <div>
                <p className="val">₹ {formatKOrValue(totalInvestment)}</p>
                <p>Investment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="summary-section row">
        <div className="col">
          <div className="section-header">
            <h3>Positions ({positions.length})</h3>
          </div>
          <div className="section-content">
            <div className="holding-data">
              <h1 className={isPositionsProfit ? "up" : "down"}>
                {isPositionsProfit ? "+" : ""}{positionsPnl.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h1>
              <p>P&L</p>
            </div>
            <div className="holding-data row">
              <div>
                <p className="val">Current</p>
                <p>Positions</p>
              </div>
              <div>
                <p className="val">{positions.length}</p>
                <p>Active</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          {/* Empty col to maintain flex spacing */}
        </div>
      </div>
    </div>
  );
};

export default Summary;
