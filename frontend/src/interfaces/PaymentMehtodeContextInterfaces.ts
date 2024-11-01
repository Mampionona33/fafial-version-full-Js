export interface PaymentMethodContextType {
  paymentMethodes: PaymentMethodInterface[];
  loading: boolean;
  error: string | null;
  setPaymentMethodes: React.Dispatch<
    React.SetStateAction<PaymentMethodInterface[]>
  >;
}

export interface PaymentMethodInterface {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  paymentFields: PaymentFieldInterface[];
}

export interface PaymentFieldInterface {
  id?: string;
  fieldName: string;
  isRequired: boolean;
}

export interface PaymentInterface {
  id?: string;
  amount: number;
  methodId: string;
  paymentMethod: PaymentMethodInterface;
  fields: PaymentFieldValueInterface[];
  createdAt: string;
  updatedAt: string;
}

export interface PaymentFieldValueInterface {
  id?: string;
  value: string;
  paymentId: string;
  paymentFieldId: string;
  paymentField: PaymentFieldInterface;
}
