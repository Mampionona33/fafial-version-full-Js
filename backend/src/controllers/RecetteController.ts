import prisma from "../../prisma/prisma";
import {Request, Response} from "express";

export const getRecetteReferences = async (req: Request, res: Response) => {
  try {
    // Importation dynamique de nanoid pour les modules ES
    const {nanoid} = require('fix-esm').require('nanoid');

    // Créer une référence pour le nouveau recette
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}${month}${day}`;
    const randomString = nanoid(10);
    const recetteRef: string = `REC-${formattedDate}-${randomString}`;
    console.log("recetteRef", recetteRef);

    // Vérifier si la référence existe dans la base de données
    const recette = await prisma.recette.findUnique({
      where: {
        reference: recetteRef,
      },
    });

    if (recette) {
      res.status(409).json({
        error: "La référence de la recette existe déjà",
      });
      return;
    }

    res.status(200).json({
      message: "Référence disponible",
      reference: recetteRef,
    });

    return;
  } catch (error) {
    console.error("getRecetteReferences", error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la sélection des recettes",
    });
    return;
  }
}