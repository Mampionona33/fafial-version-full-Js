import AuthController from "controllers/AuthController";
import express from "express";

const router = express.Router();

// Définir la route de connexion
router.post("/login", AuthController.login);

export default router;
