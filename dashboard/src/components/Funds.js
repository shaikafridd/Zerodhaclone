import React, { useContext, useState } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { API_URL } from "../config";

const Funds = () => {
  const { user, setUser } = useContext(GeneralContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" or "withdraw"
  const [amount, setAmount] = useState("");
  const [modalError, setModalError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (type) => {
    setModalType(type);
    setAmount("");
    setModalError("");
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setModalError("");
    const numAmount = Number(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      setModalError("Please enter a valid positive amount.");
      return;
    }

    setLoading(true);
    const endpoint = modalType === "add" ? "/addFunds" : "/withdrawFunds";

    try {
      const response = await axios.post(`${API_URL}${endpoint}`, {
        amount: numAmount,
      });

      if (response.data.success) {
        setUser({ ...user, balance: response.data.balance });
        setIsModalOpen(false);
      }
    } catch (err) {
      setModalError(err.response?.data?.message || `Failed to ${modalType} funds.`);
    } finally {
      setLoading(false);
    }
  };

  const balance = user && typeof user.balance === "number" ? user.balance : 0.0;
  const formattedBalance = balance.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="page-content">
      <div className="funds-header">
        <h2 className="title">Funds</h2>
        <div className="funds-actions">
          <button className="btn btn-green" onClick={() => handleOpenModal("add")}>
            Add funds
          </button>
          <button className="btn btn-blue" onClick={() => handleOpenModal("withdraw")}>
            Withdraw
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="section-header">
            <h3>Equity</h3>
          </div>
          <div className="section-content">
            <div className="margin-data">
              <h1 className="margin">₹ {formattedBalance}</h1>
              <p>Available margin</p>
            </div>
            <div className="margin-data">
              <p>Used margin <span>₹ 0.00</span></p>
              <p>Available cash <span>₹ {formattedBalance}</span></p>
              <p>Opening balance <span>₹ {formattedBalance}</span></p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="section-header">
            <h3>Commodity</h3>
          </div>
          <div className="section-content">
            <div className="margin-data">
              <h1 className="margin">₹ 0.00</h1>
              <p>Available margin</p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="funds-modal-overlay">
          <div className="funds-modal">
            <h3>{modalType === "add" ? "Add Funds" : "Withdraw Funds"}</h3>
            <p className="modal-subtitle">
              {modalType === "add"
                ? "Enter the amount you wish to add to your trading balance."
                : "Enter the amount you wish to withdraw to your bank account."}
            </p>
            {modalError && <div className="auth-error">{modalError}</div>}
            
            <form onSubmit={handleModalSubmit}>
              <div className="input-group">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  placeholder=" "
                  min="1"
                  step="any"
                />
                <label>Amount (₹)</label>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-blue" disabled={loading}>
                  {loading ? "Processing..." : "Submit"}
                </button>
                <button
                  type="button"
                  className="btn btn-grey"
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funds;
