import React, { forwardRef } from "react";
import { InputText } from "primereact/inputtext";

export interface AppInputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  ariaDescribedBy?: string;
  labelClassName?: string;
  inputClassName?: string;
  mainClassName?: string;
  placeholder?: string;
  value?: string;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const AppInputText = forwardRef<HTMLInputElement, AppInputTextProps>(
  (
    {
      id,
      ariaDescribedBy,
      placeholder,
      value,
      onChange,
      mainClassName = "",
      label,
      labelClassName = "",
      inputClassName = "",
      type = "text",
      errorMessage,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-2 ${mainClassName}`}>
        <label className={`text-sm  ${labelClassName}`} htmlFor={id}>
          {label}
        </label>
        <InputText
          id={id}
          type={type}
          aria-describedby={ariaDescribedBy}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={ref}
          className={`p-inputtext !text-slate-500 w-full text-sm py-1 px-2 ${inputClassName}`}
          {...rest}
        />
        {errorMessage && (
          <small id={`${id}-error`} className="text-red-700">
            {errorMessage}
          </small>
        )}
        {ariaDescribedBy && (
          <small id={`${id}-description`} className="text-slate-500">
            {ariaDescribedBy}
          </small>
        )}
      </div>
    );
  }
);

export default AppInputText;
