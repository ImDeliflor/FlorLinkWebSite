import type { DetalleCompra, Product } from "@/features/products/types/product";
import { useEffect, useState } from "react";
import { type Order, type OrdersList, type UpdateOrder } from "../types/order";
import Swal from "sweetalert2";
import axios from "axios";
import { API_BASE_URL } from "@/config/apiConfig";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useAuthStore } from "@/shared/store/authStore";
import { useProtectedElement } from "@/shared/hooks/useProtectedElement";

const initialProduct: Product = {
  id_categoria: 24,
  descripcion_producto: "",
  unidad_medida: "bultos",
  cantidad_solicitada: 0,
  estado_detalle_compra: "Pendiente",
};

export const useOrder = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  const { esLiderGrupoColaborativoSinSA } = useProtectedElement();

  // Contexto global del usuario logeado
  const { user } = useAuthStore();

  // Estado inicial para las ordenes
  const initialOrder: Order = {
    id_grupo_colaborativo: user?.id_grupo_colaborativo,
    fecha: "",
    observaciones: "",
    solicitado_por: user?.id_usuario,
    aprobado_por: null,
    precio_total: null,
    estado_compra: "En proceso",
  };

  // useState para los productos
  const [arrayProducts, setArrayProducts] = useState<Product[]>([]);

  // Función para añadir un objeto de productos
  const addProduct = () => {
    setArrayProducts((prev) => [...prev, initialProduct]);
    console.log(arrayProducts);
  };

  // Función para remover un objeto de productos
  const removeProduct = () => {
    const indexToRemove = arrayProducts.length;

    setArrayProducts((prev) =>
      prev.filter((_, index) => index !== indexToRemove - 1)
    );
  };

  /************* Funciones para los input de productos ***************/

  //Función para el cambio de valor en el select
  const onChangeSelect = (
    index: number,
    key: keyof Product,
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

  /******************SECCIÓN PARA EL ENVÍO DEL FORMULARIO *********************/

  // useState para las órdenes de compra
  const [order, setOrder] = useState<Order>(initialOrder);

  // useState para deshabilitar el botón mientras se envía toda la información
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    if (user) {
      setOrder((prev) => ({
        ...prev,
        id_grupo_colaborativo: user.id_grupo_colaborativo,
        solicitado_por: user.id_usuario,
      }));
    }
  }, [user]);

  const [orders, setOrders] = useState<OrdersList>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Función para cuando cambie un campo en los datos de OrdenCompra
  const onChangeOrder = (key: keyof Order, value: string) => {
    setOrder((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/orden-compra`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error al obtener los productos: ", error);
      throw error;
    } finally {
      setLoadingOrders(false);
    }
  };

  // Función para el envío de las órdenes
  const handlerSubmitOrder = async () => {
    // asignación de variables
    const new_order = order;
    const new_products = arrayProducts;
    let id_orden_compra = 0;

    // Validación del campo observaciones
    if (new_order.observaciones.length == 0) {
      new_order.observaciones = "Sin observaciones";
    }

    // Cargar la fecha actual
    new_order.fecha = dayjs().format("YYYY-MM-DD HH:mm:ss");

    // Validación de que haya almenos un producto
    if (new_products.length > 0) {
      // Validación de los campos correspondientes a cada producto
      for (const obj of new_products) {
        if (
          obj.cantidad_solicitada === 0 ||
          obj.descripcion_producto.length == 0
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Ningún campo de los productos puede estar vacío!",
            confirmButtonColor: "#82385D",
          });

          return;
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Debe haber por lo menos un producto ingresado en la orden!",
        confirmButtonColor: "#82385D",
      });
      return;
    }

    // try para el envío de los datos a la API
    try {
      setDisabledButton(true);
      const response_order = await axios.post(
        `${API_BASE_URL}/orden-compra`,
        new_order
      );

      // Sacar el id del registro que se acabó de guardar
      id_orden_compra = response_order.data.id_orden_compra;

      // Validar que el id de la orden ya exista en la base de datos
      if (id_orden_compra != 0) {
        // Cargar el estado de aprobado en caso de ser un jefe
        if (esLiderGrupoColaborativoSinSA()) {
          // Enviar cada producto con estado ya aprobado y fecha de validación
          const response_products = arrayProducts.map(async (product) => {
            // try para el envío de los datos a la API
            try {
              await axios.post(`${API_BASE_URL}/detalle-compra`, {
                ...product,
                id_orden_compra: id_orden_compra,
                estado_detalle_compra: "Aprobado",
                fecha_validacion_detalle_compra: dayjs().format(
                  "YYYY-MM-DD HH:mm:ss"
                ),
              });
            } catch (error) {
              console.error(
                "Error al guardar el producto: ",
                product.descripcion_producto
              );
              throw error;
            }
          });

          // Enviar todas las promesas de response_products
          await Promise.all(response_products);

          // Cambiar el estado de toda la orden a aprobado
          try {
            await axios.put(`${API_BASE_URL}/orden-compra/${id_orden_compra}`, {
              estado_compra: "Aprobado",
              aprobado_por: 15, // Usuario de Don David
              fecha_validacion_orden_compra: dayjs().format(
                "YYYY-MM-DD HH:mm:ss"
              ),
            });
            getOrders();
          } catch (error) {
            console.log(
              "Error al enviar la orden de compra ya aprobada: ",
              error
            );
            throw error;
          }
        } else {
          // Enviar los productos en el formato base
          const response_products = arrayProducts.map(async (product) => {
            // try para el envío de los datos a la API
            try {
              await axios.post(`${API_BASE_URL}/detalle-compra`, {
                ...product,
                id_orden_compra: id_orden_compra,
              });
            } catch (error) {
              console.error(
                "Error al guardar el producto: ",
                product.descripcion_producto
              );
              throw error;
            }
          });

          // Enviar todas las promesas de response_products
          await Promise.all(response_products);
        }

        Swal.fire({
          icon: "success",
          title: "¡Orden y productos guardados con éxito!",
          confirmButtonColor: "#82385D",
        });

        resetOrder();
        resetProducts();
      }
    } catch (error) {
      console.error("Error al guardar la orden de compra: ", error);
      console.log(error);
      throw error;
    } finally {
      setDisabledButton(false);
    }
  };

  const handlerUpdateProduct = async (
    id_orden_compra: number,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    // Asignar los datos de los productos a una constante
    const new_products = arrayProducts;

    // Validación de que haya almenos un producto
    if (new_products.length > 0) {
      // Validación de los campos correspondientes a cada producto
      for (const obj of new_products) {
        if (
          obj.cantidad_solicitada === 0 ||
          obj.descripcion_producto.length == 0
        ) {
          return;
        }
      }
    }

    // try para el envío de los datos a la API
    try {
      // Validar que el id de la orden ya exista en la base de datos
      if (id_orden_compra != 0) {
        const response_products = arrayProducts.map(async (product) => {
          // try para el envío de los datos a la API
          try {
            await axios.post(`${API_BASE_URL}/detalle-compra`, {
              ...product,
              id_orden_compra: id_orden_compra,
            });
            console.log(
              "Producto ",
              product.descripcion_producto,
              " guardado con éxito"
            );
          } catch (error) {
            console.error(
              "Error al guardar el producto: ",
              product.descripcion_producto
            );
            throw error;
          }
        });

        // Enviar todas las promesas de response_products
        await Promise.all(response_products);

        Swal.fire({
          icon: "success",
          title: "¡Orden y productos guardados con éxito!",
          confirmButtonColor: "#82385D",
        });
        resetProducts();
      }
    } catch (error) {
      console.error("Error al guardar la orden de compra: ", error);
      console.log(error);
      throw error;
    }

    setOpen(false);
  };

  const sendToApproval = async (
    order: UpdateOrder,
    message: string,
    id?: number,
    productsToValidate?: DetalleCompra[],
    decision?: "Aprobar" | "Rechazar"
  ) => {
    // Validar que no haya nada pendiente
    if (productsToValidate && decision == "Aprobar") {
      const validarAprobados = productsToValidate?.some(
        (detalle) => detalle.estado_detalle_compra === "Aprobado"
      );

      // Validar que haya almenos un producto aprobado
      if (!validarAprobados) {
        Swal.fire({
          icon: "error",
          title: "¡Debe haber almenos 1 producto aprobado!",
          confirmButtonColor: "#82385D",
        });
        return;
      }

      const validarPendientes = productsToValidate?.some(
        (detalle) => detalle.estado_detalle_compra === "Pendiente"
      );

      // Validar en caso de haber almenos un producto pendiente
      if (validarPendientes) {
        Swal.fire({
          icon: "error",
          title: "¡No puede haber ningún producto pendiente por aprobación!",
          confirmButtonColor: "#82385D",
        });
        return;
      }
    }

    // Validar que esté todo rechazado en caso de rechazar la orden
    if (productsToValidate && decision == "Rechazar") {
      const estadosPermitidos = ["Rechazado"];

      const validarEstados = productsToValidate?.every((detalle) =>
        estadosPermitidos.includes(detalle.estado_detalle_compra)
      );

      if (!validarEstados) {
        Swal.fire({
          icon: "error",
          title: "¡No pueden haber órdenes pendientes ni aprobadas!",
          confirmButtonColor: "#82385D",
        });
        return;
      }
    }

    if (id) {
      try {
        await axios.put(`${API_BASE_URL}/orden-compra/${id}`, order);
        Swal.fire({
          icon: "success",
          title: message,
          confirmButtonColor: "#82385D",
        });
        getOrders();
      } catch (error) {
        console.log("Error al enviar la orden de compra: ", error);
        throw error;
      }
    } else {
      console.log("¡Se debe proporcionar un id de orden!");
    }
  };

  const resetOrder = () => {
    setOrder(initialOrder);
  };

  const resetProducts = () => {
    setArrayProducts([]);
  };

  const changeStateButton = (state: boolean) => {
    setDisabledButton(state);
  };

  // Datos y funciones a retornar
  return {
    arrayProducts,
    addProduct,
    removeProduct,
    resetProducts,
    onChangeSelect,
    order,
    orders,
    loadingOrders,
    getOrders,
    onChangeOrder,
    handlerSubmitOrder,
    handlerUpdateProduct,
    sendToApproval,
    disabledButton,
    changeStateButton,
  };
};
