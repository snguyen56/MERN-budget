import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: {
          ...action.payload,
          budgets: { totalBudget: 0, totalSpending: 0 },
        },
      };

    case "LOGOUT":
      return { user: null };

    case "EDIT_BUDGET":
      return {
        user: {
          ...state.user,
          user: {
            ...state.user.user,
            budgets: state.user.user.budgets.map((budget) =>
              budget._id === action.payload._id
                ? { ...budget, budget: action.payload.budget }
                : budget
            ),
          },
        },
      };

    case "SET_BUDGET":
      return {
        user: {
          ...state.user,
          budgets: action.payload,
        },
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatchAuth] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatchAuth({ type: "LOGIN", payload: user });
    }
  }, []);
  console.log("Auth data:", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
