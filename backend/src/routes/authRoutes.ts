import { getAuthenticatedUser, login } from "../controllers/AuthController";
import express from "express";

const router = express.Router();

router.post("/login", login);
router.get("/authenticated", getAuthenticatedUser);

export default router;
