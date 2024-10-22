import {
  createReservation,
  getAllReservations,
  getReservation,
} from "../controllers/ReservationController";
import express from "express";

const router = express.Router();

router.post("/reservations", createReservation);
router.get("/reservations", getAllReservations);
router.get("/reservations/:id", getReservation);

export default router;
