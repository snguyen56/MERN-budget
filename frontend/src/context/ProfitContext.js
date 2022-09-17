import { createContext, useState } from "react";

export const ProfitContext = createContext();

export const ProfitContextProvider = ({ children }) => {
  const [state, setState] = useState({
    income: 0,
    expense: 0,
    profit: 0,
  });

  function setIncome(amount) {
    setState((state) => {
      return {
        income: amount,
        expense: state.expense,
        profit: amount - state.expense,
      };
    });
  }

  function addIncome(amount) {
    setState((state) => {
      return {
        income: state.income + amount,
        expense: state.expense,
        profit: state.profit + amount,
      };
    });
  }

  function deleteIncome(amount) {
    setState((state) => {
      return {
        income: state.income - amount,
        expense: 0,
        profit: state.profit - amount,
      };
    });
  }

  function setExpense(amount) {
    setState((state) => {
      return {
        income: state.income,
        expense: amount,
        profit: state.income - amount,
      };
    });
  }

  function addExpense(amount) {
    setState((state) => {
      return {
        income: state.income,
        expense: state.expense + amount,
        profit: state.profit - amount,
      };
    });
  }

  function deleteExpense(amount) {
    setState((state) => {
      return {
        income: state.income,
        expense: state.expense - amount,
        profit: state.profit + amount,
      };
    });
  }

  return (
    <ProfitContext.Provider
      value={{
        state,
        setIncome,
        addIncome,
        deleteIncome,
        setExpense,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </ProfitContext.Provider>
  );
};
