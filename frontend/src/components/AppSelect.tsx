import React from "react";

interface AppSelectProps {
  options?: { value: string; label: string }[];
  value?: string;
  defaultValue?: string; // Ajout de defaultValue
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
}

const AppSelect: React.FC<AppSelectProps> = ({
  options = [],
  value,
  defaultValue, // Ajout de defaultValue ici
  onChange,
  name,
  id,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <select
      id={id}
      name={name}
      value={value} // Utilisé si un contrôle externe est défini
      defaultValue={defaultValue} // Utilisé si value n'est pas défini
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
