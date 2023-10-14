import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartMutation } from "../slices/cartApiSlice";
import { toast } from "react-toastify";
import { updateLocalCart } from "../slices/cartSlice";
import { Button } from "react-bootstrap";
import CheckoutComponent from "../components/CheckoutComponent";
import ListCartItems from "../components/ListCartItems";
const CartScreen = () => {
  const dispatch = useDispatch();
  
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(0);
  const cart=useSelector((state)=>state.cartLocal.cartItems)
  useEffect(()=>{

  },[cart])
  return (
    <div
      style={{
        display: "inline-flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "block",
          width: "79%",
          backgroundColor: "#55fae9",
          borderRadius: "25px",
          padding: "10px",
        }}
      >
        <div style={{ display: "flex",width:"100%", justifyContent: "space-between" }}>
          <span>Name</span>
          <span>Qty</span>
          <span>Price</span>
          <span></span>
        </div>
        <ListCartItems />
      </div>
      <div
        style={{
          display: "block",
          width: "19%",
          height: "300px",
          backgroundColor: "",
          borderRadius: "25px",
          padding: "10px",
        }}
      >
        <CheckoutComponent />
      </div>
    </div>
  );
};

export default CartScreen;
