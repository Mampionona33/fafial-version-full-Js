import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { set } from "date-fns";

export const getAcompteByYearMonthPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { annee, mois, page, pageSize } = req.query;

    // Vérification et parsing des paramètres
    const parsedYear = parseInt(annee as string);
    const parsedMonth = parseInt(mois as string);
    const parsedPage = parseInt(page as string) || 1;
    const parsedPageSize = pageSize ? parseInt(pageSize as string) : 10; // Définir une valeur par défaut de 10 si pageSize est undefined
    console.log("pageSize", pageSize, "page", page);
    // Validation des paramètres
    if (
      isNaN(parsedYear) ||
      isNaN(parsedMonth) ||
      parsedMonth < 1 ||
      parsedMonth > 12
    ) {
      res.status(400).json({ message: "Invalid year or month parameter" });
      return;
    }

    // Calcul des dates de début et fin
    const startDate = set(new Date(parsedYear, parsedMonth - 1, 1), {
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    const endDate = set(new Date(parsedYear, parsedMonth, 1), {
      hours: 23,
      minutes: 59,
      seconds: 59,
    });

    // Pagination
    const skip = (parsedPage - 1) * parsedPageSize;

    // Récupération des acomptes depuis la base de données
    const acomptes = await prisma.acompte.findMany({
      take: parsedPageSize,
      skip: skip,
      where: {
        datePrevue: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        reservation: true,
      },
    });

    // Comptage des acomptes pour pagination
    const totalAcomptes = await prisma.acompte.count({
      where: {
        datePrevue: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Calcul du nombre total de pages
    const totalPages = Math.ceil(totalAcomptes / parsedPageSize);

    // Retour de la réponse avec la pagination
    res.status(200).json({
      message: "Fetched acomptes successfully",
      acomptes: acomptes,
      pagination: {
        currentPage: parsedPage,
        itemsPerPage: parsedPageSize,
        totalItems: totalAcomptes,
        totalPages: totalPages,
      },
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getAcompteById = async (req: Request, res: Response) => {
  try {
    const acompte = await prisma.acompte.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        reservation: true,
      },
    });

    if (!acompte) {
      res.status(404).json({ message: "Acompte non disponible" });
      return;
    }
    res.status(200).json({
      message: "Acompte disponible",
      acompte: acompte,
    });
    return;
  } catch (error) {
    console.error("getAcompteById", error);
    res.status(500).json({ error: "Une erreur s'est produite" });
    return;
  }
};
