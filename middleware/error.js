const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errorMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    //wrong mongoose object Id error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid : ${err.path}`;
      error = new ErrorHandler(message, 404);
    }

    //handling mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.erros).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }
    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server error",
    });
  }

  //handling Wrong JWT token error
  if (err.name === "JsonWebTokenError") {
    const message = "Json web token is invalid Try AGian";
    error = new ErrorHandler(message, 500);
  }

  //handling expired jwt token error
  if (err.name === "TokenExpiredError") {
    const message = "JSon web token is expired . Try AGian!";
    error = new ErrorHandler(message, 500);
  }

  //handle mongoose duplicate key error

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    error = new err();
  }
};


