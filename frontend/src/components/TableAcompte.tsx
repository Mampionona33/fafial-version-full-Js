import { useEffect, useState } from "react";
import AcompteService from "../services/AcompteService";
import { useParams } from "react-router-dom";

const TableAcompte = () => {
  const [listeAcompte, setListAcompte] = useState([]);
  const { annee, mois, page } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { status, data } = await AcompteService.getAll({
        annee: Number(annee),
        mois: Number(mois),
        page: Number(page),
      });
      console.log(data);
      if (status === 200) {
        setListAcompte(data.acomptes);
      }
    };
    if (listeAcompte.length === 0) {
      fetchData();
    }
  }, [listeAcompte, annee, mois, page]);

  return (
    <div className="flex flex-col py-10 px-20 items-center justify-center bg-slate-50">
      <p>TableAcompte</p>
    </div>
  );
};

export default TableAcompte;
