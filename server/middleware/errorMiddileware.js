const { NODE_ENV } = require("../config");

// Not found error handler
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global error handler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    error_name: err.name,
    error_code: err.code,
    error_pattern: err.keyPattern,
    stack: NODE_ENV === "production" ? null : err.stack,
  });
  next();
};

module.exports = { notFound, errorHandler };
