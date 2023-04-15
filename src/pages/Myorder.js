import React, { useState, useEffect } from "react";
import axios from "axios";
import { env } from "../environment";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function Myorder() {
  const [userOrders, setuserOrders] = useState([]);

  useEffect(() => {
    const getuserOrders = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(`${env.apiurl}/order/getuserorders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setuserOrders(res.data.orders);
        console.log(res.data.orders);

      } catch (error) {
        console.log(error);
      }
    };

    getuserOrders();
  }, []);

  return (
    <>
    <div>
      <h1 style={{ textAlign: "center", fontSize: "40px" }}>My Orders</h1>
      {userOrders && userOrders.length > 0 ? (
        userOrders.map((order) => (
          <div key={order._id}>
            <p>Order ID: {order._id}</p>
            <p>Order Items: {order.items}</p>
            <p>Order Total: {order.total}</p>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}
    </div>
    <div className="pt-5">
    <h6 className="mb-0">
      <a href="/" className="text-body">
        {" "}
        <KeyboardBackspaceIcon />
        Back to Home
      </a>
    </h6>
  </div>
  </>
  );
}

export default Myorder;
