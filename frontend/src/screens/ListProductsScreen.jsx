import React from "react";
import ProductCardItem from "../components/ProductCardItem";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
const ListProductsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };
  if (location.state === null) {
    return (
      <>
        <div style={{ display: "block" }}>
          <span>
            <h2>Nothing to see here.</h2>
          </span>
          <span>
            <Button variant="primary" onClick={() => backToHome()}>
              Back to home
            </Button>
          </span>
        </div>
        ;
      </>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          paddingTop: "20px",
          justifyContent: "center",
        }}
      >
        <h2>{location.state.heading}</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // paddingLeft:'85px',
          // paddingRight:'100px'
        }}
      >
        <div className="container m-4">
          <div
            className="row row-cols-md-2
                    row-cols-lg-6 g-4"
            style={{ justifyContent: "left"}}
          >
            {location.state.products.map((_, idx) => (
              <ProductCardItem productId={_} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProductsScreen;
