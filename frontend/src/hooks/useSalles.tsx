import { useContext } from "react";
import { SalleContext } from "../contexts/SalleContext";

export const useSalles = () => {
  const context = useContext(SalleContext);
  if (!context) {
    throw new Error("useSalles must be used within an SalleProvider");
  }
  return context;
};
