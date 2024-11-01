import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prisma";

// Fonction pour obtenir toutes les salles
export const getAllSalles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salles = await prisma.salle.findMany();

    if (salles.length === 0) {
      res.status(404).json({
        message: "Aucune salle n'est disponible pour le moment",
      });
      return;
    }

    res.status(200).json({
      message: "Salles disponibles",
      salles,
    });
    return;
  } catch (error) {
    console.error("getAllSalles", error);
    next(error);
  }
};
