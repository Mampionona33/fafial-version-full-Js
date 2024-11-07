import AppInput from "./AppInput.tsx";
import AppLabel from "./AppLabel.tsx";
import React from "react";

function HeaderStaffPageListAcompt() {
  // Initialize the state with the current month in the format 'YYYY-MM'
  const [month, setMonth] = React.useState<string>(
    new Date().toISOString().slice(0, 7)
  );

  const handleMonthChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMonth(e.target.value); // Update the month state with the selected month
    console.log(e.target.value); // Log the selected month
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center bg-slate-50 p-8 rounded-sm w-full">
      <h2 className="text-3xl font-semibold text-gray-950 py-0 col-span-1">
        Liste des acomptes
      </h2>

      <div className="flex gap-4 justify-end w-full items-center md:col-span-2">
        <div>
          <AppLabel htmlFor="date">Sélectionner un mois</AppLabel>
          <AppInput
            type="month"
            value={month} // Set the value of the input to the state
            onChange={handleMonthChange}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderStaffPageListAcompt;
