import mongoose, { mongo } from "mongoose";

const cartSchema = mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      qty: {
        type: Number,
      },
      _id: false,
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
