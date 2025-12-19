import Swal from "sweetalert2";
import api from "@/shared/api/axiosConfig";
import { API_BASE_URL } from "@/config/apiConfig";
import type { StoreIssue, StoreIssueReport } from "../types/issue";
import { useState } from "react";

export const useStoreIssues = () => {
  // SECCIÓN PARA LAS ENTRADAS DE ALMACÉN
  const [issues, setIssues] = useState<StoreIssueReport[]>([]);

  // Función para guardar una salida
  const saveStoreIssue = async (issue: StoreIssue) => {
    try {
      await api.post(`${API_BASE_URL}/salidas-almacen`, issue);
      Swal.fire({
        icon: "success",
        title: `Salida guardada exitosamente!`,
        confirmButtonColor: "#82385D",
      });
    } catch (error) {
      console.error(
        "Error al guardar la salida del producto: ",
        issue.cod_producto
      );
      throw error;
    }
  };

  // Función para obtener todas las salidas
  const getStoreIssues = async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/salidas-almacen/report`);
      setIssues(response.data);
    } catch (error) {
      console.error("Error al obtener las salidas");
      throw error;
    }
  };

  // Función para guardar una salida con lote
  const saveStoreIssueLote = async (issue: StoreIssue) => {
    try {
      await api.post(`${API_BASE_URL}/salidas-almacen/con-lote`, issue);
    } catch (error) {
      console.error(
        "Error al guardar la salida del producto: ",
        issue.cod_producto
      );
      throw error;
    }
  };

  // Función para guardar una salida sin lote
  const saveStoreIssueWithoutLote = async (issue: StoreIssue) => {
    try {
      await api.post(`${API_BASE_URL}/salidas-almacen/sin-lote`, issue);
    } catch (error) {
      console.error(
        "Error al guardar la salida del producto: ",
        issue.cod_producto
      );
      throw error;
    }
  };

  // Datos y funciones a retornar
  return {
    saveStoreIssue,
    issues,
    getStoreIssues,
    saveStoreIssueLote,
    saveStoreIssueWithoutLote,
  };
};
