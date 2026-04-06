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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RiFileEditLine } from "react-icons/ri";
import { useUpdateEntradaAlmacen } from "../../hooks/useEntradaAlmacen";
import Swal from "sweetalert2";
import { useStoreEntriesContext } from "../../hooks/useStoreEntriesContext";

interface ProductEntryProps {
  id_entrada?: number;
}

export default function ModalUpdateEntry({
  id_entrada = 0,
}: ProductEntryProps) {
  // Configuración de fecha, hora y zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  /*********************************  ESTADOS DE USO *************************************/
  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  // useState para manejar el nuevo nro de factura
  const [nroFactura, setNroFactura] = useState("");

  // REACT QUERY -> Modificar el nro de factura de una entrada
  const { mutate: changeNroFactura, isPending } = useUpdateEntradaAlmacen();

  // Resetear form (nro factura)
  const resetForm = () => {
    setNroFactura("");
  };

  // Contexto de almacén-entradas
  const { getStoreEntry } = useStoreEntriesContext();

  // Función para enviar el nro de factura nuevo
  const handlerUpdateNroFactura = () => {
    const new_factura = nroFactura;

    if (!new_factura.trim()) {
      alert("¡En nro de factura no puede estar vacío!");
      return;
    }

    if (!id_entrada) {
      alert("No se encontró la entrada");
      return;
    }

    changeNroFactura(
      {
        id: id_entrada,
        data: {
          nro_factura: new_factura,
        },
      },
      {
        onSuccess: () => {
          getStoreEntry();
          resetForm();
          setOpen(false);
          Swal.fire({
            icon: "success",
            title: "Entrada modificada exitosamente",
            text: "¡La entrada fue modificada exitosamente!",
            confirmButtonColor: "#82385D",
          });
        },
        onError: () => {
          alert("Error actualizando la factura");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          <RiFileEditLine className="" size={20} color="#E8B7BA" />
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[70vw] !h-auto !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848] text-center text-2xl font-bold">
            ID DE FACTURA #{id_entrada}
          </DialogTitle>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="flex flex-col gap-4 items-center py-4 overflow-y-auto">
          <label htmlFor="" className="text-[#909090]">
            N° Factura nuevo
          </label>
          <input
            className="w-[45%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
            type="text"
            placeholder="N° de factura"
            onChange={(e) => setNroFactura(e.target.value)}
            defaultValue={nroFactura}
          />
        </div>

        <DialogFooter>
          <Button
            className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
            onClick={handlerUpdateNroFactura}
            disabled={isPending}
          >
            Modificar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
