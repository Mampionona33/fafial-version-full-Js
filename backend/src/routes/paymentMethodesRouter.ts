import express from "express";
import PaymentMethodesController from "../controllers/PaymentMethodesController";

const router = express.Router();

router.get("/payment-methodes", PaymentMethodesController.getAll);

export default router;
