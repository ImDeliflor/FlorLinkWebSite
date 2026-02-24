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
import { useEmpleadoHijo } from "@/features/human_resources/empleados/hooks/useEmpleadoHijo";
import type { Empleado } from "@/features/human_resources/empleados/types/employee";
import { EmptyData } from "@/shared/components/EmptyData";
import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { useState } from "react";
import { FaChildren } from "react-icons/fa6";
import { TiUserAddOutline } from "react-icons/ti";
import { useProcessHijo } from "../../hooks/useHijo";
import { initialValueHijo } from "../../utils/initialValueHijo";
import { SendingSpinner } from "@/shared/components/SendingSpinner";

interface EmployeeProps {
  employee: Empleado;
}

export default function ModalHijoemployee({ employee }: EmployeeProps) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  // Datos del hijo
  const [dataHijo, setDataHijo] = useState(initialValueHijo);

  // Resetear formulario de datos del hijo
  const resetForm = () => setDataHijo(initialValueHijo);

  // ReactQuery -> traer la data de los hijos del empleado
  const { data, isLoading, error } = useEmpleadoHijo(
    employee.id_empleado ?? 0,
    open,
  );

  // ReactQuery -> función para procesar el hijo del empleado (Crear y asignar)
  const { mutate: processHijo, isPending } = useProcessHijo(resetForm);

  // Función para enviar los datos al END POINT
  const handlerProcess = () => {
    const new_process = {
      ...dataHijo,
      id_empleado: employee.id_empleado ?? 0,
      rol_familiar: employee.id_sexo === 3 ? 1 : 2,
    };

    // Validar que todos los campos estén llenos
    const isValid = Object.entries(new_process).every(([, value]) => {
      if (typeof value === "number") return value !== 0;
      if (typeof value === "string") return value.trim() !== "";
      return value !== null && value !== undefined;
    });

    if (isValid) {
      processHijo(new_process);
    } else {
      alert("Todos los campos deben estar llenos");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          <FaChildren className="mr-2" size={20} color="#E8B7BA" />
          Ver hijos
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[95vw] !h-[95vh] !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848] text-2xl text-center font-bold">
            HIJOS DE {employee.nickname?.toUpperCase()}
          </DialogTitle>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="flex flex-col items-center justify-around flex-nowrap overflow-y-auto">
          {/* loading */}
          {isLoading && <LoadingSpinner />}
          {/* error */}
          {error && (
            <ErrorMessage message="No se pudieron traer los datos de los hijos" />
          )}
          {/* si no hay hijos registrados del empleado */}
          {data?.length === 0 && (
            <EmptyData message="Este empleado no tiene hijos asignados" />
          )}
          {/* render de los hijos */}
          {data?.map((hijo, index) => (
            <div
              className="flex flex-col justify-center items-center bg-[#E8B7BA] px-10 py-3 rounded-xl text-[#82385D]"
              key={index}
            >
              <p>{hijo.nombre_hijo}</p>
              <p>
                {dayjs(hijo.fecha_nacimiento_hijo).format("YYYY-MM-DD")}{" "}
                <span className="font-bold">
                  ({dayjs().diff(dayjs(hijo.fecha_nacimiento_hijo), "years")}{" "}
                  años)
                </span>{" "}
              </p>
            </div>
          ))}
          {isPending ? (
            <SendingSpinner />
          ) : (
            <div className="flex items-center justify-around w-[80%] my-1">
              <input
                className="w-[30%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
                type="text"
                placeholder="Nombre hij@"
                name=""
                id=""
                onChange={(e) =>
                  setDataHijo((prev) => ({
                    ...prev,
                    nombre_hijo: e.target.value,
                  }))
                }
                value={dataHijo.nombre_hijo}
              />
              <label htmlFor="">Fecha nacimiento:</label>
              <input
                className="w-[30%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
                type="date"
                placeholder="Fecha nacimiento"
                name=""
                id=""
                onChange={(e) =>
                  setDataHijo((prev) => ({
                    ...prev,
                    fecha_nacimiento: e.target.value,
                  }))
                }
                value={dataHijo.fecha_nacimiento}
              />
              <button
                className="flex items-center justify-center bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl"
                onClick={handlerProcess}
              >
                <TiUserAddOutline className="mr-2" size={20} color="#E8B7BA" />
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
