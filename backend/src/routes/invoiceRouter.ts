import { Router } from "express";
import { createAcompteInvoice } from "../controllers/InvoiceController";
const router: Router = Router();

router.post("/invoices/acompte/:id", createAcompteInvoice);

export default router;
