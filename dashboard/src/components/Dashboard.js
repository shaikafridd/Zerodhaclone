import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import WatchList from "./WatchList";
import Summary from "./Summary";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import Funds from "./Funds";
import Apps from "./Apps";
import Profile from "./Profile";
import BuyActionWindow from "./BuyActionWindow";

const Dashboard = () => {
  const [isWatchListOpen, setIsWatchListOpen] = useState(false);

  return (
    <div className={`dashboard-container ${isWatchListOpen ? "watchlist-open" : ""}`}>
      <div className="watchlist-drawer-wrapper">
        <WatchList isDrawerOpen={isWatchListOpen} />
      </div>
      
      {isWatchListOpen && (
        <div className="drawer-backdrop" onClick={() => setIsWatchListOpen(false)}></div>
      )}

      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <BuyActionWindow />

      {/* Floating Action Button for mobile Watchlist */}
      <button 
        className="watchlist-toggle-fab" 
        onClick={() => setIsWatchListOpen(!isWatchListOpen)}
        aria-label="Toggle Watchlist"
      >
        <ListIcon style={{ fontSize: "28px" }} />
      </button>
    </div>
  );
};

export default Dashboard;
