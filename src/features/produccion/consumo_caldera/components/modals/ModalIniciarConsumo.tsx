import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RiSpeedLine } from "react-icons/ri";

export default function ModalIniciarConsumo() {
  // Contexto de las tablas básicas
  // const {
  //   tiposDocumento,
  //   ciudades,
  //   cargos,
  //   areas,
  //   sexos,
  //   estadosCiviles,
  //   eps,
  //   fondosPensiones,
  //   fondosCesantias,
  //   mediosTransporte,
  //   tiposContrato,
  // } = useBasicTablesContext();

  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  const [fechaHora, setFechaHora] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          <RiSpeedLine className="mr-2" size={20} color="#E8B7BA" />
          Iniciar un consumo
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[95vw] !h-[95vh] !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848] text-2xl text-center font-bold">
            INICIAR UN NUEVO CONSUMO
          </DialogTitle>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="flex items-center justify-around flex-wrap overflow-y-auto">
          {/********************* DIV PARA EL TIPO DE DOCUMENTO *****************************/}
          <input
            type="datetime-local"
            value={fechaHora}
            onChange={(e) => setFechaHora(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <DialogFooter>
          <Button className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10">
            Ingresar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
