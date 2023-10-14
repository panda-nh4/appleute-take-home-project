import React from "react";
import OrderListItem from "../components/OrderListItem";

const OrdersScreen = () => {
  const pastOrders = [
    "652923d628fb5573e13919db",
    "652924ed5b269eddee288b54",
    "6529251f0423fcea70ef5853",
    "652925630966420a64a731a1",
    "652925790966420a64a731ae",
    "652925c424ef76fdd996c2f9",
  ];
  return (
    <>
    <div style={{
          display: "flex",
          paddingTop: "20px",
          justifyContent: "center",
        }}><h1>Past Orders</h1></div>
      {pastOrders.map((order,idx)=><OrderListItem orderId={order}/>)}
    </>
  );
};

export default OrdersScreen;
