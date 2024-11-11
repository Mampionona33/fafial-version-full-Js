import { PaymentMethodesFieldsInterface } from "./PaymentMethodesFieldsContextType";

export interface RecetteInterface {
  reference: string;
  personnePayeur: string;
  contactPayeur: string;
  date: string;
  description?: string;
  montant: number;
  paymentMethode: string;
  paymentFields: PaymentMethodesFieldsInterface[];
  createdAt?: string;
  updatedAt?: string;
}


