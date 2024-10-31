import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const getPaymentFieldsByPaymentMethodeId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentMethodeId = req.params.paymentMethodeId;
    const paymentFields = await prisma.paymentField.findMany({
      where: {
        paymentMethodId: paymentMethodeId,
      },
    });

    if (paymentFields.length === 0) {
      res.status(404).json({
        message: "Aucun moyen de paiement n'est disponible pour le moment",
      });
      return;
    }
    res.status(200).json({
      message: "Moyens de paiement disponibles",
      paymentFields: paymentFields,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
