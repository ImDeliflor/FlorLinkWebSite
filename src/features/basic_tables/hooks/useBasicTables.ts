import { useState } from "react";
import { API_BASE_URL } from "@/config/apiConfig";
import type {
  Categorias,
  CentroCostos,
  Laboratorio,
} from "../types/basicTables";
import api from "@/shared/api/axiosConfig";

export const useBasicTables = () => {
  // SECCIÓN PARA LAS CATEGORÍAS
  // useState para el array de categorías
  const [categorias, setCategorias] = useState<Categorias>([]);

  // useState para el array de los laboratorios
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);

  // useState para el array de los centros de costos
  const [centroCostos, setCentroCostos] = useState<CentroCostos[]>([]);

  // Función para traer todas las categorías de la API
  const getCategorias = async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/categoria`);
      setCategorias(response.data);
    } catch (error) {
      console.error("Error al traer las categorías: ", error);
      throw error;
    }
  };

  // Función para traer todos los laboratorios de la API
  const getLaboratorios = async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/laboratorio`);
      setLaboratorios(response.data);
    } catch (error) {
      console.error("Error al traer los laboratorios: ", error);
      throw error;
    }
  };

  // Función para traer todos los centros de costos de la API
  const getCentroCostos = async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/centro-costos`);
      setCentroCostos(response.data);
    } catch (error) {
      console.error("Error al traer los centros de costos: ", error);
      throw error;
    }
  };

  // Datos y funciones a retornar
  return {
    categorias,
    getCategorias,
    laboratorios,
    getLaboratorios,
    centroCostos,
    getCentroCostos,
  };
};
