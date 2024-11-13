import prisma from "../../prisma/prisma";
import { NextFunction, Request, Response } from "express";

export const getRecetteReferences = async (_req: Request, res: Response) => {
  try {
    // Importation dynamique de nanoid pour les modules ES
    const { nanoid } = require("fix-esm").require("nanoid");

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
};

export const createRecette = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      reference,
      personnePayeur,
      contactPayeur,
      date,
      description,
      montant,
      paymentMethode,
      acompteId,
      paymentFields,
    } = req.body;

    // 1. Création de la recette principale
    const recette = await prisma.recette.create({
      data: {
        reference,
        personnePayeur,
        contactPayeur,
        date: new Date(date),
        description,
        montant: parseFloat(montant),
        paymentMethode: { connect: { id: paymentMethode } },
        acompte: { connect: { id: acompteId } },
      },
    });

    // 2. Création du paiement associé à la recette
    const payment = await prisma.payment.create({
      data: {
        amount: parseFloat(montant),
        fields: {},
        recette: { connect: { id: recette.id } },
        paymentMethod: { connect: { id: paymentMethode } },
      },
    });

    // 3. Enregistrer les champs dynamiques pour le paiement
    if (paymentFields && paymentFields.length > 0) {
      for (const field of paymentFields) {
        const paymentField = await prisma.paymentField.findFirst({
          where: {
            id: field.id,
          },
        });

        if (paymentField) {
          await prisma.paymentFieldValue.create({
            data: {
              value: field.value,
              payment: { connect: { id: payment.id } },
              paymentField: { connect: { id: paymentField.id } },
            },
          });
        } else {
          console.error(
            `Champ ${field.fieldName} non trouvé pour la méthode ${paymentMethode}`
          );
        }
      }
    }

    // Réponse de succès
    res.status(201).json({
      message: "Recette créée avec succès",
      data: {
        recette,
        payment,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la création de la recette:", error);
    next(error);
  }
};

export const getRecetteByAcompteId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idAcompte = req.params.idAcompte;
    const recettes = await prisma.recette.findMany({
      where: {
        acompteId: idAcompte,
      },
      include: {
        paymentMethode: true,
      }
    });
    res.status(200).json({
      message: "Recettes trouvées",
      recettes ,
    });
  } catch (error) {
    console.error("Error fetching recettes:", error);
    next(error);
  }
};
