import React from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import SpinnerLoading from "../components/SpinnerLoading";
const ProductScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const backToHome = () => {
    navigate("/");
  };
  if (location.state === null) {
    return (
      <>
        <div style={{ display: "block"}}>
            <span><h2>Nothing to see here.</h2></span>
            <span><Button variant="primary" onClick={()=>backToHome()}>Back to home</Button></span>
        </div>
        ;
      </>
    );
  }
  const viewProducts=(res,cat)=>{
    navigate('/list',{state:{heading:cat,products:res.productsInCategory}})
  }
  const getProducts=async(catName)=>{
    const res = await (await fetch(`/api/products/category?category=${catName}`)).json();
    viewProducts(res,catName)
  }
  var inCart = true;
  return (
    // <div style={{display:"flex", justifyContent:"space-between"}}>
    // <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg' width={"50%"} height={700}>
    // </ img>
    //   <div style={{display:"flex",justifyContent:"center",width:"50%"}}>
    //   Product page
    //   </div>
    // </div>
    <div className="container m-4">
      <div
        className="row row-cols-md-2 g-4"
        style={{ justifyContent: "space-between" }}
      >
        <img src={location.state.img_link} width={500} height={600}></img>
        <div
          style={{
            display: "block",
            justifyContent: "left",
            width: "50%",
            paddingTop: "10px",
          }}
        >
          <span>
            <h2>{location.state.name}</h2>
          </span>
          <span style={{ fontSize: "21px" }}>
            Categories:{" "}
            {location.state.category.map((item, idx) => (
                <span key={idx}>
                <Button variant="primary" onClick={()=>getProducts(item)}>{item}</Button>{" "}</span>
            ))}
          </span>
          <div style={{ paddingTop: "150px" }}>
            <span>
              <h3>${location.state.price}</h3>
            </span>
          </div>
          {inCart ? (
            <div style={{ paddingTop: "20px" }}>
              <span style={{ fontSize: "20px" }}>
                <Button variant="danger">-</Button>
                {" 1 "}
                <Button>+</Button> in cart.
              </span>
            </div>
          ) : (
            <div style={{ paddingTop: "20px" }}>
              <Button>Add to Cart</Button>
            </div>
          )}
          <div style={{ paddingTop: "20px" }}>
            <span>
              <h4>Description</h4>
            </span>
            <div>{location.state.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
