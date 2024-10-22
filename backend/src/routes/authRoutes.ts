import {
  getAuthenticatedUser,
  login,
  refreshToken,
} from "../controllers/AuthController";
import express from "express";

const router = express.Router();

router.post("/login", login);
router.get("/authenticated", getAuthenticatedUser);
router.post("/refresh-token", refreshToken);

export default router;
