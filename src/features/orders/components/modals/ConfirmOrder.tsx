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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaRegHandshake } from "react-icons/fa";
import { useOrderContext } from "../../hooks/useOrderContext";

interface DetailOrderProps {
  nro_orden: number | undefined;
}

export default function ConfirmOrder({ nro_orden = 0 }: DetailOrderProps) {
  // OrderContext -> data y funciones correspondientes a las órdenes
  const { sendToApproval } = useOrderContext();

  // Configuración de la zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  // useState para el precio total de la orden
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          <FaRegHandshake className="mr-2" size={20} color="#E8B7BA" />
          Confirmar
        </button>
      </DialogTrigger>

      <DialogContent className="bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848]">
            Confirmar precio de la orden #{nro_orden}
          </DialogTitle>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="grid gap-4 py-4 overflow-y-auto">
          <input
            className=" w-[100%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
            type="number"
            placeholder="Valor total de la compra"
            value={totalPrice}
            onChange={(e) => setTotalPrice(Number(e.target.value))}
          />
        </div>

        <DialogFooter>
          <Button
            className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
            onClick={() =>
              sendToApproval(
                {
                  estado_compra: "Confirmado",
                  fecha_validacion_orden_compra: dayjs().format(
                    "YYYY-MM-DD HH:mm:ss"
                  ),
                  precio_total: totalPrice,
                },
                "¡Orden confirmada!",
                nro_orden
              )
            }
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
