import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import VerticalGraph from "./VerticalGraph";
import GeneralContext from "./GeneralContext";
import { API_URL } from "../config";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const { refetchTrigger } = useContext(GeneralContext);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axios.get(`${API_URL}/allHoldings`);
        setAllHoldings(response.data);
      } catch (err) {
        console.error("Error fetching holdings:", err);
      }
    };

    fetchHoldings();
  }, [refetchTrigger]);

  let totalInvestment = 0;
  let currentValue = 0;

  allHoldings.forEach((stock) => {
    totalInvestment += stock.avg * stock.qty;
    currentValue += stock.price * stock.qty;
  });

  const pnl = currentValue - totalInvestment;
  const pnlPercentage = totalInvestment !== 0 ? ((pnl / totalInvestment) * 100).toFixed(2) : 0;
  const isProfit = pnl >= 0;

  return (
    <div className="page-content">
      <h2 className="title">Holdings ({allHoldings.length})</h2>

      <div className="holding-data row" style={{ marginBottom: '40px' }}>
        <div className="col">
          <h1 className="val" style={{ fontSize: '32px' }}>
            {totalInvestment.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h1>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h1 className="val" style={{ fontSize: '32px' }}>
            {currentValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h1>
          <p>Current value</p>
        </div>
        <div className="col">
          <h1 className={`val ${isProfit ? 'up' : 'down'}`} style={{ fontSize: '32px' }}>
            {isProfit ? '+' : ''}{pnl.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
            <span style={{ fontSize: '18px', marginLeft: '10px' }}>
              ({isProfit ? '+' : ''}{pnlPercentage}%)
            </span>
          </h1>
          <p>P&L</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.qty * stock.price;
              const pnl = (stock.price - stock.avg) * stock.qty;
              const isProfit = stock.price >= stock.avg;
              
              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={isProfit ? "up" : "down"}>{pnl.toFixed(2)}</td>
                  <td className={isProfit ? "up" : "down"}>{stock.net}</td>
                  <td className={stock.isLoss ? "down" : "up"}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {allHoldings.length > 0 && <VerticalGraph data={allHoldings} />}
    </div>
  );
};

export default Holdings;
