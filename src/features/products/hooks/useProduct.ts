import React, { useState } from "react";
import { type DetalleCompra, type UpdateProduct } from "../types/product";
import axios from "axios";
import { API_BASE_URL } from "@/config/apiConfig";
import Swal from "sweetalert2";

export const useProduct = () => {
  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  // useState para el reporte de los productos
  const [productReport, setProductReport] = useState<DetalleCompra[]>([]);

  // Función para traer todos los datos de la vista de productos detallados
  const getProductsReport = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/detalle-compra/report`);
      setProductReport(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener el detalle de los productos: ", error);
      throw error;
    }
  };

  // Función para actualizar un producto
  const handlerUpdateProduct = async (
    data: DetalleCompra[],
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    // Llaves que se van a usar en la inserción de los datos
    const allowedKeys = [
      "id_detalle_compra",
      "id_categoria",
      "descripcion_producto",
      "unidad_medida",
      "cantidad_solicitada",
    ];

    // Limpiar data con las llaves necesarias
    const cleanedData = data.map((product) =>
      Object.fromEntries(
        Object.entries(product).filter(([key]) => allowedKeys.includes(key))
      )
    );

    // Almacenar las promesas de los datos para actualizar
    const updateData = cleanedData.map(async (product) => {
      try {
        await axios.put(
          `${API_BASE_URL}/detalle-compra/${product.id_detalle_compra}`,
          product
        );
      } catch (error) {
        console.log("Error al actualizar el producto: ", error);
        throw error;
      }
    });

    // Enviar todas las promesas de updateData
    await Promise.all(updateData);

    Swal.fire({
      icon: "success",
      title: "¡Productos editados con éxito!",
      confirmButtonColor: "#82385D",
    });

    setOpen(false);
  };

  const setDetailProductState = async (product: UpdateProduct) => {
    try {
      await axios.put(
        `${API_BASE_URL}/detalle-compra/${product.id_detalle_compra}`,
        product
      );
      getProductsReport();
    } catch (error) {
      console.log("Error al cargar el nuevo estado del producto: ", error);
      throw error;
    }
  };

  // Cambiar el estado de open
  const setStateOpen = () => {
    setOpen(!open);
  };

  // Datos y funciones a retornar
  return {
    productReport,
    getProductsReport,
    handlerUpdateProduct,
    open,
    setDetailProductState,
    setStateOpen,
  };
};
