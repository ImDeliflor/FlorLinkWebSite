/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/es"; // importar el idioma
import { useEffect, useMemo, useState } from "react";
import { useOrderContext } from "../hooks/useOrderContext";
import { IoCartOutline } from "react-icons/io5";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import DetailOrder from "./modals/DetailOrder";
import { useProductContext } from "@/features/products/hooks/useProductContext";
import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";
import { BsHandThumbsDown } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";

export const Orders = () => {
  // OrderContext -> data y funciones correspondientes a las órdenes
  const { orders, loadingOrders, getOrders, sendToApproval } =
    useOrderContext();

  // ProductContext -> data y funciones correspondientes a los productos
  const { getProductsReport } = useProductContext();

  // Contexto de las tablas básicas (categoría)
  const { getCategorias } = useBasicTablesContext();

  // Configuración de la zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // useState para el filtro de "Estado" de la orden
  const [estado, setEstado] = useState("Todos");

  // UseEffect para cuando cambie el useState de las ordenes
  useEffect(() => {
    getOrders();
    getProductsReport();
    getCategorias();
  }, []);

  // Guardar las ordenes en memoria con filtrado dinámico
  const filteredOrders = useMemo(() => {
    if (estado === "Todos") return orders;
    return orders.filter((order) => order.estado_compra === estado);
  }, [orders, estado]);

  const totalOrders = filteredOrders.reduce(
    (acc, order) => (order.aprobado_por != 134 ? acc + 1 : acc),
    0
  );

  const pendingOrders = filteredOrders.reduce(
    (acc, order) =>
      order.aprobado_por != 134 && order.estado_compra == "En proceso"
        ? acc + 1
        : acc,
    0
  );

  /*********************** FUNCIÓN PARA ENVIAR LA ORDEN DE LA COMPRA JUNTO AL DETALLE */

  return (
    <div className="flex flex-col justify-between bg-[rgb(249,241,245)] h-screen p-2">
      <div className="flex items-center justify-between min-h-[10%] min-w-full bg-white px-5 rounded-[0.7rem]">
        <div className="flex items-center justify-center">
          <IoCartOutline size={35} color="#484848" />
          <span className="ml-4 text-3xl text-[#484848] font-bold">
            Ordenes de mi equipo
          </span>
        </div>
        {/* <Rules /> */}
      </div>

      <div className="flex items-center justify-center min-h-[10%] min-w-full bg-transparent px-5 rounded-[0.7rem]">
        <div className="flex flex-col items-center justify-center bg-[#E8B7BA] mx-10 py-5 px-7 rounded-xl">
          <span className="text-4xl text-[#82385D] font-extrabold">
            {totalOrders}
          </span>
          <span className="text-xl text-[#82385d93] font-bold">
            Órdenes de compra totales
          </span>
        </div>
        <div className="flex flex-col items-center justify-center bg-[#E8B7BA] mx-10 py-5 px-7 rounded-xl">
          <span className="text-4xl text-[#82385D] font-extrabold ">
            {pendingOrders}
          </span>
          <span className="text-xl text-[#82385d93] font-bold">
            Órdenes pendientes de revisión
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center min-h-[70%] max-h-[50%] min-w-full bg-white p-5 rounded-[0.7rem]">
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="bg-gray-50 w-[30%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6 mb-5"
        >
          <option value="Todos">Todos</option>
          <option value="En proceso">En proceso</option>
          <option value="Aprobado por gerencia">Aprobado por gerencia</option>
          <option value="Rechazado por gerencia">Rechazado por gerencia</option>
          <option value="Rechazado por lider">Rechazado por lider</option>
        </select>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders
                .filter((order) => order.aprobado_por != 134)
                .map((order, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{order.id_orden_compra}</td>
                    <td className="px-4 py-2">{order.fecha}</td>
                    <td
                      className={`px-4 py-2 font-medium ${
                        order.estado_compra === "Aprobado por gerencia"
                          ? "text-green-600"
                          : order.estado_compra === "Rechazado por gerencia"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.estado_compra}
                    </td>
                    <td className="px-4 py-2">{order.observaciones}</td>
                    <td className="px-4 py-2">
                      <DetailOrder
                        nro_orden={order.id_orden_compra}
                        is_gerencia={true}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() =>
                          sendToApproval(
                            {
                              estado_compra: "Aprobado por gerencia",
                              fecha_validacion_orden_compra: dayjs().format(
                                "YYYY-MM-DD HH:mm:ss"
                              ),
                            },
                            "¡Orden aprobada!",
                            order.id_orden_compra
                          )
                        }
                        className="flex items-center justify-center bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl"
                      >
                        <FaRegHandshake
                          className="mr-2"
                          size={20}
                          color="#E8B7BA"
                        />
                        Aprobar
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() =>
                          sendToApproval(
                            {
                              estado_compra: "Rechazado por gerencia",
                              fecha_validacion_orden_compra: dayjs().format(
                                "YYYY-MM-DD HH:mm:ss"
                              ),
                            },
                            "¡Orden rechazada!",
                            order.id_orden_compra
                          )
                        }
                        className="flex items-center justify-center bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl"
                      >
                        <BsHandThumbsDown
                          className="mr-2"
                          size={20}
                          color="#E8B7BA"
                        />
                        Rechazar
                      </button>
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
