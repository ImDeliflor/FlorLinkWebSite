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

export default function StorePendEntriesModal() {
  // Configuración de la zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  /*********************************  CONTEXTOS *************************************/
  // Contexto de entradas pendientes
  const { pendEntries, getPendingEntries, handlerUpdatePendingEntry } =
    useStorePendEntriesContext();

  // Contexto de los lotes
  const { arrayProducts, addLote, removeLote, saveAllLotes, resetLotes } =
    useLoteProductsContext();

  // Contexto de inventario
  const {
    getStoreInventory,
    findOneItemInventory,
    handlerSaveInventory,
    handlerUpdateInventory,
  } = useStoreInventoryContext();

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

  useEffect(() => {
    console.log(arrayProducts);
  }, [arrayProducts]);

  // Suma total de la cantidad disponible de todos los lotes
  const totalCantidad = arrayProducts.reduce(
    (acc, item) => acc + item.cantidad_disponible_lote,
    0
  );

  // Función para guardar los lotes y modificar la entrada pendiente
  const handlerSaveLote = async () => {
    const lotesSuccess = await saveAllLotes(
      selectedProduct.cod_producto,
      setOpen
    );

    // En caso de que se hayan guardado bien todos los lotes
    if (lotesSuccess) {
      // Buscar el código del producto en el inventario
      const dataInventory = await findOneItemInventory(
        selectedProduct.cod_producto
      );

      // En caso de que el código no esté en el inventario
      if (!dataInventory.exists) {
        // Crear un nuevo registro en el inventario
        await handlerSaveInventory({
          cod_producto: selectedProduct.cod_producto,
          inventario_actual: selectedProduct.cantidad_a_registrar,
        });
      }

      // En caso de que el código esté en el inventario
      if (dataInventory.exists) {
        // Actualizar el inventario sumando el valor actual con el nuevo
        await handlerUpdateInventory(dataInventory.data.id_inventario, {
          inventario_actual:
            dataInventory.data.inventario_actual +
            selectedProduct.cantidad_a_registrar,
        });
      }

      // Modificar el estado de la entrada pendiente y la fecha de registro
      handlerUpdatePendingEntry(selectedProduct.id_entrada_pendiente, {
        estado_entrada: "Ingresado",
        fecha_registro: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      });

      // Obtener las entradas
      getPendingEntries();

      // Obtener el inventario actualizado
      getStoreInventory();
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
              selectedProduct.cantidad_a_registrar - totalCantidad
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
              selectedProduct.cantidad_a_registrar - totalCantidad
            ).toFixed(1)
          ) === 0 &&
            selectedProduct.cantidad_a_registrar > 0 && (
              <Button
                className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
                onClick={handlerSaveLote}
              >
                Registrar entradas
              </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
