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
import { RiFileAddLine } from "react-icons/ri";
import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";
import { SendingSpinner } from "@/shared/components/SendingSpinner";
import { useAuthStore } from "@/shared/store/authStore";
import {
  initialValueDepreciacion,
  initialValueMantenimiento,
  initialValueNewCosto,
  initialValueTratamientoAgua,
} from "../../utils/initialValues";
import { useCreateNewCosto } from "../../hooks/useCostoFijo";
import Swal from "sweetalert2";
import type { CostoFijo } from "../../types/costoFijo";

export default function ModalCrearCosto() {
  // Configuración de fecha, hora y zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // Contexto global del usuario logeado
  const { user } = useAuthStore();

  // Contexto de las tablas básicas
  const { conceptoCosto, centroCostos } = useBasicTablesContext();

  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  // data inicial de la nueva tarifa
  const [dataNewCosto, setDataNewCosto] = useState(initialValueNewCosto);

  // función para reiniciar el form
  const resetForm = () => setDataNewCosto(initialValueNewCosto);

  // ReactQuery -> Mutate para crear un nuevo tarifa
  const { mutate: saveCosto, isPending } = useCreateNewCosto();

  // función para crear el nuevo tarifa
  const handlerSaveNewCosto = () => {
    const new_costo: CostoFijo = {
      ...dataNewCosto,
      fecha_registro: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      created_by: user?.id_usuario ?? 0,
    };

    // Validar que todos los campos estén llenos
    const isValid = Object.entries(new_costo).every(([, value]) => {
      if (typeof value === "number") return value !== 0;
      if (typeof value === "string") return value.trim() !== "";
      return value !== null && value !== undefined;
    });

    if (isValid) {
      saveCosto(new_costo, {
        onSuccess: () => {
          resetForm();
          setOpen(false);
          Swal.fire({
            icon: "success",
            title: `Concepto creado exitosamente!`,
            confirmButtonColor: "#82385D",
          });
        },
      });
    } else {
      alert("Todos los campos deben estar llenos");
    }
  };

  useEffect(() => {
    resetForm();
  }, [open]);

  useEffect(() => {
    if (dataNewCosto.id_concepto_costo === 1) {
      setDataNewCosto(initialValueTratamientoAgua);
    } else if (dataNewCosto.id_concepto_costo === 2) {
      setDataNewCosto(initialValueDepreciacion);
    } else if (dataNewCosto.id_concepto_costo === 3) {
      setDataNewCosto(initialValueMantenimiento);
    } else {
      setDataNewCosto(initialValueNewCosto);
    }
  }, [dataNewCosto.id_concepto_costo]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          <RiFileAddLine className="mr-2" size={20} color="#E8B7BA" />
          Registrar un costo
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[60vw] !h-[60vh] !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848] text-2xl text-center font-bold">
            REGISTRAR COSTO FIJO
          </DialogTitle>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="flex flex-col items-center justify-center gap-5 overflow-y-auto">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <label htmlFor="">Tipo de Concepto</label>
            <select
              id="default"
              className="w-[100%] md:w-auto bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataNewCosto.id_concepto_costo}
              onChange={(e) =>
                setDataNewCosto((prev) => ({
                  ...prev,
                  id_concepto_costo: Number(e.target.value),
                }))
              }
            >
              <option value="0">Seleccionar</option>
              {[...conceptoCosto]
                .sort((a, b) =>
                  a.nombre_concepto_costo.localeCompare(
                    b.nombre_concepto_costo,
                  ),
                )
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_concepto_costo}>
                    {_valor.nombre_concepto_costo}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <label htmlFor="">Fecha/Periodo</label>
            <input
              type="date"
              value={dataNewCosto.fecha_periodo}
              onChange={(e) =>
                setDataNewCosto((prev) => ({
                  ...prev,
                  fecha_periodo: dayjs(e.target.value).format("YYYY-MM-DD"),
                }))
              }
              className="w-[100%] md:w-auto border p-2 rounded"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <label htmlFor="">Valor Total Costo</label>
            <input
              type="number"
              value={dataNewCosto.valor_total_costo}
              onChange={(e) =>
                setDataNewCosto((prev) => ({
                  ...prev,
                  valor_total_costo: Number(e.target.value),
                }))
              }
              className="w-[100%] md:w-auto border p-2 rounded"
              onFocus={(e) => e.target.select()}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <label htmlFor="">% Impacto</label>
            <input
              type="number"
              value={dataNewCosto.porc_impacto}
              onChange={(e) =>
                setDataNewCosto((prev) => ({
                  ...prev,
                  porc_impacto: Number(e.target.value),
                }))
              }
              className="w-[100%] md:w-auto border p-2 rounded"
              onFocus={(e) => e.target.select()}
            />
          </div>
          <hr />

          <div className="flex flex-col md:flex-row items-center gap-2">
            <label htmlFor="">Centro de Costos</label>
            <select
              id="default"
              className="w-[100%] md:w-auto bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataNewCosto.id_centro_costos ?? ""}
              onChange={(e) =>
                setDataNewCosto((prev) => ({
                  ...prev,
                  id_centro_costos: Number(e.target.value),
                }))
              }
            >
              <option value="0">Seleccionar</option>
              {[...centroCostos]
                .sort((a, b) =>
                  a.nombre_centro_costos.localeCompare(b.nombre_centro_costos),
                )
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_centro_costos}>
                    {_valor.nombre_centro_costos}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <DialogFooter>
          {isPending ? (
            <SendingSpinner />
          ) : (
            <Button
              className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
              onClick={handlerSaveNewCosto}
            >
              Registrar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
