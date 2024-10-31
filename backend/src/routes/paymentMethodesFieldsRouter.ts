import { getPaymentFieldsByPaymentMethodeId } from "../controllers/PaymentMethodesFieldController";
import express from "express";

const router = express.Router();

router.get(
  "/payment-methodes-fields/:paymentMethodeId",
  getPaymentFieldsByPaymentMethodeId
);

export default router;
