import mongoose, { mongo } from "mongoose";

const orderSchema = mongoose.Schema({
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
  priceList: {
    type: String,
  },
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
