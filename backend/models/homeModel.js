import mongoose from "mongoose";
const homeSchema = mongoose.Schema(
  {
    featured: [
      {
        src_img: {
          type: String,
        },
        products: [
          {
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
            },
          },
        ],
      },
    ],
    topCategories: [
      {
        type: String,
      },
    ],
    featuredProducts: [
         {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
      },
    ],
  },
);

const Home = mongoose.model("Home", homeSchema);

export default Home;
