import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { API_URL } from "../config";

const Profile = () => {
  const { user, refetchTrigger } = useContext(GeneralContext);
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const holdingsRes = await axios.get(`${API_URL}/allHoldings`);
        setHoldings(holdingsRes.data);

        const positionsRes = await axios.get(`${API_URL}/allPositions`);
        setPositions(positionsRes.data);

        const ordersRes = await axios.get(`${API_URL}/allOrders`);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };
    fetchProfileData();
  }, [refetchTrigger]);

  const balance = user && typeof user.balance === "number" ? user.balance : 0.0;
  
  // Calculations
  let totalInvestment = 0;
  let currentValue = 0;
  holdings.forEach((stock) => {
    totalInvestment += stock.avg * stock.qty;
    currentValue += stock.price * stock.qty;
  });
  
  let positionsPnl = 0;
  positions.forEach((stock) => {
    positionsPnl += (stock.price - stock.avg) * stock.qty;
  });

  const totalPortfolioValue = currentValue + balance;
  const totalPnl = (currentValue - totalInvestment) + positionsPnl;
  const isProfit = totalPnl >= 0;

  return (
    <div className="page-content profile-page">
      <h2 className="title">My Profile</h2>
      <hr className="divider" />

      <div className="profile-grid">
        {/* User Card */}
        <div className="profile-card user-info-card">
          <div className="profile-avatar-large">
            {user && user.username ? user.username.charAt(0).toUpperCase() : "A"}
          </div>
          <div className="profile-details-content">
            <h3>{user && user.username ? user.username : "AFRID"}</h3>
            <p className="profile-role">Retail Investor</p>
            <div className="profile-meta-item">
              <EmailIcon className="meta-icon" />
              <span>{user && user.email ? user.email : "user@example.com"}</span>
            </div>
            <div className="profile-meta-item">
              <AccountCircleIcon className="meta-icon" />
              <span>Client ID: ZER-{user && user.id ? user.id.slice(-6).toUpperCase() : "123456"}</span>
            </div>
          </div>
        </div>

        {/* Account Funds Summary */}
        <div className="profile-card stats-card">
          <div className="card-header-icon">
            <AccountBalanceWalletIcon className="card-icon" style={{ color: "#387ed1" }} />
            <h4>Funds Status</h4>
          </div>
          <div className="card-stat-row">
            <div className="stat-item">
              <span className="stat-label">Available Margin</span>
              <span className="stat-val">₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Portfolio Value</span>
              <span className="stat-val">₹{totalPortfolioValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="profile-card stats-card">
          <div className="card-header-icon">
            <ShowChartIcon className="card-icon" style={{ color: isProfit ? "#4caf50" : "#df514c" }} />
            <h4>Portfolio Performance</h4>
          </div>
          <div className="card-stat-row">
            <div className="stat-item">
              <span className="stat-label">Total Invested</span>
              <span className="stat-val">₹{totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Overall Profit / Loss</span>
              <span className={`stat-val ${isProfit ? "up" : "down"}`}>
                {isProfit ? "+" : ""}{totalPnl.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Activity & Trades Summary */}
        <div className="profile-card stats-card">
          <div className="card-header-icon">
            <ReceiptLongIcon className="card-icon" style={{ color: "#ff9800" }} />
            <h4>Activity Metrics</h4>
          </div>
          <div className="card-stat-row">
            <div className="stat-item">
              <span className="stat-label">Holdings Count</span>
              <span className="stat-val">{holdings.length} stocks</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Placed Orders</span>
              <span className="stat-val">{orders.length} orders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
