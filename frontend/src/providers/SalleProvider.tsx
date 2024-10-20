import { useEffect, useState } from "react";
import { SalleInterface } from "../interfaces/SalleInterface";
import SalleServices from "../services/SalleServices";
import { SalleContext } from "../contexts/SalleContext";
import { toast, ToastContainer } from "react-toastify";

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
        toast.error(
          "Une erreur est survenue lors de la recuperation des salles",
          {
            toastId: "error-salle",
          }
        );
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
      <ToastContainer />
    </SalleContext.Provider>
  );
};
