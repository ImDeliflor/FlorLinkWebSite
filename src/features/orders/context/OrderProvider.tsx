import type { ReactNode } from "react";
import { useOrder } from "../hooks/useOrder";
import { OrderContext } from "./OrderContext";

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const order = useOrder();

  return (
    <OrderContext.Provider value={order}>{children}</OrderContext.Provider>
  );
};
