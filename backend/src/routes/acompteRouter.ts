import { getAcompteByYearMonthPage } from "../controllers/AcompteController";
import express, { Router } from "express";

const router: Router = express.Router();

router.get(
  "/acomptes/annee/:year/mois/:month/page/:page",
  getAcompteByYearMonthPage
);

export default router;
