import { useState } from "react";
import type { EvaluacionReport, ProcesarEvaluacion } from "../types/evaluacion";
import api from "@/shared/api/axiosConfig";
import { API_BASE_URL } from "@/config/apiConfig";
import type { Compromisos } from "../types/compromisos";
import Swal from "sweetalert2";

export const useEvaluacion = () => {
  // SECCIÓN PARA LAS EVALUACIONES DE

  // useState para las evaluaciones de desempeño
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionReport[]>([]);

  // Función para obtener todas las evaluaciones de desempeño
  const getEvaluaciones = async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/preguntas/report`);
      setEvaluaciones(response.data);
    } catch (error) {
      console.error("Error al traer las evaluaciones");
      throw error;
    }
  };

  // Función para procesar las evaluaciones de desempeño y las preguntas
  const processEvaluacion = async (
    evaluacion: ProcesarEvaluacion,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setDisableButton: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    try {
      await api.post(
        `${API_BASE_URL}/evaluacion-desempenio/procesar`,
        evaluacion,
      );
      setOpen(false);
      Swal.fire({
        icon: "success",
        title: `¡Proceso realizado correctamente!`,
        confirmButtonColor: "#82385D",
      });
    } catch (error) {
      alert(
        "Hubo un error al enviar la evaluación, intenta de nuevo revisando todos los datos",
      );
      throw error;
    } finally {
      setDisableButton(false);
    }
  };

  // Función para guardar los compromisos
  const saveCompromisos = async (
    compromisos: Compromisos[],
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setDisableButton: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    try {
      await api.post(
        `${API_BASE_URL}/compromisos-empleado/procesar`,
        compromisos,
      );
      setOpen(false);
      Swal.fire({
        icon: "success",
        title: `¡Proceso realizado correctamente!`,
        confirmButtonColor: "#82385D",
      });
    } catch (error) {
      alert(
        "Hubo un error al enviar los compromisos, revisa los datos e intenta de nuevo",
      );
      throw error;
    } finally {
      setDisableButton(false);
    }
  };

  // Datos y funciones a retornar
  return {
    evaluaciones,
    getEvaluaciones,
    processEvaluacion,
    saveCompromisos,
  };
};
