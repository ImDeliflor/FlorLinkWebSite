import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Empleado } from "@/features/human_resources/empleados/types/employee";
import { useState } from "react";
import { PiSealPercentLight } from "react-icons/pi";
import {
  useAssignCentroCostos,
  useGetCentroCostos,
} from "../hooks/useEmpleadoCentroCostos";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { EmptyData } from "@/shared/components/EmptyData";
import { SendingSpinner } from "@/shared/components/SendingSpinner";
import { initialValueEmpleadoCentroCostos } from "../utils/initialValueEmpleadoCentroCostos";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";

interface EmployeeProps {
  employee: Empleado;
}

export default function ModalCentroCostos({ employee }: EmployeeProps) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // Contexto de las tablas básicas
  const { centroCostos } = useBasicTablesContext();

  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  // Datos del hijo
  const [dataCentroCostos, setDataCentroCostos] = useState(
    initialValueEmpleadoCentroCostos,
  );

  // Resetear formulario de datos del centro de costos
  const resetForm = () => setDataCentroCostos(initialValueEmpleadoCentroCostos);

  // ReactQuery -> traer la data de los centros de costos del empleado
  const { data, isLoading, error } = useGetCentroCostos(
    employee.id_empleado ?? 0,
    open,
  );

  // ReactQuery -> función para asignar el centro de costos al empleado
  const { mutate: assignCentroCostos, isPending } =
    useAssignCentroCostos(resetForm);

  // Función para enviar los datos al END POINT
  const handlerAssign = () => {
    const new_cc = {
      ...dataCentroCostos,
      id_empleado: employee.id_empleado ?? 0,
    };

    // Validar que todos los campos estén llenos
    const isValid = Object.entries(new_cc).every(([, value]) => {
      if (typeof value === "number") return value !== 0;
      return value !== null && value !== undefined;
    });

    if (isValid) {
      assignCentroCostos(new_cc);
    } else {
      alert("Todos los campos deben estar llenos");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          <PiSealPercentLight className="mr-2" size={20} color="#E8B7BA" />
          Centros Costos
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[95vw] !h-[95vh] !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848] text-2xl text-center font-bold">
            CENTROS DE COSTOS A LOS QUE PERTENECE{" "}
            {employee.nickname?.toUpperCase()}
          </DialogTitle>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="flex flex-col items-center justify-around flex-nowrap overflow-y-auto">
          {/* loading */}
          {isLoading && <LoadingSpinner />}
          {/* Error */}
          {error && (
            <ErrorMessage message="No se pudieron traer los centros de costos del empleado" />
          )}
          {/* si no hay hijos registrados del empleado */}
          {data?.length === 0 && (
            <EmptyData message="Este empleado no tiene ningún centro de costos asignado" />
          )}
          {/* Render de los centros de costos */}
          {data?.map((cc, index) => (
            <div
              className="flex flex-col justify-center items-center bg-[#E8B7BA] px-10 py-3 rounded-xl text-[#82385D]"
              key={index}
            >
              <p>
                {cc.id_centro_costos} - {cc.nombre_centro_costos}
              </p>
              <p>{cc.porc_impacto}%</p>
            </div>
          ))}
          {/* En caso de que se esté enviando algún dato */}
          {isPending ? (
            <SendingSpinner />
          ) : (
            <div className="flex items-center justify-around w-[80%] my-1">
              <label htmlFor="">Centro de costos:</label>
              <select
                id="default"
                className="bg-gray-50 w-[30%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6"
                value={dataCentroCostos.id_centro_costos ?? ""}
                onChange={(e) =>
                  setDataCentroCostos((prev) => ({
                    ...prev,
                    id_centro_costos: Number(e.target.value),
                  }))
                }
              >
                <option value="">Seleccione centro de costos</option>

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
              </select>
              <label htmlFor="">% impacto:</label>
              <input
                className="w-[30%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
                type="text"
                placeholder="% impacto"
                name=""
                id=""
                onChange={(e) =>
                  setDataCentroCostos((prev) => ({
                    ...prev,
                    porc_impacto: Number(e.target.value),
                  }))
                }
                value={dataCentroCostos.porc_impacto}
                onFocus={(e) => e.target.select()}
              />
              <button
                className="flex items-center justify-center bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl"
                onClick={handlerAssign}
              >
                <MdOutlineAssignmentTurnedIn
                  className="mr-2"
                  size={20}
                  color="#E8B7BA"
                />
                Añadir hij@
              </button>
            </div>
          )}
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
