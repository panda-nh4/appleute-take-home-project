import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

const getPastOrders = asyncHandler(async (req, res) => {
  const orderIds = await User.findById(req.user._id).select("orders -_id");
  res.status(200).json({ orders: orderIds.orders });
});

const placeOrder = asyncHandler(async (req, res) => {
  const cartId = await User.findById(req.user._id).select("cartId -_id");
  const cartContents = await Cart.findById(cartId.cartId);
  if (cartContents.items.length === 0) {
    res.status(400).json("Cart is empty.");
  } else {
    const checkOutItems = cartContents.items;
    let priceList = {};
    let productIds = [];
    checkOutItems.map((item) => {
      priceList[item.productId] = item.qty;
      productIds = [...productIds, item.productId];
    });
    await Promise.all(
      productIds.map(async (pId) => {
        const price = await Product.findOne({ _id: pId });
        if (price) {
          priceList[pId] = priceList[pId] * price.price;
        } else {
          throw new Error("One or more items do not exist");
        }
      })
    );
    const totalPrice = Object.values(priceList).reduce((a, b) => a + b, 0);
    const newOrder = await Order.create({
      items: checkOutItems,
      priceList: JSON.stringify(priceList),
      totalAmount: totalPrice,
      transactionStatus: "pending",
    });

    if (newOrder) {
      const userOrders = await User.updateOne(
        { _id: req.user._id },
        { $push: { orders: newOrder._id } }
      )
      const updateTransactionStatus = await Order.updateOne(
        { _id: newOrder._id },
        { transactionStatus: "success" }
      );
      const clearCart = await User.updateOne(
        { _id: req.user._id },
        { $set: { cartId: null } }
      )
      console.log(clearCart)
      res.status(200).json({
        items: checkOutItems,
        priceList: JSON.stringify(priceList),
        totalAmount: totalPrice,
        transactionStatus: "success",
      });
    } else {
      res.status(500);
      throw new Error("Order failed");
    }
  }
});

const getOrderDetails = asyncHandler(async (req, res) => {
    const orderDetails = await Order.findById(req.query.orderId).select("-__v")
    if (orderDetails){
        res.status(200).json(orderDetails)
    }
    else{
        res.status(404)
        throw new Error("Order not found")
    }
});

export { getPastOrders, placeOrder, getOrderDetails };
