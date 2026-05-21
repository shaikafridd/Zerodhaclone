import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import GeneralContext from "./GeneralContext";
import { API_URL } from "../config";

const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setUser, refetchTrigger } = useContext(GeneralContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/status`);
        if (response.data.success) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate, setUser, refetchTrigger]);

  if (!isAuthenticated) return <div className="loading">Checking authentication...</div>;

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
