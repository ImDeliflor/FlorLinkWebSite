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
import { Button } from "@/components/ui/button";
import { CgExtensionRemove } from "react-icons/cg";
import { useStoreIssuesContext } from "../../hooks/useStoreIssuesContext";
import { useLoteProductsContext } from "@/features/store/lote_productos/hooks/useLoteProductsContext";
import type { StoreIssue } from "../../types/issue";
import { initialValueIssue } from "../../utils/initialValues";
import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";
import type { StoreInventoryReport } from "@/features/store/inventario/types/storeInventory";
import { useAuthStore } from "@/shared/store/authStore";
import Swal from "sweetalert2";
import { useStoreInventoryContext } from "@/features/store/inventario/hooks/useStoreInventoryContext";
import { useProtectedElement } from "@/shared/hooks/useProtectedElement";
import { IndividualPrivileges } from "@/shared/config/permissions";

interface IssueProps {
  inventory: StoreInventoryReport;
  tiene_lote?: boolean;
}

export default function StoreIssueModal({
  inventory,
  tiene_lote = false,
}: IssueProps) {
  // Configuración de la zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  /*********************************  CONTEXTOS *************************************/
  // Contexto global del usuario logeado
  const { user } = useAuthStore();

  // Contexto de las tablas básicas
  const { centroCostos, getCentroCostos } = useBasicTablesContext();

  // Contexto de las salidas
  const { saveStoreIssueLote, saveStoreIssueWithoutLote } =
    useStoreIssuesContext();

  // Contexto de los productos
  const { loteProductos, getLoteProducts } = useLoteProductsContext();

  // Contexto del inventario de almacén
  const { getStoreInventory } = useStoreInventoryContext();

  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  // Función para dar acceso a un elemento
  const { canAccess } = useProtectedElement();

  // useState para manejar el lote seleccionado
  const [selectedLote, setSelectedLote] = useState({
    id_lote_producto: 0,
    nro_lote: "",
    cantidad_disponible_lote: 0,
  });

  // Filtrar los lotes por código de producto y cantidad (mayor a 0)
  const dataFiltered = loteProductos?.filter(
    (l) =>
      l.cod_producto === inventory?.cod_producto &&
      l.cantidad_disponible_lote > 0
  );

  // useState para cargar el motivo del ajuste o ND
  const [motivoAjusteNC, setMotivoAjusteNC] = useState("");

  // data para el formulario de las entradas
  const [dataIssue, setDataIssue] = useState<StoreIssue>(initialValueIssue);

  // Función para registrar la salida del lote
  const handlerSaveIssue = async () => {
    try {
      // Construir el array que se va enviar al post
      const array_salida = {
        ...dataIssue,
        fecha_salida: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        cod_producto: inventory.cod_producto,
        created_by: user?.id_usuario,
        id_lote_producto: tiene_lote ? selectedLote.id_lote_producto : null,
        motivo_ajuste_nd: motivoAjusteNC,
      };

      // Validar que los campos estén diligenciados
      if (
        array_salida.cantidad === 0 ||
        array_salida.id_centro_costos === 0 ||
        array_salida.observacion.length === 0
      ) {
        alert("¡Todos los campos deben estar llenos!");
        return;
      }

      // Concatenar el motivo del ajuste o NC en caso de haberlo
      array_salida.observacion =
        array_salida.motivo_ajuste_nd !== ""
          ? `${array_salida.motivo_ajuste_nd}. ${array_salida.observacion}`
          : array_salida.observacion;

      if (tiene_lote) {
        // Enviar datos para el proceso transaccional en caso de SÍ tener lote
        await saveStoreIssueLote(array_salida);
      } else {
        // Enviar datos para el proceso transaccional en caso de NO tener lote
        await saveStoreIssueWithoutLote(array_salida);
      }

      await getLoteProducts();

      setOpen(false);

      Swal.fire({
        icon: "success",
        title: "Proceso realizado correctamente",
        confirmButtonColor: "#82385D",
      });
    } catch (error) {
      console.error("Error al registrar la salida", error);
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: "Error al registrar la salida",
        text: "No se pudo completar la operación",
        confirmButtonColor: "#82385D",
      });
    } finally {
      // Obtener el inventario actualizado
      await getStoreInventory();
    }
  };

  useEffect(() => {
    setDataIssue(initialValueIssue);
    setMotivoAjusteNC("");
  }, [open]);

  useEffect(() => {
    getLoteProducts();
    getCentroCostos();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          <CgExtensionRemove className="" size={20} color="#E8B7BA" />
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[95vw] !h-[95vh] !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848] text-xl text-center">
            SALIDAS {tiene_lote && "POR LOTES"} DEL PRODUCTO{" "}
            {inventory.descripcion} ({inventory.unidad_medida})
          </DialogTitle>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="flex justify-evenly">
          {tiene_lote && (
            <div className="min-w-[40%] max-w-[40%] overflow-y-auto">
              <table className="table-fixed min-w-full max-w-full border border-gray-200 rounded-lg shadow-sm text-sm text-left">
                <thead className="bg-[#E8B7BA] text-white sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-[#82385D]">Lote</th>
                    <th className="px-4 py-3 text-[#82385D]">Vencimiento</th>
                    <th className="px-4 py-3 text-[#82385D]">
                      C. Toxicológica
                    </th>
                    <th className="px-4 py-3 text-[#82385D]">Disponible</th>
                  </tr>
                </thead>
                <tbody>
                  {[...dataFiltered]
                    .sort(
                      (a, b) =>
                        dayjs(a.fecha_vencimiento).diff(
                          dayjs(b.fecha_vencimiento)
                        ) ||
                        (a.id_lote_producto ?? 0) - (b.id_lote_producto ?? 0)
                    )
                    .map((lote, index) => (
                      <tr
                        key={index}
                        className={` ${
                          index === 0
                            ? "cursor-pointer transition hover:bg-gray-100 hover:shadow-sm"
                            : ""
                        }  `}
                        onClick={() => {
                          if (index === 0) {
                            setSelectedLote((prev) => ({
                              ...prev,
                              id_lote_producto: lote.id_lote_producto ?? 0,
                              nro_lote: lote.nro_lote,
                              cantidad_disponible_lote:
                                lote.cantidad_disponible_lote,
                            }));
                          }
                        }}
                      >
                        <td
                          className={`px-4 py-2 ${
                            index !== 0 && "text-gray-400"
                          }`}
                        >
                          {lote.nro_lote}
                        </td>
                        <td
                          className={`px-4 py-2 ${
                            index !== 0 && "text-gray-400"
                          }`}
                        >
                          {dayjs(lote.fecha_vencimiento).format("DD/MM/YYYY")}
                        </td>
                        <td
                          className={`px-4 py-2 ${
                            index !== 0 && "text-gray-400"
                          }`}
                        >
                          {lote.categoria_toxicologica}
                        </td>
                        <td
                          className={`px-4 py-2 ${
                            index !== 0 && "text-gray-400"
                          }`}
                        >
                          {lote.cantidad_disponible_lote}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex flex-col gap-3 justify-center items-center w-[55%]">
            {tiene_lote ? (
              <span className="text-[#484848] text-xl font-semibold mb-5">
                Lote #{selectedLote.nro_lote}
              </span>
            ) : (
              <span className="text-[#484848] text-xl font-semibold mb-5">
                Cantidad disponible de {inventory.inventario_actual}{" "}
                {inventory.unidad_medida}
              </span>
            )}
            {canAccess(IndividualPrivileges.almacen.accesoAINCND) && (
              <>
                <label htmlFor="" className="text-[#909090]">
                  Tipo de documento
                </label>
                <select
                  id="default"
                  className="bg-gray-50 w-[45%] border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
                  value={dataIssue.tipo_documento}
                  onChange={(e) =>
                    setDataIssue((prev) => ({
                      ...prev,
                      tipo_documento: e.target
                        .value as StoreIssue["tipo_documento"],
                    }))
                  }
                >
                  <option value="AJUSTE INVENTARIO">Ajuste Inventario</option>
                  <option value="NC">NC</option>
                  <option value="SALIDA">Salida</option>
                </select>
              </>
            )}

            <label htmlFor="" className="text-[#909090]">
              Fecha aplicación
            </label>
            <input
              className="w-[45%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
              type="date"
              onChange={(e) =>
                setDataIssue((prev) => ({
                  ...prev,
                  fecha_aplicacion: e.target.value,
                }))
              }
              defaultValue={dataIssue.fecha_aplicacion}
            />
            <label htmlFor="">Cantidad (número en positivo)</label>
            <input
              className="w-[45%] border-1 p-2 px-4 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
              type="number"
              placeholder="Cantidad a retirar"
              name=""
              id=""
              onChange={(e) =>
                setDataIssue((prev) => ({
                  ...prev,
                  cantidad: Number(e.target.value),
                }))
              }
              value={dataIssue.cantidad}
              onFocus={(e) => e.target.select()}
            />
            <label htmlFor="">Centro de costos</label>
            <select
              id="default"
              className="bg-gray-50 w-[45%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6"
              value={dataIssue.id_centro_costos ?? ""}
              onChange={(e) =>
                setDataIssue((prev) => ({
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
            {dataIssue.tipo_documento !== "SALIDA" && (
              <select
                id="default"
                className="bg-gray-50 w-[45%] border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
                value={motivoAjusteNC}
                onChange={(e) => setMotivoAjusteNC(e.target.value)}
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
              value={dataIssue.observacion}
              onChange={(e) =>
                setDataIssue((prev) => ({
                  ...prev,
                  observacion: e.target.value,
                }))
              }
              onFocus={(e) => e.target.select()}
            />
            {tiene_lote
              ? selectedLote.id_lote_producto !== 0 &&
                selectedLote.cantidad_disponible_lote - dataIssue.cantidad <
                  0 && (
                  <span className="bg-[#c2361b] text-white font-semibold w-[45%] p-2 px-4 text-center rounded-xl">
                    La cantidad a salir no está disponible para el lote #
                    {selectedLote.nro_lote}
                  </span>
                )
              : inventory.inventario_actual - dataIssue.cantidad < 0 && (
                  <span className="bg-[#c2361b] text-white font-semibold w-[45%] p-2 px-4 text-center rounded-xl">
                    La cantidad a salir no está disponible para el producto{" "}
                    {inventory.descripcion}
                    {selectedLote.nro_lote}
                  </span>
                )}
          </div>
        </div>

        <DialogFooter>
          {tiene_lote
            ? selectedLote.id_lote_producto !== 0 &&
              selectedLote.cantidad_disponible_lote - dataIssue.cantidad >=
                0 && (
                <Button
                  className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
                  onClick={handlerSaveIssue}
                >
                  Registrar salida
                </Button>
              )
            : inventory.inventario_actual - dataIssue.cantidad >= 0 && (
                <Button
                  className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
                  onClick={handlerSaveIssue}
                >
                  Registrar salida
                </Button>
              )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
