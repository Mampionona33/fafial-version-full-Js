import React from "react";

interface AppSelectProps {
  options?: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
}

const AppSelect: React.FC<AppSelectProps> = ({
  options = [],
  value,
  onChange,
  id,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <select
      id={id}
      value={value} // Manage default value here
      onChange={handleChange}
      className="px-2 text-sm mt-1 block w-full py-1 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-gray-700 transition-all duration-100"
    >
      <option value="" disabled>
        Veuillez choisir une option
      </option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="py-2 px-3 hover:bg-gray-100 cursor-pointer"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default AppSelect;
