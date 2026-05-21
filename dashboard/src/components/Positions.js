import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { API_URL } from "../config";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const { refetchTrigger } = useContext(GeneralContext);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(`${API_URL}/allPositions`);
        setAllPositions(response.data);
      } catch (err) {
        console.error("Error fetching positions:", err);
      }
    };

    fetchPositions();
  }, [refetchTrigger]);

  return (
    <div className="page-content">
      <h2 className="title">Positions ({allPositions.length})</h2>
      
      {allPositions.length === 0 ? (
        <div className="no-data-state">
          <p>You don't have any open positions</p>
        </div>
      ) : (
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const pnl = (stock.price - stock.avg) * stock.qty;
              const isProfit = stock.price >= stock.avg;

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={isProfit ? "up" : "down"}>{pnl.toFixed(2)}</td>
                  <td className={stock.isLoss ? "down" : "up"}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default Positions;
