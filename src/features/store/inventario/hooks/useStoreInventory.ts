import { useState } from "react";
import api from "@/shared/api/axiosConfig";
import { API_BASE_URL } from "@/config/apiConfig";
import type {
  StoreInventory,
  StoreInventoryReport,
  UpdateStoreInventory,
} from "../types/storeInventory";

export const useStoreInventory = () => {
  // SECCIÓN PARA ALMACÉN
  const [inventario, setInventario] = useState<StoreInventoryReport[]>([]);

  // Función para traer todo el inventario
  const getStoreInventory = async () => {
    try {
      const response = await api.get(
        `${API_BASE_URL}/inventario-almacen/report`
      );
      setInventario(response.data);
    } catch (error) {
      console.error("Error al traer los productos en inventario: ", error);
      throw error;
    }
  };

  // Función para guardar en el inventario
  const handlerSaveInventory = async (inventory: StoreInventory) => {
    try {
      await api.post(`${API_BASE_URL}/inventario-almacen`, inventory);
      console.log("Inventario creado");
    } catch (error) {
      console.error(
        "Error al crear el producto de inventario: ",
        inventory.cod_producto
      );
      throw error;
    }
  };

  // Función para actualizar en el inventario
  const handlerUpdateInventory = async (
    id_inventario: number | undefined,
    inventory: UpdateStoreInventory
  ) => {
    try {
      await api.put(
        `${API_BASE_URL}/inventario-almacen/${id_inventario}`,
        inventory
      );
      console.log("Inventario actualizado");
    } catch (error) {
      console.error(
        "Error al actualizar el producto de inventario: ",
        inventory.cod_producto
      );
      throw error;
    }
  };

  // Función para buscar si un código de producto existe en el inventario
  const findOneItemInventory = async (cod_producto: number | undefined) => {
    const response = await api.get(
      `${API_BASE_URL}/inventario-almacen/exists/${cod_producto}`
    );

    // En caso de no existir
    if (!response.data.exists) {
      return response.data.exists; // Solo retornar false
    }

    return response.data; // Retornar true y la data del inventario
  };

  // Datos y funciones a retornar
  return {
    inventario,
    getStoreInventory,
    handlerSaveInventory,
    handlerUpdateInventory,
    findOneItemInventory,
  };
};
