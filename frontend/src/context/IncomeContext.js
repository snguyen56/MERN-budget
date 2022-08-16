import { createContext, useReducer } from "react";

export const IncomeContext = createContext();

export const incomeReducer = (state, action) => {
  switch (action.type) {
    case "SET_INCOME":
      return {
        incomes: action.payload,
      };
    case "CREATE_INCOME":
      return {
        incomes: [action.payload, ...state.incomes],
      };
    case "DELETE_INCOME":
      return {
        incomes: state.incomes.filter(
          (income) => income._id !== action.payload._id
        ),
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
