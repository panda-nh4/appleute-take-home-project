import asyncHandler from "express-async-handler";
import Home from "../models/homeModel.js";
import { ObjectId } from "mongodb";

const home_id="652a2b568c2f49852a36fde9"

const featured = asyncHandler(async (req, res) => {
    const featured=await Home.findById(home_id).select("featured -_id")
    res.status(200).json(featured)
  });

  const topCategories = asyncHandler(async (req, res) => {
    const topCategories=await Home.findById(home_id).select("topCategories -_id")
    res.status(200).json(topCategories)
  });

  const featuredProducts = asyncHandler(async (req, res) => {
    const featuredProducts=await Home.findById(home_id).select("featuredProducts -_id")
    res.status(200).json(featuredProducts)
  });

  export {featured,featuredProducts,topCategories}