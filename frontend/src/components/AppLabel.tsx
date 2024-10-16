import React from "react";

interface AppLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const AppLabel: React.FC<AppLabelProps> = ({
  children,
  htmlFor,
  className,
  ...props
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default AppLabel;
