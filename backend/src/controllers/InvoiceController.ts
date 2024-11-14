import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { ReferenceGenerator } from "../utils/ReferenceGenerator";

export const createAcompteInvoice = async (req: Request, res: Response) => {
  try {
    const acompteId = req.params.id;

    // Recherche de l'acompte par son ID
    const acompte = await prisma.acompte.findUnique({
      where: {
        id: acompteId,
      },
    });

    const recette = await prisma.recette.findFirst({
      where: {
        acompteId: acompteId,
      },
    });

    // Vérification si l'acompte existe
    if (!acompte) {
      res.status(404).json({ message: "Acompte non disponible" });
      return;
    }

    const invoiceRef = ReferenceGenerator.generateReference("INV");

    // Création de la facture d'acompte
    const invoice = await prisma.invoice.create({
      data: {
        clientName: recette!.personnePayeur,
        reference: invoiceRef,
        clientContact: recette!.contactPayeur,
        totalAmount: acompte.montant,
        paymentStatus: "PAID",
        paymentDate: new Date(),
        invoiceType: "ACOMPTE",
        acompte: {
          connect: {
            id: acompteId,
          },
        },
      },
    });

    // Réponse de succès avec la facture créée
    res.status(201).json({
      message: "Facture d'acompte crée avec successe",
      invoice,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création de la facture d'acompte :",
      error
    );
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
