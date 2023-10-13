import mongoose, { mongo } from "mongoose";

const orderSchema = mongoose.Schema({
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
  totalAmount: {
    type: Number,
    required: true,
  },
  transactionStatus: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
