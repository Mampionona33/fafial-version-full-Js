import { Request, Response } from "express";

class ReservationController {
  public static async create(req: Request, res: Response) {
    try {
      const body = req.body;
      console.log("Données de la requête reçue :", body);

      res
        .status(201)
        .json({ message: "Réservation créée avec succès", data: body });
    } catch (error) {
      // Gestion des erreurs
      console.error("Erreur lors de la création de la réservation :", error);

      res.status(500).json({
        error:
          "Une erreur s'est produite lors de la création de la réservation",
      });
    }
  }
}

export default ReservationController;
