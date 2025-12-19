import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { API_BASE_URL } from "@/config/apiConfig";
import api from "@/shared/api/axiosConfig";
import { useState } from "react";
import type { LoteProduct, UpdateLoteProduct } from "../types/loteProduct";
import { initialLote } from "../utils/initialValues";
import Swal from "sweetalert2";

export const useLoteProducts = () => {
  // Configuración de la zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // SECCIÓN PARA LOS PRODUCTOS CON LOTE
  const [loteProductos, setLoteProductos] = useState<LoteProduct[]>([]);

  // useState para los productos con lote
  const [arrayProducts, setArrayProducts] = useState<LoteProduct[]>([]);

  // Función para traer todos los lotes ingresados
  const getLoteProducts = async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/lote-producto/report`);
      setLoteProductos(response.data);
    } catch (error) {
      console.error("Error al traer los productos de almacén: ", error);
      throw error;
    }
  };

  // Función para guardar el lote de un producto
  const saveLoteProduct = async (lote: LoteProduct) => {
    try {
      await api.post(`${API_BASE_URL}/lote-producto`, lote);
    } catch (error) {
      console.error("Error al guardar el lote: ", lote.cod_producto);
      throw error;
    }
  };

  // Función para modificar el lote de un producto
  const updateLoteProduct = async (
    id_lote: number,
    lote: UpdateLoteProduct
  ) => {
    try {
      await api.put(`${API_BASE_URL}/lote-producto/${id_lote}`, lote);
    } catch (error) {
      console.error("Error al modificar el lote: ", lote.cod_producto);
      throw error;
    }
  };

  // Función para guardar varios lotes
  const saveAllLotes = async (
    cod_producto: number,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<boolean> => {
    const lotes = arrayProducts;

    // Validaciones
    if (lotes.length === 0) {
      alert("¡Debe haber al menos un lote para ingresar!");
      return false;
    }

    for (const obj of lotes) {
      if (
        !obj.nro_lote.trim() ||
        !obj.fecha_vencimiento.trim() ||
        obj.id_laboratorio === 0 ||
        !obj.categoria_toxicologica ||
        obj.cantidad_disponible_lote <= 0
      ) {
        alert("¡Todos los campos deben contener valor!");
        return false;
      }
    }

    try {
      await Promise.all(
        lotes.map((lote) =>
          saveLoteProduct({
            ...lote,
            cod_producto,
            fecha_ingreso: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          })
        )
      );

      setOpen(false);
      resetLotes();

      Swal.fire({
        icon: "success",
        title: "¡Todos los lotes fueron registrados exitosamente!",
        confirmButtonColor: "#82385D",
      });

      return true;
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error al guardar los lotes",
      });
      return false;
    }
  };

  //Función para cargar los datos de cada lote
  const onChangeSelectLote = (
    index: number,
    key: keyof LoteProduct,
    value: string | number
  ) => {
    setArrayProducts((prev) => {
      // copiar el array actual
      const updated = [...prev];

      // actualizar SOLO el campo indicado en el objeto indicado
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  // Función para añadir un objeto de lotes
  const addLote = () => {
    setArrayProducts((prev) => [...prev, initialLote]);
    console.log(arrayProducts);
  };

  // Función para remover un objeto de lotes
  const removeLote = () => {
    const indexToRemove = arrayProducts.length;

    setArrayProducts((prev) =>
      prev.filter((_, index) => index !== indexToRemove - 1)
    );
  };

  // Función para dejar el array de lotes vacíos (resetear)
  const resetLotes = () => {
    setArrayProducts([]);
  };

  // Datos y funciones a retornar
  return {
    loteProductos,
    getLoteProducts,
    saveLoteProduct,
    updateLoteProduct,
    arrayProducts,
    addLote,
    removeLote,
    onChangeSelectLote,
    saveAllLotes,
    resetLotes,
  };
};
