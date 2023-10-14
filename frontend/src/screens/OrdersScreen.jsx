import React from "react";
import OrderListItem from "../components/OrderListItem";
import { useLocation } from "react-router-dom";

const OrdersScreen = () => {
  const location=useLocation()
  const pastOrders=location.state
  return (
    <>
    <div style={{
          display: "flex",
          paddingTop: "20px",
          justifyContent: "center",
        }}><h1>Past Orders</h1></div>
      {pastOrders.map((order,idx)=><OrderListItem key={idx} orderId={order}/>)}
    </>
  );
};

export default OrdersScreen;
