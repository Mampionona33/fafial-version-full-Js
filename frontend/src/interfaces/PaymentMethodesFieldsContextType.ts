export interface PaymentMethodesFieldsContextType {
  paymentMethodesFields: PaymentMethodesFieldsInterface[];
  loading: boolean;
  error: string | null;
  setPaymentMethodes: React.Dispatch<
    React.SetStateAction<PaymentMethodesFieldsInterface[]>
  >;

  fetchPaymentFields: (id: string) => Promise<void>;
}

export interface PaymentMethodesFieldsInterface {
  id: string | undefined | number;
  fieldName: string;
  isRequired: boolean;
  paymentMethodId: string;
  type: string;
  label: string;
  value: number | string | boolean | Date | null;
}
