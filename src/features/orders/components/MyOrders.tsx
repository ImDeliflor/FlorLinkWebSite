/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/es"; // importar el idioma
import { useEffect } from "react";
import Rules from "./rules/Rules";
import { useOrderContext } from "../hooks/useOrderContext";
import { IoCartOutline } from "react-icons/io5";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import DetailOrder from "./modals/DetailOrder";
import { useProductContext } from "@/features/products/hooks/useProductContext";
import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";
import AddProduct from "@/features/products/components/modals/AddProduct";

export const MyOrders = () => {
  // OrderContext -> data y funciones correspondientes a las órdenes
  const { orders, loadingOrders, getOrders } = useOrderContext();

  // ProductContext -> data y funciones correspondientes a los productos
  const { getProductsReport } = useProductContext();

  // Contexto de las tablas básicas (categoría)
  const { getCategorias } = useBasicTablesContext();

  // Configuración de la zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // UseEffect para cuando cambie el useState de las ordenes
  useEffect(() => {
    getOrders();
    getProductsReport();
    getCategorias();
  }, []);

  /*********************** FUNCIÓN PARA ENVIAR LA ORDEN DE LA COMPRA JUNTO AL DETALLE */

  return (
    <div className="flex flex-col justify-between bg-[rgb(249,241,245)] h-screen p-2">
      <div className="flex items-center justify-between min-h-[10%] min-w-full bg-white px-5 rounded-[0.7rem]">
        <div className="flex items-center justify-center">
          <IoCartOutline size={35} color="#484848" />
          <span className="ml-4 text-3xl text-[#484848] font-bold">
            Mis órdenes de compra
          </span>
        </div>
        <Rules />
      </div>

      <div className="flex items-center justify-center min-h-[10%] min-w-full bg-transparent px-5 rounded-[0.7rem]">
        <div className="flex flex-col items-center justify-center bg-[#E8B7BA] mx-10 py-5 px-7 rounded-xl">
          <span className="text-4xl text-[#82385D] font-extrabold">12</span>
          <span className="text-xl text-[#82385d93] font-bold">
            Órdenes de compra totales
          </span>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#E8B7BA] mx-10 py-5 px-7 rounded-xl">
          <span className="text-4xl text-[#82385D] font-extrabold ">2</span>
          <span className="text-xl text-[#82385d93] font-bold">
            Órdenes pendientes de revisión
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center min-h-[70%] max-h-[50%] min-w-full bg-white p-5 rounded-[0.7rem]">
        {loadingOrders ? (
          <LoadingSpinner />
        ) : (
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm text-sm text-left">
            <thead className="bg-[#E8B7BA] text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Observaciones</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{order.id_orden_compra}</td>
                  <td className="px-4 py-2">{order.fecha}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      order.estado_compra === "Aprobado por gerencia"
                        ? "text-[#207349]"
                        : order.estado_compra === "Rechazado por gerencia" ||
                          order.estado_compra === "Rechazado por lider"
                        ? "text-[#b82834]"
                        : "text-[#E9B44C]"
                    }`}
                  >
                    {order.estado_compra}
                  </td>
                  <td className="px-4 py-2">{order.observaciones}</td>
                  <td className="px-4 py-2">
                    <AddProduct nro_orden={order.id_orden_compra} />
                  </td>
                  <td className="px-4 py-2">
                    <DetailOrder nro_orden={order.id_orden_compra} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
