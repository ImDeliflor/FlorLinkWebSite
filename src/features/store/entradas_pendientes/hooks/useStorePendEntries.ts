import api from "@/shared/api/axiosConfig";
import type {
  PendingEntry,
  PendingEntryReport,
  UpdatePendingEntry,
} from "../types/pendingEntry";
import { API_BASE_URL } from "@/config/apiConfig";
import { useState } from "react";

export const useStorePendEntries = () => {
  // SECCIÓN PARA LAS ENTRADAS DE ALMACÉN PENDIENTES

  // useState para la data de las entradas pendientes
  const [pendEntries, setPendEntries] = useState<PendingEntryReport[]>([]);

  // Función para obtener todas las entradas pendientes
  const getPendingEntries = async () => {
    try {
      const response = await api.get(
        `${API_BASE_URL}/entradas-pendientes/estado-pendiente`
      );
      setPendEntries(response.data);
    } catch (error) {
      console.error("Error al obtener las entradas pendientes");
      throw error;
    }
  };

  // Función para guardar una entrada pendiente
  const handlerSavePendingEntry = async (pendEntry: PendingEntry) => {
    try {
      await api.post(`${API_BASE_URL}/entradas-pendientes`, pendEntry);
      console.log("Entrada pendiente guardada");
    } catch (error) {
      console.error(
        "Error al guardar la entrada pendiente del producto: ",
        pendEntry.cod_producto
      );
      throw error;
    }
  };

  // Función para actualizar una entrada pendiente
  const handlerUpdatePendingEntry = async (
    id_entry: number,
    pendEntry: UpdatePendingEntry
  ) => {
    try {
      await api.put(
        `${API_BASE_URL}/entradas-pendientes/${id_entry}`,
        pendEntry
      );
    } catch (error) {
      console.error(
        "Error al actualizar la entrada pendiente del producto: ",
        pendEntry.cod_producto
      );
      throw error;
    }
  };

  // Datos y funciones a retornar
  return {
    pendEntries,
    getPendingEntries,
    handlerSavePendingEntry,
    handlerUpdatePendingEntry,
  };
};
