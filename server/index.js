// External Imports
const express = require("express");
const { success } = require("consola");

// Internal Imports
const { PORT } = require("./config");
const connectMDB = require("./config/db");
const userRouter = require("./routes/userRoutes");

// Initialize the Application
const app = express();

// Request Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing Setup
app.use("/api/users", userRouter);

// Connecting with Database
connectMDB();

// Start Listening for the server on Port
app.listen(PORT, () => {
  success({
    message: `Server started on Port ${PORT}`,
    badge: true,
  });
});
