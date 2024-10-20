import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

class PaymentMethodesController {
  static async getAll(req: Request, res: Response) {
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
    } catch (error) {}
  }
}
export default PaymentMethodesController;
