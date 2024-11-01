import { NextFunction, Request, Response } from "express";

// Fonction pour gérer les erreurs
const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server.",
    error: process.env.NODE_ENV === "production" ? null : err.message,
  });
};

export default handleError;
