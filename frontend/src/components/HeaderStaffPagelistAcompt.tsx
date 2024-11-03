import {Link} from "react-router-dom";

function HeaderStaffPagelistAcompt() {
  return <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center bg-slate-50 p-8 rounded-sm">
    <h2 className="text-3xl font-semibold text-gray-950 py-0 col-span-1 ">
      Liste des acomptes
    </h2>

    <div className="flex gap-4 justify-end w-full items-center md:col-span-2">
      <Link
        to="ajout"
        className="border border-gray-700 hover:bg-gray-500 hover:text-white font-bold py-2 px-10 rounded bg-slate-100 text-gray-950"
      >
        Ajouter acompte
      </Link>
    </div>
  </div>;
}

export default HeaderStaffPagelistAcompt