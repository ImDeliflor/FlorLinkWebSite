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
import { PiReadCvLogo } from "react-icons/pi";

export default function Rules() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center bg-[#82385D] text-xl font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          <PiReadCvLogo className="mr-2" size={30} color="#E8B7BA" />
          Instrucciones
        </button>
      </DialogTrigger>

      <DialogContent className="w-full h-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#484848]">
            Reglas para las órdenes de compra
          </DialogTitle>
          <DialogDescription>
            Atiende estas reglas para llevar un buen control sobre tus órdenes
            de compra
          </DialogDescription>
        </DialogHeader>

        {/* Aquí va tu contenido personalizado */}
        <div className="grid gap-4 py-4">
          <ul className="max-w-md space-y-4 text-[#484848] list-disc list-inside">
            <li>
              Las órdenes de compra se pueden crear/diligenciar de miércoles a
              lunes.
            </li>
            <li>
              Para evitar la creación de varias órdenes, cuando crees una orden
              y necesites añadir un producto más o modificar. Vé a tus ordenes
              de compra y en caso de ya haber creado una, modifícala y añade lo
              que requieras.
            </li>
            <li>
              Los días martes no habrá disponibilidad de modificación y/o
              creación de órdenes de compra. Estos días los destinarán los
              directores para la revisión de las órdenes de compra creadas por
              su respectivo equipo.
            </li>
          </ul>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer">
              Aceptar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
