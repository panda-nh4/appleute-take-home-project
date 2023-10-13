import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const listAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ allProducts: products });
});

const productDetails = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({ allProducts: products });
  });

export { listAllProducts };
