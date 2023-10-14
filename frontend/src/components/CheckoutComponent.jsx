import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CheckoutComponent = () => {
  const cartItems = useSelector((state) => state.cartLocal.cartItems);
  const [data, setData] = useState(-1);
  const navigate = useNavigate();
  const getCartValue = async () => {
    if (data === -1) {
      const res = await (await fetch("/api/cart/value")).json();
      setData(res.totalValue);
    }
  };
  useEffect(() => {
    getCartValue();
  }, []);

  const checkout = async () => {
    fetch("/api/orders/placeOrder", {
      method: "POST",
    }).then((response) => {
      if (!response.ok) {
        toast.error("Error");
      } else {
        toast("Order Successfull");
        navigate("/");
      }
    });
  };

  return (
    <div>
      <h3>Checkout</h3>
      <div>`Total Amount: ${data}</div>
      <Button style={{ width: "100%", marginTop: "20px" }} onClick={()=>checkout()}>Checkout</Button>
    </div>
  );
};

export default CheckoutComponent;
