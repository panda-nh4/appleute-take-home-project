import mongoose from "mongoose";
const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    category: [
      {
        type: String,
      },
    ],
    productPrice: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
    },
    productImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
