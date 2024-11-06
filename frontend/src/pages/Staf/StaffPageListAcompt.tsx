import React from "react";
import HeaderStaffPagelistAcompt from "../../components/HeaderStaffPagelistAcompt.tsx";
import TableAcompte from "../../components/TableAcompte.tsx";

const StaffPageListAcompt: React.FC = () => {
  return (
    <div className="flex flex-col py-10 px-20 items-center justify-center gap-4">
      <HeaderStaffPagelistAcompt />
      <TableAcompte />
    </div>
  );
};

export default StaffPageListAcompt;
