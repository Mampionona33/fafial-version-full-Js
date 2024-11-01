import {
  getAuthenticatedUser,
  login,
  logout,
  refreshToken,
} from "../controllers/AuthController";
import express from "express";

const router = express.Router();

router.post("/login", login);
router.get("/authenticated", getAuthenticatedUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

export default router;
