import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const listAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res
    .status(200)
    .json({ numberOfItems: products.length, allProducts: products });
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  if (req.query.category) {
    const productsInCategory = await Product.find({
      category: req.query.category,
    });
    res
      .status(200)
      .json({ numberOfItems: productsInCategory.length, productsInCategory });
  } else {
    res.status(400)
    throw new Error("Bad req.");
  }
});

const productDetails = asyncHandler(async (req, res) => {
  const productId = req.query.productId;
  if (productId) {
    const product = await Product.findOne({ _id: productId });
    if (product) {
      res.status(202).json(product);
    } else {
      res.status(404);
      throw new Error("Not found");
    }
  } else {
    res.status(400);
    throw new Error("Invalid req.");
  }
});

export { listAllProducts, productDetails, getProductsByCategory };
