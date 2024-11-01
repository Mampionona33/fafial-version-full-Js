import express, {Router} from "express";
import {getRecetteReferences} from "../controllers/RecetteController";

const router: Router = express.Router();

router.get("/recettes/references", getRecetteReferences);

export default router