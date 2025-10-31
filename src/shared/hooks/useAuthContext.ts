import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  return ctx;
};
