import { Link } from "react-router-dom";
import AppCalendar from "../../components/AppCalendar";

const StafCalendar = () => {
  return (
    <div className="min-w-screen min-h-screen bg-transparent flex justify-center items-center px-4">
      <div className="w-full max-w-5xl bg-slate-100 p-8 flex flex-col items-center justify-center">
        <div className="w-full flex flex-row items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-gray-950">Calendrier</h1>
          <Link
            to="create-reservation"
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-8 rounded"
          >
            Ajouter réservation
          </Link>
        </div>
        <div className="overflow-scroll w-full h-full">
          <AppCalendar />
        </div>
      </div>
    </div>
  );
};

export default StafCalendar;
