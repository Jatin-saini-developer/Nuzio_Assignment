export const notFoundHandler = (req, _res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || err.status || 500;

  if (statusCode === 500) {
    console.error(err.message);
  }

  res.status(statusCode).json({
    status: "error",
    message: statusCode === 500 ? "Internal server error" : err.message,
  });
};
