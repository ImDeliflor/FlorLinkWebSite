import { useState } from "react";
import {
  type StoreProduct,
  type StoreProductReport,
} from "../types/storeProduct";
import api from "@/shared/api/axiosConfig";
import { API_BASE_URL } from "@/config/apiConfig";
import Swal from "sweetalert2";

export const useStoreProducts = () => {
  // SECCIÓN PARA ALMACÉN
  const [productos, setProductos] = useState<StoreProductReport[]>([]);

  // Función para traer todas las categorías de la API
  const getStoreProducts = async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/producto-almacen/report`);
      setProductos(response.data);
    } catch (error) {
      console.error("Error al traer los productos de almacén: ", error);
      throw error;
    }
  };

  const saveStoreProduct = async (product: StoreProduct) => {
    try {
      const response = await api.post(
        `${API_BASE_URL}/producto-almacen`,
        product
      );
      Swal.fire({
        icon: "success",
        title: `¡Producto guardado exitosamente con el código ${response.data.cod_producto}`,
        confirmButtonColor: "#82385D",
      });
    } catch (error) {
      console.error("Error al guardar el producto: ", product.descripcion);
      throw error;
    }
  };

  // Datos y funciones a retornar
  return {
    productos,
    getStoreProducts,
    saveStoreProduct,
  };
};
