/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es"; // importar el idioma
import { FiRefreshCcw } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";
import type { FormFilterTarifasMensuales } from "../types/tarifaMensual";
import { initialValueTarifas } from "../utils/initialValues";
import { useGetTarifasMensuales } from "../hooks/useTarifaMensual";
import { MdOutlineElectricalServices } from "react-icons/md";
import ModalCrearTarifa from "./modals/ModalCrearTarifa";
import { filterTarifas } from "../utils/tarifasFilters";
import { formatCOP } from "@/shared/utils/formatCOP";

export const TarifaMensualMainScreen = () => {
  // Configuración de fecha, hora y zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  /*********************************  CONTEXTOS *************************************/
  // Contexto de las tablas básicas - categorías
  const { tipoTarifa, getTiposTarifa, getCentroCostos } =
    useBasicTablesContext();

  // Estado de uso para el filtro de las tarifas
  const [formFilter, setFormFilter] =
    useState<FormFilterTarifasMensuales>(initialValueTarifas);

  // React Query -> Traer las tarifas mensuales
  const { data: dataTarifas = [] } = useGetTarifasMensuales();

  // Función para filtrar las entradas
  const filteredEntries = filterTarifas(dataTarifas, formFilter);

  // // Función para dar acceso a un elemento
  // const { canAccess } = useProtectedElement();

  // Función para borrar filtros
  const resetFilters = () => {
    setFormFilter(initialValueTarifas);
  };
  // useEffect para traer las categorías
  useEffect(() => {
    getTiposTarifa();
    getCentroCostos();
  }, []);

  return (
    <div className="flex flex-col justify-between bg-[rgb(249,241,245)] h-screen p-2">
      <div className="flex items-center justify-between min-h-[10%] min-w-full bg-white px-5 rounded-[0.7rem]">
        <div className="flex items-center justify-center">
          <MdOutlineElectricalServices size={35} color="#484848" />
          <span className="ml-4 text-3xl text-[#484848] font-bold">
            Tarifas Mensuales
          </span>
        </div>
        <ModalCrearTarifa />
      </div>

      <div className="flex flex-col items-center justify-around min-h-[20%] max-h-[30%] min-w-full bg-white p-5 rounded-[0.7rem]">
        <span className="text-xl text-[#484848] font-bold">Filtrar por</span>
        <div className="flex justify-center gap-12 w-[100%]">
          {/* <input
            className="w-[10%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
            type="text"
            placeholder="Código"
            name=""
            id=""
            onChange={(e) =>
              setFormFilter((prev) => ({
                ...prev,
                codigo: e.target.value,
              }))
            }
            defaultValue={formFilter.codigo}
          /> */}
          <select
            id="default"
            className="bg-gray-50 w-[30%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6"
            value={formFilter.tipo_tarifa}
            onChange={(e) =>
              setFormFilter((prev) => ({
                ...prev,
                tipo_tarifa: e.target.value,
              }))
            }
          >
            <option value="Todas">Todas las tarifas</option>
            {[...tipoTarifa]
              .sort((a, b) => a.nombre.localeCompare(b.nombre))
              .map((_valor, index) => (
                <option key={index} value={_valor.nombre}>
                  {_valor.nombre}
                </option>
              ))}
          </select>
          {/* <input
            className="w-[45%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
            type="date"
            placeholder="Descripción (nombre, referencia, marca, etc)"
            name=""
            id=""
            onChange={(e) =>
              setFormFilter((prev) => ({
                ...prev,
                fecha_periodo: e.target.value,
              }))
            }
            value={formFilter.fecha_periodo}
          />
          <select
            id="default"
            className="bg-gray-50 w-[20%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6 "
            value={formFilter.centro_costos}
            onChange={(e) =>
              setFormFilter((prev) => ({
                ...prev,
                centro_costos: e.target.value,
              }))
            }
          >
            <option value="Todos">Todos los centros de costos</option>
            {[...centroCostos]
              .sort((a, b) => a.id_centro_costos - b.id_centro_costos)
              .map((_valor) => (
                <option
                  key={_valor.id_centro_costos}
                  value={_valor.id_centro_costos}
                >
                  {_valor.id_centro_costos} - {_valor.nombre_centro_costos}
                </option>
              ))}
          </select> */}
          <button
            className="flex items-center justify-center bg-[#82385D] text-[1rem] font-medium text-[#E8B7BA] h-auto cursor-pointer py-2 px-8 rounded-xl"
            onClick={resetFilters}
          >
            <FiRefreshCcw />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center min-h-[65%] max-h-[65%] min-w-full bg-white p-5 rounded-[0.7rem]">
        <div className="min-w-full max-w-full overflow-y-auto">
          <table className="table-fixed min-w-full max-w-full border border-gray-200 rounded-lg shadow-sm text-sm text-left">
            <thead className="bg-[#E8B7BA] text-white sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-[#82385D]">Tipo Tarifa</th>
                <th className="px-4 py-3 text-[#82385D]">Fecha/Periodo</th>
                <th className="px-4 py-3 text-[#82385D]">
                  Valor Total Factura
                </th>
                <th className="px-4 py-3 text-[#82385D]">Valor u/m</th>
                <th className="px-4 py-3 text-[#82385D]">Valor Porcentual</th>
                <th className="px-4 py-3 text-[#82385D]">Centro de Costos</th>
                <th className="px-4 py-3 text-[#82385D]">Creado por</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{item.nombre_tipo_tarifa}</td>
                  <td className="px-4 py-2">
                    {dayjs(item.fecha_periodo).format("YYYY-MM-DD")}
                  </td>
                  <td className="px-4 py-2">
                    {formatCOP(item.valor_total_factura)}
                  </td>
                  <td className="px-4 py-2">
                    {formatCOP(item.valor_unidad_medida)}
                  </td>
                  <td className="px-4 py-2">
                    {item.valor_porcentual ?? (
                      <span className="font-semibold">No aplica</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {item.nombre_centro_costos ?? (
                      <span className="font-semibold">No aplica</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{item.nombre_usuario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
