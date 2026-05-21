import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";

const TopBar = () => {
  const [indices, setIndices] = useState([
    { name: "NIFTY 50", price: "22,040.70", change: "+0.35%", isDown: false },
    { name: "SENSEX", price: "72,641.10", change: "-0.12%", isDown: true }
  ]);

  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const response = await axios.get("http://localhost:3002/indexIndices");
        setIndices(response.data);
      } catch (err) {
        console.error("Error fetching indices:", err);
      }
    };
    fetchIndices();
    const interval = setInterval(fetchIndices, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  const nifty = indices.find(i => i.name === "NIFTY 50") || indices[0];
  const sensex = indices.find(i => i.name === "SENSEX") || indices[1];

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{nifty.price} <span className={nifty.isDown ? "down" : "up"}>{nifty.change}</span></p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{sensex.price} <span className={sensex.isDown ? "down" : "up"}>{sensex.change}</span></p>
        </div>
      </div>
      <div className="topbar-menu-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Menu />
      </div>
    </div>
  );
};

export default TopBar;
