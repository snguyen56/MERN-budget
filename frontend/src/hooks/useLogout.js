import { useAuthContext } from "./useAuthContext";

export default function useLogout() {
  const { dispatchAuth } = useAuthContext();
  const logout = () => {
    localStorage.removeItem("user");

    dispatchAuth({ type: "LOGOUT" });
  };
  return logout;
}
