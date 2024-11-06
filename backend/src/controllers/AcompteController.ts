import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { set } from "date-fns";

export const getAcompteByYearMonthPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { year, month, page } = req.params;

    // Parse `year` and `month` as integers
    const parsedYear = parseInt(year);
    const parsedMonth = parseInt(month);

    // Set start and end dates for the month
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

    // Fetch acomptes within the date range
    const acomptes = await prisma.acompte.findMany({
      where: {
        datePrevue: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Send response with the fetched data
    res.status(200).json({
      message: "Fetched acomptes successfully",
      acomptes: acomptes,
    });
  } catch (error) {
    next(error);
  }
};
