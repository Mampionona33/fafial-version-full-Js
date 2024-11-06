import express, { Router } from "express";

const router: Router = express.Router();

router.get("/acomptes/annee/:annee/mois/:mois/page/:page", (req, res) => {
  res.send("Hello World");
});

export default router;
