import { Request, Response } from "express";
import { set } from "date-fns"; // Importation des fonctions nécessaires
import prisma from "../../prisma/prisma";
import { ReservationRequestBody } from "interfaces/ReservationRequestBody";

class ReservationController {
  public static async create(
    req: Request<{}, {}, ReservationRequestBody>,
    res: Response
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
        res.status(500).json({
          error:
            "Une erreur s'est produite lors de la création de la réservation",
        });
        return;
      }

      res.status(201).json({
        message: "Réservation créée avec succès",
        data: newReservation,
      });
    } catch (error) {
      console.error(error); // Pour plus de détails sur l'erreur
      res.status(500).json({
        error:
          "Une erreur s'est produite lors de la création de la réservation",
      });
    }
  }

  private static addTimeToDate(date: Date, time: string): Date {
    const [hours, minutes] = time.split(":").map(Number);
    const newDate = set(date, { hours, minutes, seconds: 0, milliseconds: 0 });
    return newDate;
  }
}

export default ReservationController;
