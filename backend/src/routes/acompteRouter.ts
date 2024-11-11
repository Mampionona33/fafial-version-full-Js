import {
  getAcompteById,
  getAcompteByYearMonthPage,
} from "../controllers/AcompteController";
import express, { Router } from "express";

const router: Router = express.Router();

router.get("/acomptes", getAcompteByYearMonthPage);
router.get("/acomptes/:id", getAcompteById);
router.put("/acomptes/:id", getAcompteById);

export default router;
