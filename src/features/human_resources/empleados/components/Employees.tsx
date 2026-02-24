/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es"; // importar el idioma
import { FiRefreshCcw } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";
import { SlPeople } from "react-icons/sl";
import { initialFilteredFormEmployee } from "../utils/initialValues";
import type { FormFilterEmployees } from "../types/employee";
import { filterEmployees } from "../utils/employeesFilters";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import ModalDetailEmployee from "./modals/ModalDetailEmployee";
import ModalCreateEmployee from "./modals/ModalCreateEmployee";
import { IoManOutline, IoWomanOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { GrSend } from "react-icons/gr";
import ModalHijoemployee from "../../hijo/components/modals/ModalHijoEmployee";
import ModalCentroCostos from "@/features/human_resources/empleado_centro_costos/components/ModalCentroCostos";

export const Employees = () => {
  // Configuración de fecha, hora y zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  /*********************************  CONTEXTOS *************************************/
  // Contexto de las tablas básicas - categorías
  const {
    getTiposDocumento,
    getCiudades,
    getCargos,
    getAreas,
    getSexos,
    getEstadosCiviles,
    getEps,
    getFondosPensiones,
    getFondosCesantias,
    getMediosTransporte,
    getTiposContrato,
    getCentroCostos,
  } = useBasicTablesContext();

  // Contexto de las tablas básicas - categorías
  const { employees, getEmployees, takeOutEmployee } = useEmployeeContext();

  // Estado de uso para el filtro de entradas
  const [formFilter, setFormFilter] = useState<FormFilterEmployees>(
    initialFilteredFormEmployee,
  );

  // Función para filtrar los empleados
  const filteredEmployees = filterEmployees(employees, formFilter);

  // Función para borrar filtros
  const resetFilters = () => {
    setFormFilter(initialFilteredFormEmployee);
  };

  // Función para retirar un empleado
  const hanlderTakeOutEmployee = async (id = 0) => {
    await takeOutEmployee(id);
  };

  // useEffect para traer las tablas básicas
  useEffect(() => {
    getEmployees();
    getTiposDocumento();
    getCiudades();
    getCargos();
    getAreas();
    getSexos();
    getEstadosCiviles();
    getEps();
    getFondosPensiones();
    getFondosCesantias();
    getMediosTransporte();
    getTiposContrato();
    getCentroCostos();
  }, []);

  return (
    <div className="flex flex-col justify-between bg-[rgb(249,241,245)] h-screen p-2">
      <div className="flex items-center justify-between min-h-[10%] min-w-full bg-white px-5 rounded-[0.7rem]">
        <div className="flex items-center justify-center">
          <SlPeople size={35} color="#484848" />
          <span className="ml-4 text-3xl text-[#484848] font-bold">
            Empleados
          </span>
        </div>
        <ModalCreateEmployee />
      </div>

      <div className="flex flex-col items-center justify-around min-h-[20%] max-h-[30%] min-w-full bg-white p-5 rounded-[0.7rem]">
        <span className="text-xl text-[#484848] font-bold">Filtrar por</span>
        <div className="flex justify-evenly w-[100%]">
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
          <input
            className="w-[50%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
            type="text"
            placeholder="Nombre del empleado"
            name=""
            id=""
            onChange={(e) =>
              setFormFilter((prev) => ({
                ...prev,
                nombre: e.target.value,
              }))
            }
            value={formFilter.nombre}
          />
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
                <th className="px-4 py-3 text-[#82385D]"></th>
                <th className="px-4 py-3 text-[#82385D]">Cédula</th>
                <th className="px-4 py-3 text-[#82385D]">Nombre</th>
                <th className="px-4 py-3 text-[#82385D]">Celular</th>
                <th className="px-4 py-3"></th>
                <th className="px-4 py-3"></th>
                <th className="px-4 py-3"></th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    {item.id_sexo === 3 ? (
                      <IoManOutline size={20} color="#6B8FA3" />
                    ) : (
                      <IoWomanOutline size={20} color="#E8B7BA" />
                    )}
                  </td>
                  <td className="px-4 py-2">{item.nro_documento}</td>
                  <td className="px-4 py-2">{`${item.nombre} ${item.apellidos}`}</td>
                  <td className="px-4 py-2">{item.celular}</td>
                  <td className="px-2 py-2">
                    <ModalDetailEmployee employee={item} />
                  </td>
                  <td className="px-2 py-2">
                    <ModalHijoemployee employee={item} />
                  </td>
                  <td className="px-2 py-2">
                    <ModalCentroCostos employee={item} />
                  </td>
                  {item.estado_empleado !== "Retirado" && (
                    <td className="px-2 py-2">
                      <Button
                        onClick={() => hanlderTakeOutEmployee(item.id_empleado)}
                        className="bg-[#D64550] text-[#ffff] hover:text-[#ffff] hover:bg-[#ab2d37] cursor-pointer px-10"
                      >
                        <GrSend />
                        Retirar
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
