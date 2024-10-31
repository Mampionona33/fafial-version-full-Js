// PaymentMethodesFieldsContextType.ts
export interface PaymentMethodesFieldsContextType {
  paymentMethodes: string[]; // Liste des méthodes de paiement
  loading: boolean; // Indicateur de chargement
  error: string | null; // Message d'erreur
  setPaymentMethodes: React.Dispatch<
    React.SetStateAction<PaymentMethodesFieldsInterface | null>
  >; // Typage correct pour l'état
}

export interface PaymentMethodesFieldsInterface {
  id: string | undefined | number;
  amount: number;
  methodId: string;
  paymentMethod: string;
  fields: { [key: string]: [] };
  createdAt?: Date;
  updatedAt?: Date;
}
