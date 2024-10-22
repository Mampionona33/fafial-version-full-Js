import { NextFunction, Request, Response } from "express";
import { set } from "date-fns"; // Importation des fonctions nécessaires
import prisma from "../../prisma/prisma";
import { ReservationRequestBody } from "interfaces/ReservationRequestBody";

class ReservationController {
  public static async create(
    req: Request<{}, {}, ReservationRequestBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      console.log("Données de la requête reçue :", body);

      // Convertir la date de début et de fin au format Date
      const dateDebut = new Date(body.dateDebut);
      const dateFin = new Date(body.dateFin);

      const heureDebut = ReservationController.addTimeToDate(
        dateDebut,
        body.heureDebut
      );
      const heureFin = ReservationController.addTimeToDate(
        dateFin,
        body.heureFin
      );

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
        next("Une erreur s'est produite lors de la.CreateCommande");
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
  }

  private static addTimeToDate(date: Date, time: string): Date {
    const [hours, minutes] = time.split(":").map(Number);
    const newDate = set(date, { hours, minutes, seconds: 0, milliseconds: 0 });
    return newDate;
  }

  public static async getAll(req: Request, res: Response) {
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
      console.error("ReservationController.getAll", error);
      res.status(500).json({
        error:
          "Une erreur s'est produite lors de la création de la réservation",
      });
      return;
    }
  }

  public static async get(req: Request, res: Response) {
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
      console.error("ReservationController.get", error);
      res.status(500).json({
        error:
          "Une erreur s'est produite lors de la création de la réservation",
      });
      return;
    }
  }
}

export default ReservationController;
