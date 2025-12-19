import type { ReactNode } from "react";
import { useStoreInventory } from "../hooks/useStoreInventory";
import { StoreInventoryContext } from "./StoreInventoryContext";

export const StoreInventoryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const store = useStoreInventory();

  return (
    <StoreInventoryContext.Provider value={store}>
      {children}
    </StoreInventoryContext.Provider>
  );
};
