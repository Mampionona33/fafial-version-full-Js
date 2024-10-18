import AuthMiddleware from "../middlewares/AuthMiddleware";
import ReservationController from "../controllers/ReservationController";
import express from "express";

const router = express.Router();

router.post(
  "/reservations",
  AuthMiddleware.authenticateToken,
  ReservationController.create
);

export default router;
