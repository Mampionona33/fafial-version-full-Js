import React from "react";

const AppInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = "",
  ...props
}) => {
  return (
    <input
      {...props}
      className={`px-2 text-sm mt-1 block w-full py-1 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-gray-700 transition-all duration-100 ${className}`} // Merge custom className with default styles
    />
  );
};

export default AppInput;
