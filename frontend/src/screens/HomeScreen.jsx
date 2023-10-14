import React, { useEffect, useState } from "react";
import HomeCarousel from "../components/HomeCarousel";
import CategoryBlocks from "../components/CategoryBlocks";
import ProductCardItem from "../components/ProductCardItem";
import SpinnerLoading from "../components/SpinnerLoading";
const colours = [
  "#B0E0E6",
  "#90EE90",
  "#FFD700",
  "#00FFFF",
  "#FF69B4",
  "#87CEFA",
  "#00CED1",
  "#00FF7F",
];
const HomeScreen = () => {
  const [data, setData] = useState(null);
  var features = [];
  var topCategories = [];
  var featuredProducts = [];
  const fetchData = async () => {
    var dataObj = {};
    features = await (await fetch("/api/home/featured")).json();
    dataObj["features"] = features.featured;
    featuredProducts = await (await fetch("/api/home/featuredProducts")).json();
    dataObj["featuredProducts"] = featuredProducts.featuredProducts;
    topCategories = await (await fetch("/api/home/topCategories")).json();
    dataObj["topCategories"] = topCategories.topCategories;
    setData(dataObj);
  };
  if (data === null) {
    fetchData();
    return <SpinnerLoading />;
  } else {
  }

  return (
    <>
      <div>
        <HomeCarousel featured={data.features} />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <h2>Categories</h2>
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
          >
            {data.topCategories.map((_, idx) => (
              <CategoryBlocks bgColour={colours[idx]} catName={_} key={idx} />
            ))}
          </div>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <h2>Featured Products</h2>
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
            style={{ justifyContent: "space-between" }}
          >
            {data.featuredProducts.map((_, idx) => (
              <ProductCardItem productId={_} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
