import express from "express";
import { getAllPaymentMethodes } from "../controllers/PaymentMethodesController";

const router = express.Router();

router.get("/payment-methodes", getAllPaymentMethodes);

export default router;
