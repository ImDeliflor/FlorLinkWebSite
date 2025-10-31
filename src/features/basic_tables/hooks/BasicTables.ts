import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config/apiConfig";
import type { Categorias } from "../types/basicTables";

export const useBasicTables = () => {
  // SECCIÓN PARA LAS CATEGORÍAS
  // useState para el array de categorías
  const [categorias, setCategorias] = useState<Categorias>([]);

  // Función para traer todas las categorías de la API
  const getCategorias = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categoria`);
      setCategorias(response.data);
    } catch (error) {
      console.error("Error al traer las categorías: ", error);
      throw error;
    }
  };

  // Datos y funciones a retornar
  return {
    categorias,
    getCategorias,
  };
};
