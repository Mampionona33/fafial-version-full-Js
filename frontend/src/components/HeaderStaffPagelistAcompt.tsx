import { useSearchParams } from "react-router-dom";
import AppInput from "./AppInput";
import AppLabel from "./AppLabel";
import React from "react";

function HeaderStaffPageListAcompt() {
  // Initialize the state with the current month in the format 'YYYY-MM'
  const [month, setMonth] = React.useState<string>(
    new Date().toISOString().slice(0, 7)
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const handleMonthChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);

    // Extract year and month from the selected month value
    const year = selectedMonth.slice(0, 4);
    const month = selectedMonth.slice(5, 7);

    // Preserve existing search params and update 'annee' and 'mois'
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("annee", year);
    updatedParams.set("mois", month);

    // Update search params in the URL
    setSearchParams(updatedParams);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center bg-slate-50 p-8 rounded-sm w-full">
      <h2 className="text-3xl font-semibold text-gray-950 py-0 col-span-1">
        Liste des acomptes
      </h2>

      <div className="flex gap-4 justify-end w-full items-center md:col-span-2">
        <div>
          <AppLabel htmlFor="date">Sélectionner un mois</AppLabel>
          <AppInput type="month" value={month} onChange={handleMonthChange} />
        </div>
      </div>
    </div>
  );
}

export default HeaderStaffPageListAcompt;
