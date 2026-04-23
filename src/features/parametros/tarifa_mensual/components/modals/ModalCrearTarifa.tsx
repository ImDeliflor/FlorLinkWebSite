/* eslint-disable react-hooks/exhaustive-deps */
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
import { initialValueNewTarifa } from "../../utils/initialValues";
import { useCreateNewTarifa } from "../../hooks/useTarifaMensual";
import type { TarifaMensual } from "../../types/tarifaMensual";
import Swal from "sweetalert2";

export default function ModalCrearTarifa() {
  // Configuración de fecha, hora y zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // Contexto global del usuario logeado
  const { user } = useAuthStore();

  // Contexto de las tablas básicas
  const { tipoTarifa, centroCostos } = useBasicTablesContext();

  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  // data inicial de la nueva tarifa
  const [dataNewTarifa, setDataNewTarifa] = useState(initialValueNewTarifa);

  // función para reiniciar el form
  const resetForm = () => setDataNewTarifa(initialValueNewTarifa);

  // ReactQuery -> Mutate para crear un nuevo tarifa
  const { mutate: saveTarifa, isPending } = useCreateNewTarifa();

  // función para crear el nuevo tarifa
  const handlerSaveNewTarifa = () => {
    const new_tarifa: TarifaMensual = {
      ...dataNewTarifa,
      fecha_registro: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      created_by: user?.id_usuario ?? 0,
    };

    // Validar que todos los campos estén llenos
    const isValid = Object.entries(new_tarifa)
      .filter(([key]) => key !== "valor_porcentual")
      .filter(([key]) => key !== "id_centro_costos")
      .every(([, value]) => {
        if (typeof value === "number") return value !== 0;
        if (typeof value === "string") return value.trim() !== "";
        return value !== null && value !== undefined;
      });

    if (isValid) {
      saveTarifa(new_tarifa, {
        onSuccess: () => {
          resetForm();
          setOpen(false);
          Swal.fire({
            icon: "success",
            title: `¡Tarifa creada exitosamente!`,
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
    setDataNewTarifa({
      ...dataNewTarifa,
      id_centro_costos: null,
      valor_porcentual: null,
    });
  }, [dataNewTarifa.id_tipo_tarifa]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          <RiFileAddLine className="mr-2" size={20} color="#E8B7BA" />
          Registrar una tarifa
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[60vw] !h-[60vh] !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848] text-2xl text-center font-bold">
            REGISTRAR FACTURA DE SERVICIO
          </DialogTitle>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="flex flex-col items-center justify-center gap-5 overflow-y-auto">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <label htmlFor="">Tipo de Tarifa</label>
            <select
              id="default"
              className="w-[100%] md:w-auto bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataNewTarifa.id_tipo_tarifa}
              onChange={(e) =>
                setDataNewTarifa((prev) => ({
                  ...prev,
                  id_tipo_tarifa: Number(e.target.value),
                }))
              }
            >
              <option value="0">Seleccionar</option>
              {[...tipoTarifa]
                .sort((a, b) => a.nombre.localeCompare(b.nombre))
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_tipo_tarifa}>
                    {_valor.nombre}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <label htmlFor="">Fecha/Periodo</label>
            <input
              type="date"
              value={dataNewTarifa.fecha_periodo}
              onChange={(e) =>
                setDataNewTarifa((prev) => ({
                  ...prev,
                  fecha_periodo: dayjs(e.target.value).format("YYYY-MM-DD"),
                }))
              }
              className="w-[100%] md:w-auto border p-2 rounded"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <label htmlFor="">Valor Total Factura</label>
            <input
              type="number"
              value={dataNewTarifa.valor_total_factura}
              onChange={(e) =>
                setDataNewTarifa((prev) => ({
                  ...prev,
                  valor_total_factura: Number(e.target.value),
                }))
              }
              className="w-[100%] md:w-auto border p-2 rounded"
              onFocus={(e) => e.target.select()}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <label htmlFor="">Valor Unidad Medida</label>
            <input
              type="number"
              value={dataNewTarifa.valor_unidad_medida}
              onChange={(e) =>
                setDataNewTarifa((prev) => ({
                  ...prev,
                  valor_unidad_medida: Number(e.target.value),
                }))
              }
              className="w-[100%] md:w-auto border p-2 rounded"
              onFocus={(e) => e.target.select()}
            />
          </div>
          <hr />

          {dataNewTarifa.id_tipo_tarifa != 1 && (
            <>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <label htmlFor="">Centro de Costos</label>
                <select
                  id="default"
                  className="w-[100%] md:w-auto bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
                  value={dataNewTarifa.id_centro_costos ?? ""}
                  onChange={(e) =>
                    setDataNewTarifa((prev) => ({
                      ...prev,
                      id_centro_costos:
                        e.target.value === "" ? null : Number(e.target.value),
                    }))
                  }
                >
                  <option value="0">Seleccionar</option>
                  {[...centroCostos]
                    .sort((a, b) =>
                      a.nombre_centro_costos.localeCompare(
                        b.nombre_centro_costos,
                      ),
                    )
                    .map((_valor, index) => (
                      <option key={index} value={_valor.id_centro_costos}>
                        {_valor.nombre_centro_costos}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-2">
                <label htmlFor="">Valor Porcentual</label>
                <input
                  type="number"
                  value={dataNewTarifa.valor_porcentual ?? ""}
                  className="w-[100%] md:w-auto border p-2 rounded"
                  onChange={(e) =>
                    setDataNewTarifa((prev) => ({
                      ...prev,
                      valor_porcentual:
                        e.target.value === "" ? null : Number(e.target.value),
                    }))
                  }
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          {isPending ? (
            <SendingSpinner />
          ) : (
            <Button
              className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
              onClick={handlerSaveNewTarifa}
            >
              Registrar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
