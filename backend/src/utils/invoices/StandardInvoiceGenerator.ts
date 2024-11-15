import { BaseInvoiceGenerator } from "./BaseInvoiceGenerator";
import fs from "fs";
import path from "path";
const PDFDocument = require("pdfkit");

export class StandardInvoiceGenerator extends BaseInvoiceGenerator {
  myCompanyLogo: string;

  constructor({
    clientName,
    clientContact,
    invoiceReference,
    date,
    myCompanyLogo = "", // Nom du fichier contenant le logo de l'entreprise
  }: {
    clientName: string;
    clientContact: string;
    invoiceReference: string;
    date: string;
    myCompanyLogo: string;
  }) {
    super(clientName, clientContact, invoiceReference, date, [], 0, {
      name: "",
      address: "",
      myCompanyLogo: myCompanyLogo || "",
      phone: "",
      email: "",
    });

    console.log("Constructor myCompanyLogo value: ", myCompanyLogo);
    this.myCompanyLogo = myCompanyLogo;
  }

  generatePDF(): string {
    console.log("generatePDF myCompanyLogo value: ", this.myCompanyLogo);

    const doc = new PDFDocument();
    const outputPath = path.resolve(
      __dirname,
      `/tmp/facture_${this.invoiceReference}.pdf`
    );
    const fileStream = fs.createWriteStream(outputPath);
    doc.pipe(fileStream);
    console.log("this.myCompanyLogo", this.myCompanyLogo);

    if (this.myCompanyLogo) {
      const logoPath = path.resolve(
        __dirname,
        "../../uploads/logos/myCompanyLogo",
        this.myCompanyLogo
      );

      console.log("Logo path: ", logoPath);

      if (fs.existsSync(logoPath)) {
        try {
          const imageData = fs.readFileSync(logoPath);

          if (imageData.length > 0) {
            console.log("Logo found and loaded successfully.");
            doc.image(imageData, 20, 15, {
              fit:[80,80],
            });
          } else {
            console.error("The logo image is empty.");
          }
        } catch (err) {
          console.error("Error when adding logo to PDF: ", err);
        }
      } else {
        console.log("No logo found or image is missing.");
      }
    } else {
      console.log("Logo filename is missing or empty.");
    }

    // Ajouter les informations de la facture
    doc
      .fontSize(14)
      .text(`Facture N°: ${this.invoiceReference}`, { align: "left" })
      .text(`Date: ${this.date}`, { align: "left" })
      .text(`Client: ${this.clientName}`, { align: "left" })
      .text(`Contact: ${this.clientContact}`, { align: "left" });

    // Finaliser la génération du PDF
    doc.end();

    fileStream.on("finish", () => {
      console.log(`Invoice generated successfully at: ${outputPath}`);
    });

    return outputPath;
  }

  static sendPDFToResponse(filePath: string, res: any): void {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        console.error("PDF file not found or is corrupted.");
        res.status(404).send("PDF generation error: file not found.");
        return;
      }

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="facture-acompte.pdf"'
      );

      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);

      fileStream.on("end", () => {
        console.log("PDF file successfully sent.");
      });

      fileStream.on("error", (err: Error) => {
        console.error("Error when sending PDF file: ", err);
        res.status(500).send("Error when sending the PDF.");
      });
    });
  }
}
