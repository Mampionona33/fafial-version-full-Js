import fs from "fs";
import path from "path";
const PDFDocument = require("pdfkit");

interface ClientInfo {
  name: string;
  contact: string;
  contactName: string;
}

interface CompanyInfo {
  name: string;
  address: string;
  contact: string;
}

class DepositInvoiceGenerator {
  private myCompanyLogo: string;
  private title: string;
  private companyInfo: CompanyInfo | null;
  private clientInfo: ClientInfo | null;
  private bodyContent: string;

  constructor() {
    this.myCompanyLogo = "";
    this.title = "Invoice";
    this.companyInfo = null;
    this.clientInfo = null;
    this.bodyContent = "";
  }

  setTitle(title: string) {
    this.title = title;
  }

  setLogo(logo: string) {
    this.myCompanyLogo = logo;
  }

  setCompanyInfo(companyInfo: CompanyInfo) {
    this.companyInfo = companyInfo;
  }

  setClientInfo(clientInfo: ClientInfo) {
    this.clientInfo = clientInfo;
  }

  setBody(bodyContent: string) {
    this.bodyContent = bodyContent;
  }

  private setHeaders(doc: InstanceType<typeof PDFDocument>) {
    // Add Title and Company Info to the PDF
    doc.moveDown(2);
    if (this.companyInfo) {
      doc.fontSize(12).text(this.companyInfo.name, { align: "left" });
      doc.text(this.companyInfo.address, { align: "left" });
      doc.text(this.companyInfo.contact, { align: "left" });
      doc.rect(doc.x, 0, 500, doc.y).stroke();
    }
  }

  private setClientDetails(doc: InstanceType<typeof PDFDocument>) {
    if (this.clientInfo) {
      doc.moveDown(2);

      const rightAlignX = 400; // Adjust this X position to place the text to the right side

      // Information aligned to the right
      doc.text(`Client: ${this.clientInfo.name}`, rightAlignX, doc.y, {
        align: "left",
      });
      doc.text(`Contact: ${this.clientInfo.contact}`, rightAlignX, doc.y, {
        align: "left",
      });
      doc.text(
        `Contact Name: ${this.clientInfo.contactName}`,
        rightAlignX,
        doc.y,
        {
          align: "left",
        }
      );

      doc.moveDown(2);

      doc.rect(doc.x, 0, 500, doc.y).stroke();
    }
  }

  private addTitle(doc: InstanceType<typeof PDFDocument>) {
    doc.fontSize(16).text(this.title, -(doc.x - 400), doc.y, {
      align: "center",
    });
    doc.rect(doc.x, 0, 500, doc.y).stroke();
  }

  private setFooter(doc: InstanceType<typeof PDFDocument>) {
    doc.moveDown(3);
    doc.text("Thank you for your business!", { align: "center" });
  }

  generatePdf() {
    const doc = new PDFDocument();
    const outputPath = path.resolve(__dirname, `/tmp/facture_acompte.pdf`);
    const fileStream = fs.createWriteStream(outputPath);

    doc.pipe(fileStream);

    if (this.myCompanyLogo) {
      doc.image(this.myCompanyLogo, 20, 15, {
        fit: [80, 80],
      });
    }

    this.setHeaders(doc);
    this.setClientDetails(doc);
    this.addTitle(doc);
    doc.text(this.bodyContent);
    this.setFooter(doc);

    doc.end();

    return new Promise<string>((resolve, reject) => {
      fileStream.on("finish", () => resolve(outputPath));
      fileStream.on("error", (err) => reject(err));
    });
  }

  static sendPDFToResponse(filePath: string, res: any) {
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

export default DepositInvoiceGenerator;
