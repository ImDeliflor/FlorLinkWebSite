import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { GiCheckMark } from "react-icons/gi";
import type {
  ConsumoCalderaReport,
  UpdateConsumoCaldera,
} from "../types/consumoCaldera";
import { useState } from "react";
import { initialValueFinishConsumo } from "../utils/initialValues";
import { useEditPendingConsumo } from "../hooks/useConsumoCaldera";
import { SendingSpinner } from "@/shared/components/SendingSpinner";

interface ConsumoPendienteCierreProps {
  consumoPend: ConsumoCalderaReport;
}

export const ConsumoPendienteCierre = ({
  consumoPend,
}: ConsumoPendienteCierreProps) => {
  // Configuración de fecha, hora y zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // data inicial del consumo nuevo
  const [dataFinishConsumo, setDataFinishConsumo] = useState(
    initialValueFinishConsumo,
  );

  // resetear el formulario
  const resetForm = () => setDataFinishConsumo(initialValueFinishConsumo);

  // ReactQuery -> Mutate para cerrar un consumo
  const { mutate: finishConsumo, isPending } = useEditPendingConsumo(resetForm);

  // Función para cerrar un consumo de caldera
  const handlerFinishConsumo = () => {
    const new_consumo: UpdateConsumoCaldera = {
      ...dataFinishConsumo,
      fecha_modificacion: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };

    // Validar que todos los campos estén llenos
    const isValid = Object.entries(new_consumo).every(([, value]) => {
      if (typeof value === "number") return value !== 0;
      if (typeof value === "string") return value.trim() !== "";
      return value !== null && value !== undefined;
    });

    if (isValid) {
      finishConsumo({
        id_consumo: consumoPend.id_consumo_caldera,
        data: new_consumo,
      });
    } else {
      alert("Todos los campos deben estar llenos");
    }
  };

  return (
    <div className="flex flex-row justify-around items-center text-center w-[100%] max-h-[80%] lg:border-1 border-[#dbdada] rounded-2xl px-3 hover:bg-gray-50">
      {isPending ? (
        <SendingSpinner />
      ) : (
        <>
          <div className="flex flex-col gap-2 p-3">
            <label className="font-semibold" htmlFor="">
              Fecha/Hora inicio
            </label>
            <label className="text-[#B4B4B4]" htmlFor="">
              {dayjs(consumoPend.fecha_hora_inicio).format(
                "YYYY-MM-DD HH:mm:ss",
              )}
            </label>
          </div>
          {/* DIV PARA INGRESAR LA HORA DE FINALIZACIÓN */}
          <div className="flex flex-col gap-2 p-3">
            <label className="font-semibold" htmlFor="">
              Fecha/Hora fin
            </label>
            <input
              type="datetime-local"
              className="border p-2 rounded"
              value={dataFinishConsumo.fecha_hora_fin}
              onChange={(e) =>
                setDataFinishConsumo((prev) => ({
                  ...prev,
                  fecha_hora_fin: dayjs(e.target.value).format(
                    "YYYY-MM-DD HH:mm:ss",
                  ),
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-2 p-3">
            <label className="font-semibold" htmlFor="">
              Área
            </label>
            <label className="text-[#B4B4B4]" htmlFor="">
              {consumoPend.nombre_area_produccion}
            </label>
          </div>
          <div className="flex flex-col gap-2 p-3">
            <label className="font-semibold" htmlFor="">
              Centro Costos
            </label>
            <label className="text-[#B4B4B4]" htmlFor="">
              {consumoPend.nombre_centro_costos}
            </label>
          </div>
          <div className="flex flex-col gap-2 p-3">
            <label className="font-semibold" htmlFor="">
              Reporte inicial
            </label>
            <label className="text-[#B4B4B4]" htmlFor="">
              {consumoPend.reporte_inicial_medidor}
            </label>
          </div>
          {/* DIV PARA INGRESAR EL REPORTE FINAL */}
          <div className="flex flex-col gap-2 p-3">
            <label className="font-semibold" htmlFor="">
              Reporte final
            </label>
            <input
              className="border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
              type="number"
              placeholder="Reporte final"
              name=""
              id=""
              value={dataFinishConsumo.reporte_final_medidor}
              onChange={(e) =>
                setDataFinishConsumo((prev) => ({
                  ...prev,
                  reporte_final_medidor: Number(e.target.value),
                }))
              }
              onFocus={(e) => e.target.select()}
            />
          </div>
          <button
            className="flex items-center justify-center bg-[#82385D] font-medium text-[#E8B7BA] h-[60%] cursor-pointer p-3 rounded-xl"
            onClick={handlerFinishConsumo}
          >
            <GiCheckMark className="mr-2" size={20} color="#E8B7BA" />
            Cerrar
          </button>
        </>
      )}
    </div>
  );
};
