import { createContext, useReducer } from "react";

export const ExpenseContext = createContext();

export const expenseReducer = (state, action) => {
  switch (action.type) {
    case "SET_EXPENSE":
      return {
        expenses: action.payload,
      };
    case "CREATE_EXPENSE":
      return {
        expenses: [action.payload, ...state.expenses],
      };
    case "DELETE_EXPENSE":
      return {
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const ExpenseContextProvider = ({ children }) => {
  const [state, dispatchExpense] = useReducer(expenseReducer, {
    expenses: null,
  });

  return (
    <ExpenseContext.Provider value={{ ...state, dispatchExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
