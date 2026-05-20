export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || (String(statusCode).startsWith("4") ? "fail" : "error");

  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      status,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
      stack: err.stack,
    });
  } else {
    if (err.isOperational) {
      res.status(statusCode).json({ status, message: err.message });
    } else {
      console.error("ERROR:", err);
      res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
      });
    }
  }
};
