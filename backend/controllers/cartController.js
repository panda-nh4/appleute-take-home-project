import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

const getCartItems = asyncHandler(async (req, res) => {
  const cartId = await User.findById(req.user._id).select("cartId -_id");
  if (cartId.cartId !== null) {
    const cartItems = await Cart.findById(cartId.cartId).select("-_id -__v");
    res.status(200).json(cartItems);
  } else {
    res.status(200).json({ items: [] });
  }
});

const addToCart = asyncHandler(async (req, res) => {
  let productIds = [];
  req.body.items.map((item) => (productIds = [...productIds, item.productId]));
  //check if products really exist
  await Promise.all(
    productIds.map(async (pId) => {
      const price = await Product.findOne({ _id: pId });
      if (!price) {
        res.status(404)
        throw new Error("One or more items do not exist");
      }
    })
  );
//check duplicate
if(new Set(productIds).size !== productIds.length){
    res.status(400)
    throw new Error("Duplicate items in cart")
}
  const cartId = await User.findById(req.user._id).select("cartId -_id");
  if (JSON.stringify(cartId) === "{}") {
    const newCart = await Cart.create({
      items: req.body.items,
    });
    if (newCart) {
      const addCartToUser = await User.findById(req.user._id);
      if (addCartToUser) {
        addCartToUser.cartId = newCart._id;
        const updatedUser = await addCartToUser.save();
        if (updatedUser) {
          res.status(200).json({ cartItems: newCart.items });
        } else {
          res.status(500);
          throw new Error("Unable to set cart to user");
        }
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } else {
      res.status(500);
      throw new Error("Unable to create cart");
    }
  } else {
    const cartItems = await Cart.findById(cartId.cartId);
    cartItems.items = req.body.items;
    const updatedCart = await cartItems.save();
    res.status(200).json({ items: updatedCart.items });
  }
});

export { getCartItems, addToCart };
