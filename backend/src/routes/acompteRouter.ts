import { getAcompteByYearMonthPage } from "../controllers/AcompteController";
import express, { Router } from "express";

const router: Router = express.Router();

router.get("/acomptes", getAcompteByYearMonthPage);

export default router;
