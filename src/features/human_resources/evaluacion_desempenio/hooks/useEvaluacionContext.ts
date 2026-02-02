import { useContext } from "react";
import { EvaluacionContext } from "../context/EvaluacionContext";

export const useEvaluacionContext = () => {
  const ctx = useContext(EvaluacionContext);
  if (!ctx)
    throw new Error(
      "useEvaluacionContext debe usarse dentro de EvaluacionProvider"
    );
  return ctx;
};
