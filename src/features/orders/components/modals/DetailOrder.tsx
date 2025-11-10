/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { FormEditProduct } from "@/features/products/components/FormEditProduct";
import { useProductContext } from "@/features/products/hooks/useProductContext";
import { useEffect, useState } from "react";
import type { DetalleCompra } from "@/features/products/types/product";
import { BiDetail } from "react-icons/bi";

interface DetailOrderProps {
  nro_orden: number | undefined;
  is_jefe?: boolean;
  is_gerencia?: boolean;
  canEdit?: boolean;
  canChangeState?: boolean;
}

export default function DetailOrder({
  nro_orden,
  is_jefe = false,
  is_gerencia = false,
  canEdit = true,
  canChangeState = true,
}: DetailOrderProps) {
  // Traer los datos detallados de los productos
  const {
    productReport,
    getProductsReport,
    handlerUpdateProduct,
    setAllDetailProductsState,
  } = useProductContext();

  // useState para la data original
  const [initialProductReport, setInitialProductReport] = useState<
    DetalleCompra[]
  >([]);
  // useState para la data modificada
  const [filteredProductReport, setFilteredProductReport] = useState<
    DetalleCompra[]
  >([]);

  const [nombreSolicitante, setNombreSolicitante] = useState("");

  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  const getDataFiltered = (nro_orden: number | undefined) => {
    const dataFiltered = productReport.filter(
      (product) => product.nro_orden_compra == nro_orden
    );
    setInitialProductReport(dataFiltered);
    setFilteredProductReport(dataFiltered);
  };

  useEffect(() => {
    if (open && nro_orden) {
      getDataFiltered(nro_orden);
      setNombreSolicitante(
        initialProductReport[0].solicitado_por
          ? initialProductReport[0].solicitado_por
          : ""
      );
    }
  }, [open]);

  useEffect(() => {
    getDataFiltered(nro_orden);
  }, [productReport]);

  // Función para actualizar el valor de cada producto
  const updateFilteredProduct = (
    index: number,
    key: string,
    value: string | number
  ) => {
    setFilteredProductReport((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  // Función para mandar los datos y actualizarlos
  const handleUpdateProducts = async () => {
    try {
      await handlerUpdateProduct(filteredProductReport, setOpen);
      await getProductsReport();
    } catch (error) {
      console.error("Error al actualizar los datos: ", error);
      throw error;
    }
  };

  // useEffect(() => {
  //   console.log(initialProductReport);
  //   console.log(filteredProductReport);
  // }, [filteredProductReport]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          {is_jefe || is_gerencia ? (
            <BiDetail className="mr-2" size={20} color="#E8B7BA" />
          ) : (
            <CiEdit className="mr-2" size={20} color="#E8B7BA" />
          )}
          {is_jefe || is_gerencia ? "Detalle" : "Ver/Editar"}
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[90vw] !h-[90vh] !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848]">
            Detalle orden #{nro_orden} - {nombreSolicitante}
          </DialogTitle>
          <DialogDescription>
            Edita y visualiza todo el detalle de los productos asociados a la
            orden #{nro_orden}
          </DialogDescription>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="grid gap-4 py-4 overflow-y-auto">
          {filteredProductReport.map((_valor, index) => (
            <FormEditProduct
              key={index}
              id_detalle_compra={_valor.id_detalle_compra}
              id_categoria={_valor.id_categoria}
              descripcion_producto={_valor.descripcion_producto}
              unidad_medida={_valor.unidad_medida}
              cantidad_solicitada={_valor.cantidad_solicitada}
              estado_detalle_compra={_valor.estado_detalle_compra}
              index_producto={index}
              updateFilteredProduct={updateFilteredProduct}
              is_jefe={is_jefe}
              is_gerencia={is_gerencia}
              canChangeState={canChangeState}
              canEdit={canEdit}
            />
          ))}
        </div>

        <DialogFooter>
          {is_jefe && canChangeState ? (
            <>
              <Button
                className="bg-[#861f27] text-[#fff] cursor-pointer mx-3 px-10"
                onClick={() =>
                  setAllDetailProductsState(initialProductReport, "Rechazado")
                }
              >
                Rechazar todo
              </Button>
              <Button
                className="bg-[#207349] text-[#fff] cursor-pointer mx-5 px-10"
                onClick={() =>
                  setAllDetailProductsState(initialProductReport, "Aprobado")
                }
              >
                Aprobar todo
              </Button>
            </>
          ) : is_gerencia && canChangeState ? (
            <DialogClose asChild>
              <Button className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10">
                Aceptar
              </Button>
            </DialogClose>
          ) : (
            <>
              {canEdit && !is_jefe && !is_gerencia && (
                <Button
                  disabled={
                    JSON.stringify(filteredProductReport) ==
                    JSON.stringify(initialProductReport)
                      ? true
                      : false
                  }
                  onClick={handleUpdateProducts}
                  className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
                >
                  Editar
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
