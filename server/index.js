// External Imports
const express = require("express");
const { success } = require("consola");

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

// Routing Setup
app.use("/api/users", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api", stripeRouter);

// Default Error Handler
app.use(notFound);
app.use(errorHandler);

// Connecting with the Database
connectMDB();

// Start Listening for the server on Port
app.listen(PORT, () => {
  success({
    message: `Server started on Port ${PORT}`,
    badge: true,
  });
});
