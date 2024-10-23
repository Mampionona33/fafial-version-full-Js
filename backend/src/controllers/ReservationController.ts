import { NextFunction, Request, Response } from "express";
import { set } from "date-fns"; // Importation des fonctions nécessaires
import prisma from "../../prisma/prisma";
import { ReservationRequestBody } from "interfaces/ReservationRequestBody";
import { Acompte } from "@prisma/client";

// Fonction pour créer une réservation
export const createReservation = async (
  req: Request<{}, {}, ReservationRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    console.log("Données de la requête reçue :", body);

    // Convertir la date de début et de fin au format Date
    const dateDebut = new Date(body.dateDebut);
    const dateFin = new Date(body.dateFin);

    const heureDebut = addTimeToDate(dateDebut, body.heureDebut);
    const heureFin = addTimeToDate(dateFin, body.heureFin);

    // Convertir les dates dans les acomptes en Date valide ISO
    const acomptes = body.acomptes.map((acompte) => ({
      ...acompte,
      datePrevue: new Date(acompte.datePrevue).toISOString(), // Conversion en ISO
    }));

    // Créer la réservation avec la date et l'heure combinées
    const newReservation = await prisma.reservation.create({
      data: {
        reference: body.reference,
        nomOrganisation: body.nomOrganisation,
        nomPrenomContact: body.nomPrenomContact,
        email: body.email,
        telephone: body.telephone,
        nombrePersonnes: body.nombrePersonnes,
        dateDebut,
        heureDebut,
        dateFin,
        heureFin,
        salleId: body.salleId,
        createdById: body.createdById,
        acomptes: {
          create: acomptes,
        },
        activite: body.activite,
        remarques: body.remarques,
        statut: body.statut,
        utilisateurType: body.utilisateurType,
        validationStatus: body.validationStatus,
      },
    });

    if (!newReservation) {
      next("Une erreur s'est produite lors de la création de la réservation");
      return;
    }

    res.status(201).json({
      message: "Réservation créée avec succès",
      data: newReservation,
    });
    return;
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Fonction pour ajouter l'heure à une date
const addTimeToDate = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(":").map(Number);
  const newDate = set(date, { hours, minutes, seconds: 0, milliseconds: 0 });
  return newDate;
};

// Fonction pour obtenir toutes les réservations
export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        validationStatus: "VALIDE",
      },
      include: {
        acomptes: true,
      },
    });

    if (reservations.length === 0) {
      res.status(200).json({
        message: "Aucune réservation n'est disponible pour le moment",
        reservations: reservations,
      });

      return;
    }
    res.status(200).json({
      message: "Réservations disponibles",
      reservations: reservations,
    });
    return;
  } catch (error) {
    console.error("getAllReservations", error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération des réservations",
    });
    return;
  }
};

// Fonction pour obtenir une réservation par son ID
export const getReservation = async (req: Request, res: Response) => {
  try {
    const reservation = await prisma.reservation.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        acomptes: true,
      },
    });

    if (!reservation) {
      res.status(404).json({
        error: "Réservation non disponible",
      });
      return;
    }
    res.status(200).json({
      message: "Réservation disponible",
      reservation: reservation,
    });
    return;
  } catch (error) {
    console.error("getReservation", error);
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération de la réservation",
    });
    return;
  }
};

export const updateReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;

    // Convertir la date de début et de fin au format Date
    const dateDebut = new Date(body.dateDebut);
    const dateFin = new Date(body.dateFin);

    const heureDebut = addTimeToDate(dateDebut, body.heureDebut);
    const heureFin = addTimeToDate(dateFin, body.heureFin);

    // Préparer les acomptes à mettre à jour
    const acomptes = body.acomptes.map((acompte: Acompte) => ({
      id: acompte.id, // Inclure l'ID pour la mise à jour
      datePrevue: new Date(acompte.datePrevue).toISOString(),
      montant: acompte.montant,
      modePaiement: acompte.modePaiement,
    }));

    // Mettre à jour la réservation
    const updatedReservation = await prisma.reservation.update({
      where: {
        id: req.params.id,
      },
      data: {
        reference: body.reference,
        nomOrganisation: body.nomOrganisation,
        nomPrenomContact: body.nomPrenomContact,
        email: body.email,
        telephone: body.telephone,
        nombrePersonnes: body.nombrePersonnes,
        dateDebut,
        heureDebut,
        dateFin,
        heureFin,
        salleId: body.salleId,
        createdById: body.createdById,
        acomptes: {
          // Mettre à jour les acomptes
          deleteMany: {},
          create: acomptes,
        },
        activite: body.activite,
        remarques: body.remarques,
        statut: body.statut,
        utilisateurType: body.utilisateurType,
        validationStatus: body.validationStatus,
      },
    });

    if (!updatedReservation) {
      res.status(404).json({ message: "Réservation non trouvée" });
      return;
    }

    res.status(200).json({
      message: "Réservation mise à jour avec succès",
      data: updatedReservation,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la réservation", error);
    next(error);
  }
};
