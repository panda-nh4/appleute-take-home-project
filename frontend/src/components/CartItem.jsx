import React from "react";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRemoveItemMutation } from "../slices/cartApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateLocalCart} from "../slices/cartSlice";

const CartItem = ({ qty, productId }) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [removeOne] = useRemoveItemMutation();
  const dispatch = useDispatch();
  const toProductPage = () => {
    navigate("/product", { state: data });
  };
  const deleteOne = async () => {
    try {
      console.log(productId);
      const resp = await removeOne({ productId }).unwrap();
      dispatch(updateLocalCart(resp));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const fetchData = async () => {
    var resObj = await (
      await fetch(`/api/products/product?productId=${productId}`)
    ).json();
    setData(resObj);
  };
  if (data === null) {
    fetchData();
    return <Spinner />;
  } else
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          paddingRight: "5px",
          paddingTop: "20px",
        }}
      >
        <span style={{ cursor: "pointer" }} onClick={() => toProductPage()}>
          {data.name}
        </span>
        <span>{qty}</span>
        <span>{data.price}</span>
        <Button variant="danger" onClick={() => deleteOne()}>
          -
        </Button>
      </div>
    );
};

export default CartItem;
