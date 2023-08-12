// External Imports
const express = require("express");
const cors = require("cors");
const { success, info } = require("consola");

// Internal Imports
const { PORT } = require("./config");
const connectMDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const productRouter = require("./routes/productRoutes");
const stripeRouter = require("./routes/stripeRoute");
const { notFound, errorHandler } = require("./middleware/errorMiddileware");

// Initialize the Application
const app = express();

// Request Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "*",
  })
);

// Routing Setup
app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1", stripeRouter);

// Default Error Handler
app.use(notFound);
app.use(errorHandler);

// Connecting with the Database
connectMDB();

// Start Listening for the server on Port
app.listen(PORT, () => {
  info({
    message: `Server started on Port ${PORT}`,
    badge: true,
  });
});
