import { createContext } from "react";
import type { useEvaluacion } from "../hooks/useEvaluacion";

export const EvaluacionContext = createContext<ReturnType<
  typeof useEvaluacion
> | null>(null);
