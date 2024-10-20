import SalleController from "../controllers/SalleController";
import express from "express";

const router = express.Router();

router.get("/salles", SalleController.getAll);

export default router;
