import { getAllSalles } from "../controllers/SalleController";
import express from "express";

const router = express.Router();

router.get("/salles", getAllSalles);

export default router;
