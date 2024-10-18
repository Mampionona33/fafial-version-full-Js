import React from "react";

interface AppSelectProps {
  options?: { value: string; label: string }[];
  onChange?: (label: string) => void;
  id?: string;
}

const AppSelect: React.FC<AppSelectProps> = ({
  options = [],
  onChange,
  id,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options.find(
      (option) => option.value === event.target.value
    );
    if (selectedOption && onChange) {
      onChange(selectedOption.label); // Retourne le label
    }
  };

  return (
    <select
      id={id}
      onChange={handleChange}
      className="mt-1 block w-full py-1 px-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-gray-700 transition-all duration-100"
    >
      <option value="" disabled>
        Sélectionnez une option
      </option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default AppSelect;
