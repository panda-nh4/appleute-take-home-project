import mongoose, { mongo } from "mongoose";

const cartSchema = mongoose.Schema({
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      qty: {
        type: Number,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
