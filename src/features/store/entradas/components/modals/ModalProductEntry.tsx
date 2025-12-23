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
import { useState } from "react";
import { MdOutlineAddBusiness } from "react-icons/md";
import type { StoreProductReport } from "@/features/store/productos/types/storeProduct";
import type { StoreEntry } from "../../types/entry";
import { useStoreEntriesContext } from "../../hooks/useStoreEntriesContext";
import { useAuthStore } from "@/shared/store/authStore";
import { useStoreInventoryContext } from "@/features/store/inventario/hooks/useStoreInventoryContext";
import { initialValueEntry } from "../../utils/initialValues";
import { useStorePendEntriesContext } from "@/features/store/entradas_pendientes/hooks/useStorePendEntriesContext";
import Swal from "sweetalert2";

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
  const { saveStoreEntry } = useStoreEntriesContext();

  // Contexto de inventario
  const { findOneItemInventory, handlerSaveInventory, handlerUpdateInventory } =
    useStoreInventoryContext();

  // Contexto de entradas pendientes
  const { handlerSavePendingEntry } = useStorePendEntriesContext();

  /*********************************  ESTADOS DE USO *************************************/
  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  // useState para habilitar/deshabilitar
  const [disabledButton, setDisabledButton] = useState(false);

  // useState para el estado del mensaje de error
  const [errorMessage, setErrorMessage] = useState(false);

  // useState para saber si el registro tiene lotes o no
  const [hasLote, setHasLote] = useState("no");

  // data para el formulario de las entradas
  const [dataEntry, setDataEntry] = useState<StoreEntry>(initialValueEntry);

  // Función para guardar la entrada
  const handlerSaveEntry = async () => {
    try {
      setDisabledButton(true);
      // Almacenar la data de la entrada en una constante
      const newEntry = {
        ...dataEntry,
        fecha_entrada: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        cod_producto: product.cod_producto ? product.cod_producto : 0,
        created_by: user?.id_usuario ? user?.id_usuario : 0,
      };

      // Validar que todos los campos estén llenos exceptuando "observacion"
      const isValid = Object.entries(dataEntry)
        .filter(([key]) => key !== "observacion")
        .every(
          ([, value]) =>
            value !== "" && value !== null && value !== undefined && value !== 0
        );

      // En caso de ser válido
      if (isValid) {
        // Buscar el código del producto en el inventario
        const dataInventory = await findOneItemInventory(product.cod_producto);

        console.log("Existe?: ", dataInventory.exists);

        /********************************CUANDO NO EXISTE EL LOTE******************************/
        // En caso de que el código todavía no esté en el inventario y NO contiene lotes
        if (!dataInventory.exists && hasLote === "no") {
          // Crear un nuevo registro en el inventario
          await handlerSaveInventory({
            cod_producto: newEntry.cod_producto,
            inventario_actual: newEntry.cantidad,
          });
        }

        // En caso de que el código esté o no en el inventario, y SÍ contiene lotes
        if (
          (!dataInventory.exists || dataInventory.exists) &&
          hasLote === "si"
        ) {
          // Guardar la entrada como pendiente sin ingresarlo al inventario
          await handlerSavePendingEntry({
            cod_producto: newEntry.cod_producto,
            cantidad_a_registrar: newEntry.cantidad,
            fecha_registro: null,
            estado_entrada: "Pendiente",
          });
        }

        /********************************CUANDO SÍ EXISTE EL LOTE******************************/
        // En caso de que el código esté en el inventario y NO contiene lotes
        if (dataInventory.exists && hasLote === "no") {
          // Actualizar el inventario sumando el valor actual con el nuevo
          await handlerUpdateInventory(dataInventory.data.id_inventario, {
            inventario_actual:
              dataInventory.data.inventario_actual + newEntry.cantidad,
          });
        }

        //console.log(dataInventory);
        await saveStoreEntry(newEntry);
        setOpen(false);
      } else {
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error al registrar la entrada", error);
      Swal.fire({
        icon: "error",
        title: "Error al registrar la entrada",
        text: "No se pudo completar la operación",
      });
    } finally {
      setDisabledButton(false);
    }
  };

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
          />
          {errorMessage && (
            <span className="bg-[#c2361b] text-white font-semibold w-[45%] p-2 px-4 text-center rounded-xl">
              Solo las observaciones pueden estar vacías
            </span>
          )}
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
