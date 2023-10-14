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
  let cartProductIds = [];
  console.log(req.body)
  req.body.items.map((item) => (productIds = [...productIds, item.productId]));
  //check if products really exist
  await Promise.all(
    productIds.map(async (pId) => {
      const price = await Product.findOne({ _id: pId });
      if (!price) {
        res.status(404);
        throw new Error("One or more items do not exist");
      }
    })
  );
  // check duplicate
  if (new Set(productIds).size !== productIds.length) {
    res.status(400);
    throw new Error("Duplicate items in cart");
  }
  const cartId = await User.findById(req.user._id).select("cartId -_id");

  if (cartId.cartId === null) {
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
    var cartItems = await Cart.findById(cartId.cartId);
    cartItems.items.map(
      (item) => (cartProductIds = [...cartProductIds, item.productId.valueOf()])
    );
    const commonIds = cartProductIds.filter((value) =>
      productIds.includes(value)
    );

    let updatedCartItems = [];
    if (commonIds.length === 0) {
      updatedCartItems = [...req.body.items, ...cartItems.items];
    } else {
      updatedCartItems = [...req.body.items];

      const selectedFromCart = cartItems.items.filter(
        (item) => !commonIds.includes(item.productId.valueOf())
      );

      updatedCartItems = [...updatedCartItems, ...selectedFromCart];
    }
    cartItems.items = updatedCartItems;
    const updatedCart = await cartItems.save();
    if (updatedCart) res.status(200).json({ items: updatedCart.items });
    else {
      res.status(500);
      throw new Error("Unable to add to cart");
    }
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  const cartId = await User.findById(req.user._id).select("cartId -_id");
  let cartProductIds = [];
  if (cartId.cartId === null) {
    res.status(404);
    throw new Error("Cannot finde item to remove");
  }
  const cartItems = await Cart.findById(cartId.cartId);
  cartItems.items.map(
    (item) => (cartProductIds = [...cartProductIds, item.productId.valueOf()])
  );
  if (cartProductIds.includes(req.body.productId)) {
    var newCartItems = [];
    cartItems.items.map((item) => {
      if (item.productId.valueOf() === req.body.productId) {
        if (item.qty > 1) {
          newCartItems = [
            ...newCartItems,
            { productId: item.productId.valueOf(), qty: item.qty - 1 },
          ];
        }
      } else {
        newCartItems = [...newCartItems, item];
      }
    });
    cartItems.items = newCartItems;
    const updatedCart = await cartItems.save();
    if (updatedCart) res.status(200).json({ items: updatedCart.items });
    else {
      res.status(500);
      throw new Error("Unable to add to cart");
    }
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});
const getValue = asyncHandler(async (req, res) => {
  const cartId = await User.findById(req.user._id).select("cartId -_id");
  const cartContents = await Cart.findById(cartId.cartId);
  if (cartContents.items.length === 0) {
    res.status(200).json({totalValue:0});
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
    res.status(200).json({totalValue:totalPrice})
  }
});
export { getCartItems, addToCart, removeFromCart,getValue };
