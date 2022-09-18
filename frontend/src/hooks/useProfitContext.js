import { ProfitContext } from "../context/ProfitContext";
import { useContext } from "react";

export const useProfitContext = () => {
  const context = useContext(ProfitContext);

  if (!context) {
    throw Error("Context must be used inside provider");
  }

  return context;
};
