import React, { useState } from "react";
import { toast } from "react-toastify";
import ProductCardItem from "./ProductCardItem";
import SpinnerLoading from "./SpinnerLoading";

const OrderListItem = ({ orderId }) => {
  const [data, setData] = useState(null);
  const getOrderDetails = async () => {
    try {
      const res = await (
        await fetch(`/api/orders/details?orderId=${orderId}`)
      ).json();
      if (res.items)
      setData(res)
    else
    throw new Error("No data received")
    } catch (err) {
      toast.error(err.message);
    }
  };
  if(data===null){
    getOrderDetails()
    return <SpinnerLoading/>
  }
  
  console.log(data)
  return (
    <div
      style={{
        display: "block",
        width: "100%",
        height: "620px",
        justifyContent: "space-between",
        marginBottom: "20px",
        padding: "10px",
        backgroundColor: "#0d6efd",
        borderRadius: "25px",
      }}
    >
      <div style={{ color: "white" }}>Order Id: {orderId}</div>
      <div
        style={{
          display: "block",
          width: "100%",
          height: "33rem",
          justifyContent: "space-between",
          marginTop: "10px",
          backgroundColor: "white",
          borderRadius: "25px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {data.items.map((item,idx)=>
            <div>
                <ProductCardItem productId={item.productId}/>
                <span style={{paddingLeft:"10px"}}>{`Qty: ${item.qty}`}</span>
            </div>
          )}
        </div>
      </div>
      <div style={{display:"flex",padding:"5px",justifyContent:"space-between",color:"white"}}>
        <span>
        {`Order total: $ ${data.totalAmount}`}
        </span>
        <span>{`Order status: ${data.transactionStatus}`}</span>
      </div>
    </div>
  );
};

export default OrderListItem;
