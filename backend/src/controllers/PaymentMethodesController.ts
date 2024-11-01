import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prisma";

// Fonction pour obtenir tous les moyens de paiement
export const getAllPaymentMethodes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentMethodes = await prisma.paymentMethod.findMany();

    if (paymentMethodes.length === 0) {
      res.status(404).json({
        message: "Aucun moyen de paiement n'est disponible pour le moment",
      });
      return;
    }
    res.status(200).json({
      message: "Moyens de paiement disponibles",
      paymentMethodes: paymentMethodes,
    });
    return;
  } catch (error) {
    console.error(error);
    next(error);
  }
};
