import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";

export const useOrderContext = () => {
  const ctx = useContext(OrderContext);
  if (!ctx)
    throw new Error("useOrderContext debe usarse dentro de OrderProvider");
  return ctx;
};
