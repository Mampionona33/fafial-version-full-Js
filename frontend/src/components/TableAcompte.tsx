import { useEffect, useState } from "react";
import AcompteService from "../services/AcompteService";

const TableAcompte = () => {
  const [listeAcompte, setListAcompte] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { status, data } = await AcompteService.getAll();
      console.log(data);
      if (status === 200) {
        setListAcompte(data.acomptes);
      }
    };
    if (listeAcompte.length === 0) {
      fetchData();
    }
  }, [listeAcompte]);

  return (
    <div className="flex flex-col py-10 px-20 items-center justify-center bg-slate-50">
      <p>TableAcompte</p>
    </div>
  );
};

export default TableAcompte;
