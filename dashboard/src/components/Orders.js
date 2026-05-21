import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const { refetchTrigger } = useContext(GeneralContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3002/allOrders");
        setAllOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [refetchTrigger]);

  return (
    <div className="orders">
      {allOrders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to="/" className="btn btn-blue" style={{textDecoration: 'none', color: '#fff'}}>
            Get started
          </Link>
        </div>
      ) : (
        <h3 className="title">Orders ({allOrders.length})</h3>
      )}

      {allOrders.length > 0 && (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>{order.price.toFixed(2)}</td>
                    <td>
                      <span className={order.mode === "BUY" ? "mode-blue" : "mode-red"}>
                        {order.mode}
                      </span>
                    </td>
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

export default Orders;
