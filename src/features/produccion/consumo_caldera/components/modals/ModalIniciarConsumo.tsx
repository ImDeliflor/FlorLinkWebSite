import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RiSpeedLine } from "react-icons/ri";
import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";
import { initialValueNewConsumo } from "../../utils/initialValues";
import { useSaveNewConsumo } from "../../hooks/useConsumoCaldera";
import { SendingSpinner } from "@/shared/components/SendingSpinner";
import type { ConsumoCaldera } from "../../types/consumoCaldera";
import { useAuthStore } from "@/shared/store/authStore";

export default function ModalIniciarConsumo() {
  // Configuración de fecha, hora y zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // Contexto global del usuario logeado
  const { user } = useAuthStore();

  // Contexto de las tablas básicas
  const { areaProduccion } = useBasicTablesContext();

  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  // data inicial del consumo nuevo
  const [dataNewConsumo, setDataNewConsumo] = useState(initialValueNewConsumo);

  // función para reiniciar el form
  const resetForm = () => setDataNewConsumo(initialValueNewConsumo);

  // ReactQuery -> Mutate para crear un nuevo consumo
  const { mutate: saveConsumo, isPending } = useSaveNewConsumo(setOpen);

  // función para crear el nuevo consumo
  const handlerSaveNewConsumo = () => {
    const new_consumo: ConsumoCaldera = {
      ...dataNewConsumo,
      fecha_creacion: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      created_by: user?.id_usuario ?? 0,
    };

    // Validar que todos los campos estén llenos
    const isValid = Object.entries(new_consumo).every(([, value]) => {
      if (typeof value === "number") return value !== 0;
      if (typeof value === "string") return value.trim() !== "";
      return value !== null && value !== undefined;
    });

    if (isValid) {
      saveConsumo(new_consumo);
    } else {
      alert("Todos los campos deben estar llenos");
    }
  };

  useEffect(() => {
    resetForm();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          <RiSpeedLine className="mr-2" size={20} color="#E8B7BA" />
          Iniciar un consumo
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[80vw] !h-[60vh] !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848] text-2xl text-center font-bold">
            INICIAR UN NUEVO CONSUMO
          </DialogTitle>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="flex items-center justify-center lg:gap-25 flex-wrap xl:flex-nowrap overflow-y-auto">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <label htmlFor="">Fecha/hora de inicio</label>
            <input
              type="datetime-local"
              value={dataNewConsumo.fecha_hora_inicio}
              onChange={(e) =>
                setDataNewConsumo((prev) => ({
                  ...prev,
                  fecha_hora_inicio: dayjs(e.target.value).format(
                    "YYYY-MM-DD HH:mm:ss",
                  ),
                }))
              }
              className="w-[100%] md:w-auto border p-2 rounded"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <label htmlFor="">Área</label>
            <select
              id="default"
              className="w-[100%] md:w-auto bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataNewConsumo.id_area_produccion}
              onChange={(e) =>
                setDataNewConsumo((prev) => ({
                  ...prev,
                  id_area_produccion: Number(e.target.value),
                }))
              }
            >
              <option value="0">Seleccionar</option>
              {[...areaProduccion]
                .sort((a, b) =>
                  a.nombre_area_produccion.localeCompare(
                    b.nombre_area_produccion,
                  ),
                )
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_area_produccion}>
                    {_valor.nombre_area_produccion}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <label htmlFor="">Reporte inicial medidor</label>
            <input
              type="number"
              value={dataNewConsumo.reporte_inicial_medidor}
              onChange={(e) =>
                setDataNewConsumo((prev) => ({
                  ...prev,
                  reporte_inicial_medidor: Number(e.target.value),
                }))
              }
              className="w-[100%] md:w-auto border p-2 rounded"
              onFocus={(e) => e.target.select()}
            />
          </div>
        </div>

        <DialogFooter>
          {isPending ? (
            <SendingSpinner />
          ) : (
            <Button
              className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
              onClick={handlerSaveNewConsumo}
            >
              Iniciar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
