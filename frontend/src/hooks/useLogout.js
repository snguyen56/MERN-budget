import { useAuthContext } from "./useAuthContext";
import { useIncomeContext } from "./useIncomeContext";
import { useExpenseContext } from "./useExpenseContext";

export default function useLogout() {
  const { dispatchAuth } = useAuthContext();
  const { dispatchIncome } = useIncomeContext();
  const { dispatchExpense } = useExpenseContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatchIncome({ type: "SET_INCOME", payload: null });
    dispatchExpense({ type: "SET_EXPENSE", payload: null });
    dispatchAuth({ type: "LOGOUT" });
  };
  return logout;
}
