import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import GeneralContext from "./GeneralContext";
import { API_URL } from "../config";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const { user, setUser } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleProfileMenuClick = () => {
    setIsProfileDropdownOpen(false);
    setSelectedMenu("profile");
    navigate("/profile");
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/logout`);
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const username = user && user.username ? user.username : "AFRID";

  return (
    <div className="menu-container">
      <img src="/logo.png" alt="logo" className="logo" />
      
      <button 
        className="mobile-hamburger-btn" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle Navigation"
      >
        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div className={`menus ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => { setSelectedMenu("dashboard"); setIsMobileMenuOpen(false); }}>
              <p className={selectedMenu === "dashboard" ? "menu selected" : "menu"}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => { setSelectedMenu("orders"); setIsMobileMenuOpen(false); }}>
              <p className={selectedMenu === "orders" ? "menu selected" : "menu"}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => { setSelectedMenu("holdings"); setIsMobileMenuOpen(false); }}>
              <p className={selectedMenu === "holdings" ? "menu selected" : "menu"}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => { setSelectedMenu("positions"); setIsMobileMenuOpen(false); }}>
              <p className={selectedMenu === "positions" ? "menu selected" : "menu"}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => { setSelectedMenu("funds"); setIsMobileMenuOpen(false); }}>
              <p className={selectedMenu === "funds" ? "menu selected" : "menu"}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => { setSelectedMenu("apps"); setIsMobileMenuOpen(false); }}>
              <p className={selectedMenu === "apps" ? "menu selected" : "menu"}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick} ref={dropdownRef}>
          <AccountCircleIcon style={{ fontSize: "26px", color: "#387ed1", marginRight: "6px" }} />
          <p className="username">{username}</p>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <ul>
                <li><p className="dropdown-item" onClick={handleProfileMenuClick}>My profile / Settings</p></li>
                <li><p className="dropdown-item" onClick={() => { setIsProfileDropdownOpen(false); window.open("https://console.echo.com", "_blank"); }}>Console</p></li>
                <li><p className="dropdown-item" onClick={() => { setIsProfileDropdownOpen(false); window.open("https://coin.echo.com", "_blank"); }}>Coin</p></li>
                <li><p className="dropdown-item" onClick={() => { setIsProfileDropdownOpen(false); window.open("https://support.echo.com", "_blank"); }}>Support</p></li>
                <li><p className="dropdown-item" onClick={handleLogout}>Logout</p></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
