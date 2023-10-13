import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoute.js"
import orderRoutes from "./routes/orderRoute.js"
import homeRoutes from "./routes/homePage.js"
import { errorHandler, noEndpoint } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
dotenv.config();
connectDB();
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
if (process.env.DEV_BUILD === "true") {
  console.log("dev build");
}
app.use("/api/users", userRoutes);
app.use("/api/products",productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/home',homeRoutes)
app.get("/", (req, res) => res.send("home"));
app.use(noEndpoint);
app.use(errorHandler);
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
