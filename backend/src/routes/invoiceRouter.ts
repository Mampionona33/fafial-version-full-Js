import { Router } from "express";
import {
  createAcompteInvoice,
  getAcompteInvoice,
} from "../controllers/InvoiceController";
const router: Router = Router();

router.post("/invoices/acompte/:id", createAcompteInvoice);
router.get("/invoices/acompte/:id", getAcompteInvoice);

export default router;
