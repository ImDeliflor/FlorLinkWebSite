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
import { CiTrash } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useOrderContext } from "@/features/orders/hooks/useOrderContext";
import { FormProduct } from "../FormProduct";
import { IoIosAdd, IoIosAddCircleOutline } from "react-icons/io";
import { useProductContext } from "../../hooks/useProductContext";

interface DetailOrderProps {
  nro_orden: number | undefined;
}

export default function AddProduct({ nro_orden = 0 }: DetailOrderProps) {
  // OrderContext -> data y funciones correspondientes a las órdenes
  const {
    arrayProducts,
    addProduct,
    removeProduct,
    handlerUpdateProduct,
    resetProducts,
  } = useOrderContext();

  // Traer los datos detallados de los productos
  const { getProductsReport } = useProductContext();

  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  const handlerAddProducts = async () => {
    try {
      await handlerUpdateProduct(nro_orden, setOpen);
      await getProductsReport();
    } catch (error) {
      console.error("Error al añadir los productos: ", error);
      throw error;
    }
  };

  useEffect(() => {
    resetProducts();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          <IoIosAdd className="mr-2" size={20} color="#E8B7BA" />
          Añadir
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[90vw] !h-[90vh] !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848]">
            Detalle orden #{nro_orden}
          </DialogTitle>
          <DialogDescription>
            Añade productos nuevos asociados a la orden #{nro_orden}
          </DialogDescription>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="grid gap-4 py-4  overflow-y-auto">
          {arrayProducts.map((_valor, index) => (
            <FormProduct _valor={_valor} index={index} key={index} />
          ))}
          <div className="flex items-center justify-center mt-8">
            <CiTrash
              className="cursor-pointer"
              size={40}
              color="#82385D"
              onClick={() => removeProduct()}
            />
            <IoIosAddCircleOutline
              className="cursor-pointer"
              size={40}
              color="#82385D"
              onClick={addProduct}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10">
              Aceptar
            </Button>
          </DialogClose>
          <Button
            disabled={arrayProducts.length > 0 ? false : true}
            onClick={handlerAddProducts}
            className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
          >
            Añadir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
