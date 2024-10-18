import { Link } from "react-router-dom";

const SelectDashboardLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Link
      to={to}
      className="block p-4 bg-gray-700 text-white text-center rounded-sm shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600"
    >
      {label}
    </Link>
  );
};

export default SelectDashboardLink;
