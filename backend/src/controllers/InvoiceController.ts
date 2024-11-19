import { Request, Response } from "express";
import prisma from "../../prisma/prisma";
import { ReferenceGenerator } from "../utils/ReferenceGenerator";
import { StandardInvoiceGenerator } from "../utils/invoices/StandardInvoiceGenerator";
import getLogoFile from "../utils/getLogoFile";
import DepositInvoiceGenerator from "../utils/invoices/DepositInvoiceGenerator";
import { IHeader } from "interfaces/pdfTableTypes";
const PDFDocument = require("pdfkit");

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

    const invoiceRef = ReferenceGenerator.generateReference("FAC");

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

// export const getAcompteInvoice = async (req: Request, res: Response) => {
//   try {
//     console.log(req.params.id);
//     const invoice = await prisma.invoice.findFirst({
//       where: {
//         acompteId: req.params.id,
//       },
//     });

//     if (!invoice) {
//       res.status(404).json({ message: "Facture non disponible" });
//       return;
//     }

//     // Créer un nouveau document PDF
//     const doc = new PDFDocument();

//     // Définir l'en-tête de réponse pour indiquer qu'un PDF est envoyé
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `inline; filename=facture-${invoice.id}.pdf`
//     );

//     // Écrire le PDF directement dans la réponse
//     doc.pipe(res);

//     // Ajouter du contenu au PDF
//     doc.fontSize(20).text(`Facture Acompte #${invoice.id}`, {
//       align: "center",
//     });

//     doc.moveDown();
//     doc.text(`Montant: ${invoice.totalAmount} Ar`);
//     doc.text(`Client: ${invoice.clientName}`);
//     doc.text(`Contact : ${invoice.clientContact}`);

//     // Terminer et fermer le document
//     doc.end();
//   } catch (error) {
//     console.error("getAcompteInvoice", error);
//     res.status(500).json({ error: "Une erreur s'est produite" });
//     return;
//   }
// };

// export const getAcompteInvoice = async (req: Request, res: Response) => {
//   try {
//     const invoice = await prisma.invoice.findFirst({
//       where: {
//         acompteId: req.params.id,
//       },
//     });

//     const myCompanies = await prisma.appCompany.findMany({
//       take: 1,
//     });
//     const myCompanyLogo = getLogoFile("myCompanyLogo");

//     console.log("myCompanies", myCompanies);

//     if (!invoice) {
//       res.status(404).json({ message: "Facture non disponible" });
//       return;
//     }

//     // Créer une instance de la classe pour générer le PDF
//     const invoiceGenerator = new StandardInvoiceGenerator({
//       invoiceReference: invoice.reference,
//       clientName: invoice.clientName,
//       clientContact: invoice.clientContact,
//       date: invoice.createdAt.toISOString().slice(0, 10),
//       myCompanyLogo: myCompanyLogo!,
//     });

//     const pdfFilePath = invoiceGenerator.generatePDF();

//     // Utiliser la méthode statique pour envoyer le PDF dans la réponse
//     StandardInvoiceGenerator.sendPDFToResponse(pdfFilePath, res);

//     // Utiliser la méthode statique pour envoyer le PDF dans la réponse
//   } catch (error) {
//     console.error(
//       "Erreur lors de la génération ou de l'envoi de la facture :",
//       error
//     );
//     res.status(500).json({
//       error: "Une erreur s'est produite lors de la génération de la facture.",
//     });
//   }
// };

export const getAcompteInvoice = async (req: Request, res: Response) => {
  try {
    const myCompanies = await prisma.appCompany.findMany({
      take: 1,
    });
    const myCompanyLogo = getLogoFile("myCompanyLogo");

    const invoice = await prisma.invoice.findFirst({
      where: {
        acompteId: req.params.id,
      },
    });

    const recette = await prisma.recette.findFirst({
      where: {
        acompteId: req.params.id,
      },
    });

    const reservation = await prisma.reservation.findFirst({
      where: {
        acomptes: {
          some: {
            id: req.params.id,
          },
        },
      },
    });

    console.log("reservation", reservation);
    console.log("invoice", invoice);

    const tableHeader: IHeader[] = [
      { label: "Détails", property: "details", width: 275 },
      { label: "Quantité", property: "quantity", width: 75 },
      { label: "Prix", property: "price", width: 75 },
      { label: "Total", property: "total", width: 75 },
    ];

    const depositeInvoice = new DepositInvoiceGenerator();
    depositeInvoice.setReference(`Réference: ${invoice!.reference}`);
    depositeInvoice.setTitle(`Reservation : ${reservation!.reference}`);
    depositeInvoice.setBody({ headers: tableHeader });
    depositeInvoice.setCompanyInfo({
      address: myCompanies[0].address,
      name: myCompanies[0].name,
      contact: myCompanies[0].phone,
    });
    depositeInvoice.setLogo(myCompanyLogo!);
    depositeInvoice.setClientInfo({
      contactName: "test",
      contact: "test",
      name: "test",
    });

    const pdfFilePath = await depositeInvoice.generatePdf();

    DepositInvoiceGenerator.sendPDFToResponse(pdfFilePath, res);
  } catch (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  }
};
