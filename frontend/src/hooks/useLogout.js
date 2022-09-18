import { useAuthContext } from "./useAuthContext";
import { useIncomeContext } from "./useIncomeContext";

export default function useLogout() {
  const { dispatchAuth } = useAuthContext();
  const { dispatchIncome } = useIncomeContext();
  const logout = () => {
    localStorage.removeItem("user");

    dispatchAuth({ type: "LOGOUT" });
    dispatchIncome({ type: "SET_INCOME", payload: null });
  };
  return logout;
}
