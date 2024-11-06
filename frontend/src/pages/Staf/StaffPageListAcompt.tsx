import React, { useEffect, useState } from "react";
import HeaderStaffPagelistAcompt from "../../components/HeaderStaffPagelistAcompt";
import TableAcompte from "../../components/TableAcompte";
import { useParams } from "react-router-dom";
import AcompteService from "../../services/AcompteService";
import { useLoading } from "../../hooks/useLoading";

const StaffPageListAcompt: React.FC = () => {
  const { setLoading } = useLoading();
  const [listeAcompte, setListAcompte] = useState<[] | null>(null);
  const { annee, mois, page } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { status, data } = await AcompteService.getAll({
          annee: Number(annee),
          mois: Number(mois),
          page: Number(page),
        });
        if (status === 200) {
          setListAcompte(data.acomptes);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [annee, mois, page, setLoading]);

  return (
    <div className="flex flex-col py-10 px-20 items-center justify-center gap-4">
      <HeaderStaffPagelistAcompt />
      <TableAcompte listeAcompte={listeAcompte} />
    </div>
  );
};

export default StaffPageListAcompt;
