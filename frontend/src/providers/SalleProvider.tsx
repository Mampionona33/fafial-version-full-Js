import { useEffect, useState } from "react";
import { SalleInterface } from "../interfaces/SalleInterface";
import SalleServices from "../services/SalleServices";
import { SalleContext } from "../contexts/SalleContext";
import AuthServices from "../services/AuthServices";

export const SalleProvider = ({ children }: { children: React.ReactNode }) => {
  const [salles, setSalles] = useState<SalleInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const accessToken = AuthServices.getTokenAccess();

  useEffect(() => {
    const fetchSalles = async () => {
      setLoading(true);
      try {
        const response = await SalleServices.getAll();
        if (response.status === 200) {
          setSalles(response.data.salles || []);
        } else {
          setError(response.data.messages || "Une erreur est survenue");
        }
      } catch (error) {
        console.error(error);
        setError("Une erreur est survenue lors de la récupération des salles");
      } finally {
        setLoading(false);
      }
    };
    
    if (accessToken) {
      fetchSalles();
    }

    return () => {
      setSalles([]);
    };
  }, [accessToken]);

  return (
    <SalleContext.Provider
      value={{
        salles,
        loading,
        error,
        setSalles,
      }}
    >
      {children}
    </SalleContext.Provider>
  );
};
