import AppInput from "./AppInput";
import AppLabel from "./AppLabel";

const FormField = ({
  label,
  value,
  onChange,
  id,
  type = "text",
  placeholder = "",
  disabled = false,
}: {
  label: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) => (
  <div>
    <AppLabel htmlFor={id}>{label}</AppLabel>
    <AppInput
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  </div>
);

export default FormField;
