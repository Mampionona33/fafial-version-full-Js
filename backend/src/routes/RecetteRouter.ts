import express, {Router} from "express";
import {createRecette, getRecetteByAcompteId, getRecetteReferences} from "../controllers/RecetteController";

const router: Router = express.Router();

router.get("/recettes/references", getRecetteReferences);
router.post("/recettes", createRecette);
router.get("/recettes/acompte/:idAcompte", getRecetteByAcompteId);

export default router