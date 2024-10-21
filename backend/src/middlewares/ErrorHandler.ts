import { NextFunction, Request, Response } from "express";

class ErrorHandler {
  static handleError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: "Something went wrong on the server.",
      error: process.env.NODE_ENV === "production" ? null : err.message,
    });
  }
}

export default ErrorHandler;
