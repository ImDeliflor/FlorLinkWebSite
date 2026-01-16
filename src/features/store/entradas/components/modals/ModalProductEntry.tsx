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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { MdOutlineAddBusiness } from "react-icons/md";
import type { StoreProductReport } from "@/features/store/productos/types/storeProduct";
import type { ProcessStoreEntry, StoreEntry } from "../../types/entry";
import { useStoreEntriesContext } from "../../hooks/useStoreEntriesContext";
import { useAuthStore } from "@/shared/store/authStore";
import { initialValueEntry } from "../../utils/initialValues";
import Swal from "sweetalert2";
import type { HasLoteEnum } from "../../types/enums";
import { useProtectedElement } from "@/shared/hooks/useProtectedElement";
import { IndividualPrivileges } from "@/shared/config/permissions";

interface ProductEntryProps {
  product: StoreProductReport;
}

export default function ModalProductEntry({ product }: ProductEntryProps) {
  // Configuración de fecha, hora y zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  /*********************************  CONTEXTOS *************************************/
  // Contexto global del usuario logeado
  const { user } = useAuthStore();

  // Contexto de almacén-entradas
  const { processStoreEntry } = useStoreEntriesContext();

  /*********************************  ESTADOS DE USO *************************************/
  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  // useState para habilitar/deshabilitar
  const [disabledButton, setDisabledButton] = useState(false);

  // useState para el estado del mensaje de error
  const [errorMessage, setErrorMessage] = useState(false);

  // useState para saber si el registro tiene lotes o no
  const [hasLote, setHasLote] = useState("no");

  // useState para cargar el motivo del ajuste o ND
  const [motivoAjusteND, setMotivoAjusteND] = useState("");

  // useState para almacenar el ID del lote en caso de haberlo
  const [idLote, setIdLote] = useState(0);

  // data para el formulario de las entradas
  const [dataEntry, setDataEntry] = useState<StoreEntry>(initialValueEntry);

  // Función para dar acceso a un elemento
  const { canAccess } = useProtectedElement();

  // Función para guardar la entrada
  const handlerSaveEntry = async () => {
    try {
      setDisabledButton(true);
      // Almacenar la data de la entrada en una constante
      const newEntry: ProcessStoreEntry = {
        ...dataEntry,
        fecha_entrada: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        cod_producto: product.cod_producto ? product.cod_producto : 0,
        created_by: user?.id_usuario ? user?.id_usuario : 0,
        has_lote: hasLote as HasLoteEnum,
        motivo_ajuste_nd: motivoAjusteND,
        id_lote: idLote,
      };

      if (
        newEntry.tipo_documento !== "FACTURA" &&
        newEntry.motivo_ajuste_nd === ""
      ) {
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, 5000);
        return;
      }

      // Validar que todos los campos estén llenos
      const isValid = Object.entries(dataEntry)
        .filter(([key]) => key !== "id_lote")
        .filter(([key]) => key !== "nro_factura")
        .every(
          ([, value]) =>
            value !== "" && value !== null && value !== undefined && value !== 0
        );

      // En caso de ser válido
      if (isValid) {
        // Concatenar el motivo del ajuste o NC en caso de haberlo
        newEntry.observacion =
          newEntry.motivo_ajuste_nd !== ""
            ? `${newEntry.motivo_ajuste_nd}. ${newEntry.observacion}`
            : newEntry.observacion;
        await processStoreEntry(newEntry);
        setOpen(false);
        Swal.fire({
          icon: "success",
          title: "Entrada creada exitosamente",
          text: "Todo el proceso fue ejecutado correctamente",
          confirmButtonColor: "#82385D",
        });
      } else {
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error al registrar la entrada", error);
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: "Error al registrar la entrada",
        text: "No se pudo completar la operación",
        confirmButtonColor: "#82385D",
      });
    } finally {
      setDisabledButton(false);
    }
  };

  useEffect(() => {
    setDataEntry(initialValueEntry);
    setHasLote("no");
    setIdLote(0);
    setMotivoAjusteND("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          <MdOutlineAddBusiness className="" size={20} color="#E8B7BA" />
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[70vw] !h-auto !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848] text-center text-2xl font-bold">
            #{product.cod_producto} - {product.descripcion}
          </DialogTitle>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="flex flex-col gap-4 items-center py-4 overflow-y-auto">
          <label htmlFor="" className="text-[#909090]">
            Fecha factura
          </label>
          <input
            className="w-[45%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
            type="date"
            onChange={(e) =>
              setDataEntry((prev) => ({
                ...prev,
                fecha_factura: e.target.value,
              }))
            }
            defaultValue={dataEntry.fecha_factura}
          />
          {canAccess(IndividualPrivileges.almacen.accesoAINCND) && (
            <>
              <label htmlFor="" className="text-[#909090]">
                Tipo de documento
              </label>
              <select
                id="default"
                className="bg-gray-50 w-[45%] border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
                value={dataEntry.tipo_documento}
                onChange={(e) =>
                  setDataEntry((prev) => ({
                    ...prev,
                    tipo_documento: e.target
                      .value as StoreEntry["tipo_documento"],
                  }))
                }
              >
                <option value="AJUSTE INVENTARIO">Ajuste Inventario</option>
                <option value="FACTURA">Factura</option>
                <option value="ND">ND</option>
              </select>
            </>
          )}

          {dataEntry.tipo_documento === "FACTURA" ? (
            <input
              className="w-[45%] border-1 p-2 px-4 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
              type="text"
              placeholder="N° Factura"
              name=""
              id=""
              onChange={(e) =>
                setDataEntry((prev) => ({
                  ...prev,
                  nro_factura: e.target.value,
                }))
              }
              value={dataEntry.nro_factura}
            />
          ) : (
            <>
              <label htmlFor="" className="text-[#909090]">
                ID lote en caso de haberlo
              </label>
              <input
                className="w-[45%] border-1 p-2 px-4 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
                type="number"
                placeholder="ID lote en caso de haberlo"
                name=""
                id=""
                onChange={(e) => setIdLote(Number(e.target.value))}
                value={idLote}
                onFocus={(e) => e.target.select()}
              />
            </>
          )}

          <label htmlFor="" className="text-[#909090]">
            Cantidad ({product.unidad_medida})
          </label>
          <input
            className="w-[45%] border-1 p-2 px-4 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
            type="number"
            placeholder="Cantidad a ingresar"
            name=""
            id=""
            onChange={(e) =>
              setDataEntry((prev) => ({
                ...prev,
                cantidad: Number(e.target.value),
              }))
            }
            value={dataEntry.cantidad}
            onFocus={(e) => e.target.select()}
          />
          <label htmlFor="" className="text-[#909090]">
            Precio u/m
          </label>
          <input
            className="w-[45%] border-1 p-2 px-4 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
            type="number"
            placeholder="Precio u/m"
            name=""
            id=""
            onChange={(e) =>
              setDataEntry((prev) => ({
                ...prev,
                precio_unidad: Number(e.target.value),
              }))
            }
            value={dataEntry.precio_unidad}
            onFocus={(e) => e.target.select()}
          />
          <span className="text-[#909090]">
            Precio total de la factura:{" "}
            <span className="text-[#3b3b3b] font-bold">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
              }).format(dataEntry.cantidad * dataEntry.precio_unidad)}
            </span>{" "}
          </span>
          {dataEntry.tipo_documento !== "FACTURA" && (
            <select
              id="default"
              className="bg-gray-50 w-[45%] border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={motivoAjusteND}
              onChange={(e) => setMotivoAjusteND(e.target.value)}
            >
              <option value="">Selecciona el motivo</option>
              <option value="Ajuste de inventario por cierre de mes">
                Ajuste de inventario por cierre de mes
              </option>
              <option value="Ajuste de inventario por conteo físico">
                Ajuste de inventario por conteo físico
              </option>
              <option value="Error en entrada">Error en entrada</option>
              <option value="Error en salida">Error en salida</option>
            </select>
          )}
          <textarea
            className="border-1 border-[#9D9D9D] w-[45%] p-2 px-4 resize-none rounded-xl"
            placeholder="Observaciones"
            value={dataEntry.observacion}
            onChange={(e) =>
              setDataEntry((prev) => ({
                ...prev,
                observacion: e.target.value,
              }))
            }
            onFocus={(e) => e.target.select()}
          />
          {errorMessage && (
            <span className="bg-[#c2361b] text-white font-semibold w-[45%] p-2 px-4 text-center rounded-xl">
              Ningún campo debe ir vacío
            </span>
          )}
          {dataEntry.tipo_documento === "FACTURA" && (
            <>
              <span className="text-[#484848] font-bold w-[45%] p-2 px-4 mt-5 text-center">
                ¿La compra contiene lotes con fecha de vencimiento?
              </span>
              <ToggleGroup
                type="single"
                value={hasLote}
                onValueChange={setHasLote}
                className="rounded-xl"
              >
                <ToggleGroupItem
                  value="si"
                  className="px-6 py-2 data-[state=on]:bg-yellow-500 data-[state=on]:text-white"
                >
                  Sí
                </ToggleGroupItem>

                <ToggleGroupItem
                  value="no"
                  className="px-6 py-2 data-[state=on]:bg-yellow-500 data-[state=on]:text-white rounded-xl"
                >
                  No
                </ToggleGroupItem>
              </ToggleGroup>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
            onClick={handlerSaveEntry}
            disabled={disabledButton}
          >
            Registrar entrada
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
