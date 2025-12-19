import Swal from "sweetalert2";
import type { StoreEntry } from "../types/entry";
import api from "@/shared/api/axiosConfig";
import { API_BASE_URL } from "@/config/apiConfig";
import type { StoreEntryReport } from "../types/entry";
import { useState } from "react";

export const useStoreEntries = () => {
  // SECCIÓN PARA LAS ENTRADAS DE ALMACÉN
  const [entries, setEntries] = useState<StoreEntryReport[]>([]);

  // Función para guardar las entradas
  const saveStoreEntry = async (entry: StoreEntry) => {
    try {
      await api.post(`${API_BASE_URL}/entradas-almacen`, entry);
      Swal.fire({
        icon: "success",
        title: `¡Entrada guardada exitosamente!`,
        confirmButtonColor: "#82385D",
      });
    } catch (error) {
      console.error(
        "Error al guardar la entrada del producto: ",
        entry.cod_producto
      );
      throw error;
    }
  };

  // Función para obtener todas las entradas
  const getStoreEntry = async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/entradas-almacen/report`);
      setEntries(response.data);
    } catch (error) {
      console.error("Error al obtener las entradas");
      throw error;
    }
  };

  // Datos y funciones a retornar
  return {
    saveStoreEntry,
    entries,
    getStoreEntry,
  };
};
