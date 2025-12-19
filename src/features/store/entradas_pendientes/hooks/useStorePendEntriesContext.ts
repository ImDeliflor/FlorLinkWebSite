import { useContext } from "react";
import { StorePendEntriesContext } from "../context/StorePendEntriesContext";

export const useStorePendEntriesContext = () => {
  const ctx = useContext(StorePendEntriesContext);
  if (!ctx)
    throw new Error(
      "StorePendEntriesContext debe usarse dentro de StorePendEntriesProvider"
    );
  return ctx;
};
