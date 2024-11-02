import express, {Router} from "express";
import {createRecette, getRecetteReferences} from "../controllers/RecetteController";

const router: Router = express.Router();

router.get("/recettes/references", getRecetteReferences);
router.post("/recettes", createRecette);

export default router