import React from "react";

interface AppSelectProps {
  options?: { value: string; label: string }[];
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Modifier ici
  id?: string;
}

const AppSelect: React.FC<AppSelectProps> = ({
                                               options = [],
                                               value,
                                               onChange,
                                               name,
                                               id,
                                             }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event); // Passer l'événement complet
    }
  };

  return (
    <select
      id={id}
      value={value} // Gérer la valeur par défaut ici
      onChange={handleChange}
      name={name}
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
