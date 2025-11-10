/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useOrderContext } from "@/features/orders/hooks/useOrderContext";

interface DetailOrderProps {
  nro_orden: number | undefined;
  observaciones?: string | undefined;
  is_jefe?: boolean;
  is_gerencia?: boolean;
}

export default function ModalObservation({
  nro_orden = 0,
  observaciones = "",
  is_jefe = false,
  is_gerencia = false,
}: DetailOrderProps) {
  // OrderContext -> data y funciones correspondientes a las órdenes
  const { resetProducts, sendToApproval } = useOrderContext();

  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  useEffect(() => {
    resetProducts();
  }, [open]);

  const [newObservation, setNewObservation] = useState(observaciones);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center font-medium w-full text-[#484848] bg-[#f7f6f6] h-auto cursor-pointer px-3 py-1 rounded-xl mt-2">
          {observaciones?.slice(0, 100)}
          {observaciones.length >= 100 ? "..." : ""}
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[90vw] !h-[90vh] !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848]">
            Observación orden #{nro_orden}
          </DialogTitle>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="grid gap-4 py-4 overflow-y-auto">
          <textarea
            className="border-1 border-[#9D9D9D] h-[100%] w-[100%] p-2 resize-none rounded-xl"
            value={newObservation}
            onChange={(e) => setNewObservation(e.target.value)}
            disabled={(is_jefe || is_gerencia) && true}
          />
        </div>

        <DialogFooter>
          {(!is_jefe || !is_gerencia) && (
            <Button
              disabled={observaciones == newObservation ? true : false}
              onClick={() => {
                sendToApproval(
                  {
                    observaciones: newObservation,
                  },
                  "¡Observaciones modificadas con éxito!",
                  nro_orden
                );
              }}
              className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
            >
              Editar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
