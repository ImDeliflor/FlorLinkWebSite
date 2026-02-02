import type { PreguntasEvaluacion } from "./preguntas";

export interface EvaluacionReport {
  id_pregunta: number;
  grupo: string;
  id_evaluador: number;
  evaluador: string;
  id_evaluado: number;
  evaluado: string;
  enfoque: string;
  adn: string;
  pregunta: string;
  calificacion: number;
  observaciones?: string;
  fecha: string;
}

export interface ProcesarEvaluacion {
  // Evaluación de desempeño
  id_grupo_evaluacion: number;
  id_evaluador: number;
  id_evaluado: number;
  id_enfoque_evaluacion: number;
  observaciones?: string;

  // Preguntas de la evaluación
  preguntas: PreguntasEvaluacion[];
}
