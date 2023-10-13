import mongoose from "mongoose";
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    img_link: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
