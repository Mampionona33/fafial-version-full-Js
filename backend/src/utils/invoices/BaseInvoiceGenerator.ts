import fs from "fs";
const PDFDocument = require("pdfkit");

// Définition d'un type pour les articles
export interface InvoiceItems {
  description: string;
  quantity: number;
  unitPrice: number;
}

export abstract class BaseInvoiceGenerator {
  protected clientName: string;
  protected clientContact: string;
  protected clientAddress?: string;
  protected invoiceReference: string;
  protected date: string;
  protected items: InvoiceItems[];
  protected discount: number;
  protected totalAmount: number;
  protected myCompanyName: string;
  protected myCompanyAddress: string;
  protected myCompanyLogo: string;
  protected myCompanyPhone: string;
  protected myCompanyEmail: string;

  // Constructeur avec des valeurs par défaut et des objets pour organiser les données
  constructor(
    clientName: string,
    clientContact: string,
    invoiceReference: string,
    date: string,
    items: InvoiceItems[],
    discount: number = 0,
    companyDetails: {
      name: string;
      address: string;
      myCompanyLogo: string;
      phone: string;
      email: string;
    }
  ) {
    this.clientName = clientName;
    this.clientContact = clientContact;
    this.invoiceReference = invoiceReference;
    this.date = date;
    this.items = items;
    this.discount = discount;
    this.myCompanyName = companyDetails.name;
    this.myCompanyAddress = companyDetails.address;
    this.myCompanyLogo = companyDetails.myCompanyLogo;
    this.myCompanyPhone = companyDetails.phone;
    this.myCompanyEmail = companyDetails.email;

    // Calcul du montant total dès l'initialisation
    this.totalAmount = this.calculateTotal();
  }

  // Calcul du montant total des articles
  protected calculateTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0
    );
  }

  // Calcul du montant de la remise
  protected calculateDiscount(): number {
    return (this.discount / 100) * this.totalAmount;
  }

  // Calcul du montant total après remise
  protected calculateTotalWithDiscount(): number {
    return this.totalAmount - this.calculateDiscount();
  }

  // Méthode abstraite pour générer le PDF de la facture
  // Cela permettra aux sous-classes d'implémenter leur propre logique de génération de PDF
  abstract generatePDF(): void;
}
