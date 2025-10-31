import { createContext } from "react";
import { useOrder } from "../hooks/useOrder";

export const OrderContext = createContext<ReturnType<typeof useOrder> | null>(
  null
);
