import React from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const Apps = () => {
  const projects = [
    {
      title: "Travel Buddy",
      description: "A modern travel discovery and planning platform that helps you find destinations, plan itineraries, and match with travel buddies.",
      link: "https://travel-buddy-1-jkol.onrender.com/",
      icon: <FlightTakeoffIcon style={{ fontSize: "36px", color: "#387ed1" }} />,
      tag: "Travel & Leisure"
    },
    {
      title: "Sage Wealth",
      description: "A clean, elegant wealth management and financial tracking application designed to help you organize and grow your investments.",
      link: "https://sage-wealth.netlify.app/",
      icon: <AccountBalanceIcon style={{ fontSize: "36px", color: "#4caf50" }} />,
      tag: "Finance & Wealth"
    }
  ];

  return (
    <div className="page-content profile-page">
      <h2 className="title">Apps</h2>
      <p className="subtitle" style={{ color: "#666", fontSize: "14px", marginTop: "-5px", marginBottom: "20px" }}>
        Explore some of my other live web applications and projects. Go checkout my projects below:
      </p>
      <hr className="divider" />

      <div className="profile-grid" style={{ marginTop: "20px" }}>
        {projects.map((project, idx) => (
          <div key={idx} className="profile-card stats-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "15px" }}>
                <div style={{ padding: "10px", borderRadius: "8px", background: "#f5f5f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {project.icon}
                </div>
                <div>
                  <span style={{ fontSize: "11px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>{project.tag}</span>
                  <h4 style={{ margin: "2px 0 0 0", fontSize: "18px", fontWeight: "600", color: "#333" }}>{project.title}</h4>
                </div>
              </div>
              <p style={{ color: "#555", fontSize: "13.5px", lineHeight: "1.6", margin: "0 0 20px 0" }}>
                {project.description}
              </p>
            </div>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="add-to-watchlist-btn"
              style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                justifyContent: "center", 
                gap: "6px", 
                padding: "8px 16px", 
                fontSize: "13px", 
                fontWeight: "500", 
                textDecoration: "none", 
                textAlign: "center",
                borderRadius: "4px",
                width: "fit-content"
              }}
            >
              Go Checkout Project <LaunchIcon style={{ fontSize: "14px" }} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
