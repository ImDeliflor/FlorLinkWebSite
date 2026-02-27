/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es"; // importar el idioma
import { useProtectedElement } from "@/shared/hooks/useProtectedElement";
import { IndividualPrivileges } from "@/shared/config/permissions";
import { IoSpeedometerOutline } from "react-icons/io5";
import ModalIniciarConsumo from "./modals/ModalIniciarConsumo";
import {
  useGetConsumosPendientesByUser,
  useGetReportConsumoCaldera,
} from "../hooks/useConsumoCaldera";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { EmptyData } from "@/shared/components/EmptyData";
import { ConsumoPendienteCierre } from "./ConsumoPendienteCierre";
import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";
import { useEffect } from "react";
import { useAuthStore } from "@/shared/store/authStore";

export const ConsumoCalderaMainScreen = () => {
  // Configuración de fecha, hora y zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // Contexto global del usuario logeado
  const { user } = useAuthStore();

  // Contexto de las tablas básicas - categorías
  const { getAreasProduccion } = useBasicTablesContext();

  // Función para acceder a componentes mediante roles
  const { canAccess } = useProtectedElement();

  // ReactQuery -> traer la data de los consumos de caldera (View)
  const {
    data: dataConsumos,
    isLoading: isLoadingConsumos,
    error: errorConsumos,
  } = useGetReportConsumoCaldera();

  // ReactQuery -> traer la data de los consumos pendientes por cerrar de caldera (View)
  const {
    data: dataPendingConsumos,
    isLoading: isLoadingPendingConsumos,
    error: errorPendingConsumos,
  } = useGetConsumosPendientesByUser(user?.id_usuario ?? 0);

  // useEffect para traer las tablas básicas
  useEffect(() => {
    getAreasProduccion();
  }, []);

  return (
    <div className="flex flex-col gap-4 justify-between bg-[rgb(249,241,245)] h-screen p-2">
      <div className="flex items-center justify-between min-h-[10%] min-w-full bg-white px-5 rounded-[0.7rem]">
        <div className="flex w-[100%] items-center justify-between">
          <div className="flex justify-start w-[40%]">
            <IoSpeedometerOutline size={35} color="#484848" />
            <span className="ml-4 text-3xl text-[#484848] font-bold">
              Consumo Caldera
            </span>
          </div>
          <ModalIniciarConsumo />
        </div>
      </div>

      {canAccess(IndividualPrivileges.produccion.crearConsumo) && (
        <div className="flex flex-col items-center gap-4 justify-around min-h-[30%] max-h-[30%] min-w-full bg-white p-5 rounded-[0.7rem] overflow-y-auto">
          {/* loading */}
          {isLoadingPendingConsumos && <LoadingSpinner />}
          {/* error */}
          {errorPendingConsumos && (
            <ErrorMessage message="No se pudieron traer los datos de los consumos pendientes de caldera" />
          )}
          {/* si no hay hijos registrados del empleado */}
          {dataPendingConsumos?.length === 0 && (
            <EmptyData message="No hay datos de consumos pendientes por cerrar de caldera" />
          )}
          {dataPendingConsumos && dataPendingConsumos?.length > 0 && (
            <>
              <span className="text-center text-xl text-[#484848] font-bold">
                CONSUMOS PENDIENTES POR CERRAR
              </span>
              {dataPendingConsumos.map((pend, index) => (
                <ConsumoPendienteCierre key={index} consumoPend={pend} />
              ))}
            </>
          )}
        </div>
      )}

      <div className="flex flex-col items-center min-h-[55%] max-h-auto min-w-full bg-white p-5 rounded-[0.7rem]">
        {/* loading */}
        {isLoadingConsumos && <LoadingSpinner />}
        {/* error */}
        {errorConsumos && (
          <ErrorMessage message="No se pudieron traer los datos de los consumos de caldera" />
        )}
        {/* si no hay hijos registrados del empleado */}
        {dataConsumos?.length === 0 && (
          <EmptyData message="No hay datos de consumo de caldera" />
        )}

        {dataConsumos && dataConsumos?.length > 0 && (
          <div className="min-w-full max-w-full overflow-y-auto overflow-x-auto">
            <table className="table-fixed min-w-full max-w-full border border-gray-200 rounded-lg shadow-sm text-sm text-left">
              <thead className="bg-[#E8B7BA] text-white sticky top-0 z-10">
                <tr className="text-center">
                  <th className="px-4 py-3 text-[#82385D]">
                    Fecha/hora inicio
                  </th>
                  <th className="px-4 py-3 text-[#82385D]">Fecha/hora fin</th>
                  <th className="px-4 py-3 text-[#82385D]">Horas consumo</th>
                  <th className="px-4 py-3 text-[#82385D]">Área</th>
                  <th className="px-4 py-3 text-[#82385D]">Centro costos</th>
                  <th className="px-4 py-3 text-[#82385D]">Reporte inicial</th>
                  <th className="px-4 py-3 text-[#82385D]">Reporte final</th>
                  <th className="px-4 py-3 text-[#82385D]">Consumo total</th>
                  <th className="px-4 py-3 text-[#82385D]">Consumo de</th>
                </tr>
              </thead>
              <tbody>
                {dataConsumos?.map((consumo, index) => (
                  <tr key={index} className="text-center">
                    <td className="px-4 py-2">
                      {dayjs(consumo.fecha_hora_inicio).format(
                        "YYYY-MM-DD HH:mm",
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {consumo.fecha_hora_fin ? (
                        dayjs(consumo.fecha_hora_fin).format("YYYY-MM-DD HH:mm")
                      ) : (
                        <span className="font-semibold">Pendiente</span>
                      )}
                    </td>
                    <td className="px-4 py-2">{consumo.horas_consumo}</td>
                    <td className="px-4 py-2">
                      {consumo.nombre_area_produccion}
                    </td>
                    <td className="px-4 py-2">
                      {consumo.nombre_centro_costos}
                    </td>
                    <td className="px-4 py-2">
                      {consumo.reporte_inicial_medidor}
                    </td>
                    <td className="px-4 py-2">
                      {consumo.reporte_final_medidor ? (
                        consumo.reporte_final_medidor
                      ) : (
                        <span className="font-semibold">Pendiente</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {consumo.total_consumo_medidor}
                    </td>
                    <td className="px-4 py-2">{consumo.nombre_responsable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
