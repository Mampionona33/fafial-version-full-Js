import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { set } from "date-fns";

export const getAcompteByYearMonthPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { year, month } = req.params;

    // Parse `year` and `month` as integers
    const parsedYear = parseInt(year);
    const parsedMonth = parseInt(month);
    const page = parseInt(req.params.page) || 1;
    const itemsPerPage = parseInt(req.params.itemPage) || 10;

    // Validate year and month
    if (
      isNaN(parsedYear) ||
      isNaN(parsedMonth) ||
      parsedMonth < 1 ||
      parsedMonth > 12
    ) {
      res.status(400).json({ message: "Invalid year or month parameter" });
      return;
    }

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

    // Calculate offset for pagination
    const skip = (page - 1) * itemsPerPage;

    // Fetch acomptes within the date range with pagination
    const acomptes = await prisma.acompte.findMany({
      take: itemsPerPage,
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

    // Count total acomptes for pagination info
    const totalAcomptes = await prisma.acompte.count({
      where: {
        datePrevue: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalAcomptes / itemsPerPage);

    // Send response with the fetched data and pagination info
    res.status(200).json({
      message: "Fetched acomptes successfully",
      acomptes: acomptes,
      pagination: {
        currentPage: page,
        itemsPerPage: itemsPerPage,
        totalItems: totalAcomptes,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};
