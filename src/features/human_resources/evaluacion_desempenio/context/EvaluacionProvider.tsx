import type { ReactNode } from "react";
import { useEvaluacion } from "../hooks/useEvaluacion";
import { EvaluacionContext } from "./EvaluacionContext";

export const EvaluacionProvider = ({ children }: { children: ReactNode }) => {
  const evaluacion = useEvaluacion();

  return (
    <EvaluacionContext.Provider value={evaluacion}>
      {children}
    </EvaluacionContext.Provider>
  );
};
