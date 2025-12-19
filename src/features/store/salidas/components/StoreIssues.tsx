/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es"; // importar el idioma
import { medidas } from "@/shared/data/selectOptions";
import { MdOutlineInventory } from "react-icons/md";
import { FiRefreshCcw } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";
import { initialFilteredFormProduct } from "../../utils/initialValues";
import { useStoreIssuesContext } from "../hooks/useStoreIssuesContext";
import type { FormFilterIssues } from "../types/issue";
import { filterSalidas } from "../utils/salidasFilters";

export const StoreIssues = () => {
  // Configuración de fecha, hora y zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  /*********************************  CONTEXTOS *************************************/
  // Contexto de las tablas básicas - categorías
  const { categorias, getCategorias } = useBasicTablesContext();

  // Contexto de las tablas básicas - laboratorios
  const { getLaboratorios } = useBasicTablesContext();

  // Contexto de almacén-entradas
  const { issues, getStoreIssues } = useStoreIssuesContext();

  // Estado de uso para el filtro de entradas
  const [formFilter, setFormFilter] = useState<FormFilterIssues>(
    initialFilteredFormProduct
  );

  // Función para filtrar las entradas
  const filteredEntries = filterSalidas(issues, formFilter);

  // Función para borrar filtros
  const resetFilters = () => {
    setFormFilter(initialFilteredFormProduct);
  };
  // useEffect para traer las categorías
  useEffect(() => {
    getCategorias();
    getLaboratorios();
    getStoreIssues();
  }, []);

  return (
    <div className="flex flex-col justify-between bg-[rgb(249,241,245)] h-screen p-2">
      <div className="flex items-center justify-between min-h-[10%] min-w-full bg-white px-5 rounded-[0.7rem]">
        <div className="flex items-center justify-center">
          <MdOutlineInventory size={35} color="#484848" />
          <span className="ml-4 text-3xl text-[#484848] font-bold">
            Salidas almacén
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-around min-h-[20%] max-h-[30%] min-w-full bg-white p-5 rounded-[0.7rem]">
        <span className="text-xl text-[#484848] font-bold">Filtrar por</span>
        <div className="flex justify-around w-[100%]">
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
            className="bg-gray-50 w-[20%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6"
            value={formFilter.categoria}
            onChange={(e) =>
              setFormFilter((prev) => ({
                ...prev,
                categoria: e.target.value,
              }))
            }
          >
            <option value="Todas">Todas</option>
            {[...categorias]
              .sort((a, b) =>
                a.nombre_categoria_producto.localeCompare(
                  b.nombre_categoria_producto
                )
              )
              .map((_valor, index) => (
                <option key={index} value={_valor.nombre_categoria_producto}>
                  {_valor.nombre_categoria_producto}
                </option>
              ))}
          </select>
          <input
            className="w-[45%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
            type="text"
            placeholder="Descripción (nombre, referencia, marca, etc)"
            name=""
            id=""
            onChange={(e) =>
              setFormFilter((prev) => ({
                ...prev,
                descripcion: e.target.value,
              }))
            }
            value={formFilter.descripcion}
          />
          <select
            id="default"
            className="bg-gray-50 w-[20%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6 "
            value={formFilter.unidad_medida}
            onChange={(e) =>
              setFormFilter((prev) => ({
                ...prev,
                unidad_medida: e.target.value,
              }))
            }
          >
            <option value="Todas">Todas</option>
            {[...medidas]
              .sort((a, b) => a.localeCompare(b))
              .map((_valor) => (
                <option key={_valor} value={_valor}>
                  {_valor}
                </option>
              ))}
          </select>
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
                <th className="px-4 py-3 text-[#82385D]">Fecha</th>
                <th className="px-4 py-3 text-[#82385D]">Cod</th>
                <th className="px-4 py-3 text-[#82385D]">N° Lote</th>
                <th className="px-4 py-3 text-[#82385D]">Descripción</th>
                <th className="px-4 py-3 text-[#82385D]">Categoría</th>
                <th className="px-4 py-3 text-[#82385D]">Unidad de medida</th>
                <th className="px-4 py-3 text-[#82385D]">Cantidad</th>
                <th className="px-4 py-3 text-[#82385D]">Precio/u</th>
                <th className="px-4 py-3 text-[#82385D]">Realizada por</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    {dayjs(item.fecha_salida).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                  <td className="px-4 py-2">{item.cod_producto}</td>
                  <td className="px-4 py-2">{item.nro_lote}</td>
                  <td className="px-4 py-2">{item.descripcion}</td>
                  <td className="px-4 py-2">
                    {item.nombre_categoria_producto}
                  </td>
                  <td className="px-4 py-2">{item.unidad_medida}</td>
                  <td className="px-4 py-2">{item.cantidad}</td>
                  <td className="px-4 py-2">{item.nombre_centro_costos}</td>
                  <td className="px-4 py-2">{item.registrado_por}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
