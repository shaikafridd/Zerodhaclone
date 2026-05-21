import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSignupPath = location.pathname === "/signup";
  const [isSignup, setIsSignup] = useState(isSignupPath);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync state if URL changes directly
  useEffect(() => {
    setIsSignup(location.pathname === "/signup");
    setError("");
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        const res = await axios.post("http://localhost:3002/signup", {
          username,
          email,
          password,
        });
        if (res.data.success) {
          navigate("/");
        }
      } else {
        const res = await axios.post("http://localhost:3002/login", {
          email,
          password,
        });
        if (res.data.success) {
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || (isSignup ? "Signup failed" : "Login failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (e) => {
    e.preventDefault();
    if (isSignup) {
      navigate("/login");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        <div className="auth-left">
          <h1 className="auth-logo">Kite</h1>
          <h2>Invest in everything</h2>
          <p>Online platform to invest in stocks, derivatives, mutual funds, and more</p>
        </div>
        <div className="auth-right">
          <div className="auth-form-container">
            <h2>{isSignup ? "Create Account" : "Login to Kite"}</h2>
            <p className="auth-subtitle">
              {isSignup ? "Join millions of smart investors today." : "Welcome back! Please enter your details."}
            </p>
            {error && <div className="auth-error">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              {isSignup && (
                <div className="input-group">
                  <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                    placeholder=" "
                  />
                  <label>Username</label>
                </div>
              )}
              <div className="input-group">
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder=" "
                />
                <label>Email ID</label>
              </div>
              <div className="input-group">
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder=" "
                />
                <label>Password</label>
              </div>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? "Processing..." : (isSignup ? "Sign Up" : "Login")}
              </button>
            </form>
            <p className="auth-link">
              {isSignup ? (
                <>
                  Already have an account?{" "}
                  <a href="/login" onClick={handleToggle}>
                    Login here
                  </a>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <a href="/signup" onClick={handleToggle}>
                    Signup here
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
