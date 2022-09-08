import { ExpenseContext } from "../context/ExpenseContext";
import { useContext } from "react";

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw Error("Context must be used inside provider");
  }

  return context;
};
