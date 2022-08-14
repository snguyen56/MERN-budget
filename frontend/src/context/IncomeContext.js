import { createContext, useReducer } from "react";

export const IncomeContext = createContext();

export const incomeReducer = (state, action) => {
  switch (action.type) {
    case "SET_INCOMES":
      return {
        incomes: action.payload,
      };
    case "CREATE_INCOME":
      return {
        incomes: [action.payload, ...state.incomes],
      };
    default:
      return state;
  }
};

export const IncomeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(incomeReducer, {
    incomes: null,
  });

  return (
    <IncomeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </IncomeContext.Provider>
  );
};
