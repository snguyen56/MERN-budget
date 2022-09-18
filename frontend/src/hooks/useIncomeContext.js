import { IncomeContext } from "../context/IncomeContext";
import { useContext } from "react";

export const useIncomeContext = () => {
  const context = useContext(IncomeContext);

  if (!context) {
    throw Error("Context must be used inside provider");
  }

  return context;
};
