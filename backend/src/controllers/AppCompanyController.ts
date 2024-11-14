import { Request, Response } from "express";
import prisma from "../../prisma/prisma";

export const createAppCompany = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address, logoUrl, website } = req.body;
    const appCompany = await prisma.appCompany.create({
      data: {
        name,
        email,
        phone,
        address,
        logoUrl,
        website,
      },
    });
    res.status(201).json(appCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite" });
  }
};
