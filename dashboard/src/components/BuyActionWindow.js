import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { API_URL } from "../config";

const BuyActionWindow = () => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [productType, setProductType] = useState("MIS"); // "MIS" or "CNC"
  const [error, setError] = useState("");
  const { closeWindow, isBuyWindowOpen, isSellWindowOpen, selectedStock, user, setUser, triggerRefetch } = useContext(GeneralContext);

  useEffect(() => {
    if (selectedStock) {
      setStockPrice(selectedStock.price || 0.0);
      setStockQuantity(1);
      setProductType("MIS");
      setError("");
    }
  }, [selectedStock]);

  if (!isBuyWindowOpen && !isSellWindowOpen) return null;

  const isBuy = isBuyWindowOpen;
  const actionColor = isBuy ? "blue" : "red";

  const handleAction = async () => {
    const qty = Number(stockQuantity);
    const price = Number(stockPrice);
    const totalCost = qty * price;

    if (qty <= 0) {
      setError("Quantity must be greater than 0.");
      return;
    }
    if (price <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    if (isBuy && user && (user.balance || 0) < totalCost) {
      setError("Insufficient funds to place this order.");
      return;
    }

    setError(""); // clear previous errors

    try {
      await axios.post(`${API_URL}/newOrder`, {
        name: selectedStock?.name || selectedStock,
        qty: qty,
        price: price,
        mode: isBuy ? "BUY" : "SELL",
        product: productType,
      });

      if (user) {
        const newBalance = isBuy 
          ? (user.balance || 0) - totalCost 
          : (user.balance || 0) + totalCost;
        setUser({ ...user, balance: newBalance });
      }

      triggerRefetch();
      closeWindow();
    } catch (err) {
      console.error("Error creating order:", err);
      setError(err.response?.data || "Failed to place order.");
    }
  };

  return (
    <div className="buy-window" draggable="true">
      <div className={`buy-window-header ${isBuy ? "bg-blue" : "bg-red"}`}>
        <div className="buy-window-title">
          <h3>{isBuy ? "Buy" : "Sell"} {selectedStock?.name || selectedStock}</h3>
          <span className="exchange">NSE</span>
          <span className="price">x {stockQuantity} Qty</span>
        </div>
      </div>
      
      <div className="buy-window-body">
        <div className="product-types">
          <div className="type-column">
            <label>
              <input
                type="radio"
                name="product"
                value="MIS"
                checked={productType === "MIS"}
                onChange={() => setProductType("MIS")}
              /> Intraday <span>MIS</span>
            </label>
            <label>
              <input
                type="radio"
                name="product"
                value="CNC"
                checked={productType === "CNC"}
                onChange={() => setProductType("CNC")}
              /> Longterm <span>CNC</span>
            </label>
          </div>
          <div className="inputs-row">
            <fieldset>
              <legend>Qty.</legend>
              <input
                type="number"
                name="qty"
                id="qty"
                onChange={(e) => setStockQuantity(e.target.value)}
                value={stockQuantity}
              />
            </fieldset>
            <fieldset>
              <legend>Price</legend>
              <input
                type="number"
                name="price"
                id="price"
                step="0.05"
                onChange={(e) => setStockPrice(e.target.value)}
                value={stockPrice}
              />
            </fieldset>
          </div>
        </div>
      </div>

      <div className="buttons">
        <div className="margin-req">
          {error ? (
            <span style={{ color: "#df514c", fontWeight: "500" }}>{error}</span>
          ) : (
            <span>Margin required ₹{Number(stockQuantity * stockPrice).toFixed(2)}</span>
          )}
        </div>
        <div className="action-btns">
          <button className={`btn btn-${actionColor}`} onClick={handleAction}>
            {isBuy ? "Buy" : "Sell"}
          </button>
          <button className="btn btn-grey" onClick={closeWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
