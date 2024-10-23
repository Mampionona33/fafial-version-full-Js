import {
  createReservation,
  getAllReservations,
  getReservation,
  updateReservation,
} from "../controllers/ReservationController";
import express from "express";

const router = express.Router();

router.post("/reservations", createReservation);
router.get("/reservations", getAllReservations);
router.get("/reservations/:id", getReservation);
router.put("/reservations/:id", updateReservation);

export default router;
