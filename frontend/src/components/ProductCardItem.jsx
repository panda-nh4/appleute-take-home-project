import React from "react";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const ProductCardItem = ({ productId }) => {
  const [data, setData] = useState(null);
  const navigate=useNavigate()
  const toProductPage=()=>{
    navigate('/product',{state:data})
  }
  const fetchData = async () => {
    var resObj = await (
      await fetch(`/api/products/product?productId=${productId}`)
    ).json();
    setData(resObj);
  };
  if (data === null) {
    fetchData();
    return <Spinner />;
  } else {
    return (
      <Card
        style={{ width: "25rem", height: "30rem", margin:"4px"}}
        bg="light"
        
      >
        <Card.Img
          width={250}
          height={325}
          variant="top"
          src={data.img_link}
          onClick={() => toProductPage()}
          style={{ cursor: "pointer", paddingTop:"9px", borderRadius:"25px" }}
        />
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "space-between" }} onClick={() => toProductPage()}>
            <Card.Title style={{ color: "dark", cursor: "pointer" }}>
              {data.name}
            </Card.Title>
          </div>
          <Card.Text style={{ color: "dark" }}>{`$ ${data.price}`}</Card.Text>
          <Button>Add to cart</Button>
        </Card.Body>
      </Card>
    );
  }
};

export default ProductCardItem;
