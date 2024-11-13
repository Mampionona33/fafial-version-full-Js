import express from "express";
import { getAllPaymentMethodes,getPaymentMethodeById } from "../controllers/PaymentMethodesController";

const router = express.Router();

router.get("/payment-methodes", getAllPaymentMethodes);
router.get("/payment-methodes/:id", getPaymentMethodeById);

export default router;
