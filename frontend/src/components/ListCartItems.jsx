import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Spinner } from "react-bootstrap";

const ListCartItems = () => {
  const cartItems = useSelector((state) => state.cartLocal.cartItems);
  return (
    <div
      style={{
        display: "block",
        width: "100%",
        justifyContent: "space-between",
        paddingRight: "5px",
        paddingTop: "20px",
      }}
    >
      {cartItems.items.map((item, idx) => (
        <CartItem key={idx} qty={item.qty} productId={item.productId} />
      ))}
    </div>
  );
};

export default ListCartItems;
