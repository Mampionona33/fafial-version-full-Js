import AuthMiddleware from "../middlewares/AuthMiddleware";
import ReservationController from "../controllers/ReservationController";
import express from "express";

const router = express.Router();

router.post(
  "/reservations",
  AuthMiddleware.authenticateToken,
  ReservationController.create
);

router.get("/reservations", ReservationController.getAll);

export default router;
