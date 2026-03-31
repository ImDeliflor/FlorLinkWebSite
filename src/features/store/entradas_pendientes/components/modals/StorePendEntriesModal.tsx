/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useStorePendEntriesContext } from "../../hooks/useStorePendEntriesContext";
import { Button } from "@/components/ui/button";
import { FormCreateLoteProduct } from "@/features/store/lote_productos/components/FormCreateLoteProduct";
import { useLoteProductsContext } from "@/features/store/lote_productos/hooks/useLoteProductsContext";
import { CiTrash } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useStoreInventoryContext } from "@/features/store/inventario/hooks/useStoreInventoryContext";
import Swal from "sweetalert2";

export default function StorePendEntriesModal() {
  // Configuración de la zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  /*********************************  CONTEXTOS *************************************/
  // Contexto de entradas pendientes
  const { pendEntries, getPendingEntries, handlerProcessPendingEntry } =
    useStorePendEntriesContext();

  // Contexto de los lotes
  const { arrayProducts, addLote, removeLote, resetLotes } =
    useLoteProductsContext();

  // Contexto de inventario
  const { getStoreInventory } = useStoreInventoryContext();

  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  // useState para manejar el producto seleccionado
  const [selectedProduct, setSelectedProduct] = useState({
    id_entrada_pendiente: 0,
    cod_producto: 0,
    descripcion: "Sin seleccionar",
    cantidad_a_registrar: 0,
  });

  // useEffect para resetear los valores seleccionador
  useEffect(() => {
    setSelectedProduct({
      id_entrada_pendiente: 0,
      cod_producto: 0,
      descripcion: "Sin seleccionar",
      cantidad_a_registrar: 0,
    });
    resetLotes();
  }, [open]);

  // Suma total de la cantidad disponible de todos los lotes
  const totalCantidad = arrayProducts.reduce(
    (acc, item) => acc + item.cantidad_disponible_lote,
    0,
  );

  // Función para añadir fecha de registro al array
  const addFechaRegistroArray = (array: any[], fecha: string) => {
    return array.map((item) => ({
      ...item,
      fecha_ingreso: fecha,
    }));
  };

  // useState para habilitar/deshabilitar
  const [disabledButton, setDisabledButton] = useState(false);

  // Función para guardar los lotes y modificar la entrada pendiente
  const handlerSaveLote = async () => {
    setDisabledButton(true);

    try {
      await handlerProcessPendingEntry(selectedProduct.cod_producto, {
        entrada_pendiente: {
          id_entrada_pendiente: selectedProduct.id_entrada_pendiente,
          cantidad_a_registrar: selectedProduct.cantidad_a_registrar,
          fecha_registro: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
        lote_producto: addFechaRegistroArray(
          arrayProducts,
          dayjs().format("YYYY-MM-DD HH:mm:ss"),
        ),
      });

      setOpen(false);
      Swal.fire({
        icon: "success",
        title: "¡Todos los lotes fueron registrados exitosamente!",
        confirmButtonColor: "#82385D",
      });

      // Obtener las entradas
      await getPendingEntries();

      // Obtener el inventario actualizado
      await getStoreInventory();
    } catch (error) {
      throw new Error(`Error al procesar la entrada pendiente: ${error}`);
    } finally {
      setDisabledButton(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 px-6 rounded-xl">
          Pendiente a ingresar
          <span className="ml-5 mr-2 bg-[#E8B7BA] text-[#82385D] py-1 px-3 rounded-4xl">
            {pendEntries.length}
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[95vw] !h-[95vh] !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848] text-2xl text-center">
            Tienes{" "}
            {Number(
              selectedProduct.cantidad_a_registrar - totalCantidad,
            ).toFixed(1)}{" "}
            pendientes por ingresar de {selectedProduct.descripcion}
          </DialogTitle>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="flex justify-evenly max-h-[95%] overflow-y-auto">
          <div className="felx items-center justify-center min-w-[40%] max-w-[40%] overflow-y-auto">
            <table className="table-fixed min-w-full max-w-full border border-gray-200 rounded-lg shadow-sm text-sm text-left">
              <thead className="bg-[#E8B7BA] text-white sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-[#82385D]">Cod</th>
                  <th className="px-4 py-3 text-[#82385D]">Referencia</th>
                  <th className="px-4 py-3 text-[#82385D]">U. Medida</th>
                  <th className="px-4 py-3 text-[#82385D]">
                    Cantidad a registrar
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendEntries.map((entry, index) => (
                  <tr
                    className="cursor-pointer transition hover:bg-gray-100 hover:shadow-sm"
                    key={index}
                    onClick={() => {
                      setSelectedProduct((prev) => ({
                        ...prev,
                        id_entrada_pendiente: entry.id_entrada_pendiente
                          ? entry.id_entrada_pendiente
                          : 0,
                        cod_producto: entry.cod_producto,
                        descripcion: entry.descripcion,
                        cantidad_a_registrar: entry.cantidad_a_registrar,
                      }));
                    }}
                  >
                    <td className="px-4 py-2">{entry.cod_producto}</td>
                    <td className="px-4 py-2">{entry.descripcion}</td>
                    <td className="px-4 py-2">{entry.unidad_medida}</td>
                    <td className="px-4 py-2">{entry.cantidad_a_registrar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col w-[55%] max-h-[95%] overflow-y-auto">
            {arrayProducts.map((_valor, index) => (
              <FormCreateLoteProduct
                _valor={_valor}
                index={index}
                key={index}
              />
            ))}
            <div className="flex items-center justify-center mt-8">
              <CiTrash
                className="cursor-pointer"
                size={40}
                color="#82385D"
                onClick={removeLote}
              />
              <IoIosAddCircleOutline
                className="cursor-pointer"
                size={40}
                color="#82385D"
                onClick={addLote}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          {Number(
            Number(
              selectedProduct.cantidad_a_registrar - totalCantidad,
            ).toFixed(1),
          ) === 0 &&
            selectedProduct.cantidad_a_registrar > 0 && (
              <Button
                className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
                disabled={disabledButton}
                onClick={handlerSaveLote}
              >
                Registrar lotes
              </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
