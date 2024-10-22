import { useEffect, useState } from "react";
import { SalleInterface } from "../interfaces/SalleInterface";
import SalleServices from "../services/SalleServices";
import { SalleContext } from "../contexts/SalleContext";

export const SalleProvider = ({ children }: { children: React.ReactNode }) => {
  const [salles, setSalles] = useState<SalleInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchSalles = async () => {
      try {
        const response = await SalleServices.getAll();
        if (response.status === 200) {
          setSalles(response.data.salles);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError("Une erreur est survenue lors de la recuperation des salles");
      }
    };
    fetchSalles();
    return () => {
      setSalles([]);
    };
  }, []);

  return (
    <SalleContext.Provider
      value={{
        salles,
        loading,
        setSalles,
        error,
      }}
    >
      {children}
    </SalleContext.Provider>
  );
};
