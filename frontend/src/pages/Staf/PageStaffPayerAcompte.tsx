import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AcompteService from "../../services/AcompteService";

const PageStafAjoutAcompte = () => {
  const { idAcompte } = useParams();

  const fetchData = async (idAcompte: string) => {
    try {
      const resp = await AcompteService.getById(idAcompte);
      if (resp.status === 404) {
        throw new Error("Acompte not found");
      }
      return resp;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };

  useEffect(() => {
    if (!idAcompte) return;
    fetchData(idAcompte).then((resp) => console.log(resp));
  }, [idAcompte]);

  return (
    <div className="flex items-center justify-center p-10">
      <h1>Staf Ajout Acompte</h1>
    </div>
  );
};

export default PageStafAjoutAcompte;
