import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { CiTrash } from "react-icons/ci";
import { useEffect, useState } from "react";
import { FormCompromisos } from "../FormCompromisos";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GiStairsGoal } from "react-icons/gi";
import type { Compromisos } from "../../types/compromisos";
import { initialValueCompromiso } from "../../utils/initialValueCompromiso";
import { useEmployeeContext } from "@/features/human_resources/empleados/hooks/useEmployeeContext";
import { useEvaluacionContext } from "../../hooks/useEvaluacionContext";
import { useAuthStore } from "@/shared/store/authStore";
import { BsSendArrowUp } from "react-icons/bs";

export default function ModalCompromisos() {
  // Configuración de fecha, hora y zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // Contexto del usuario logeado
  const { user } = useAuthStore();

  // Contexto de las tablas básicas - empleados
  const { workTeam } = useEmployeeContext();

  // Contexto de las evaluaciones
  const { saveCompromisos } = useEvaluacionContext();

  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  // useState para los compromisos
  const [arrayCompromisos, setArrayCompromisos] = useState<Compromisos[]>([]);

  // useState para el id del empleado
  const [idEmpleado, setIdEmpleado] = useState(0);

  // Estado para habilitar/deshabilitar el botón de envío de datos
  const [disableButton, setDisableButton] = useState(false);

  // Estado para habilitar/deshabilitar el botón de envío de datos
  const [observCompromisos, setObservCompromisos] = useState("");

  // Estado para saber si el evaluado es jefe
  const [esJefe, setEsJefe] = useState<boolean>(false);

  // Función para saber si un empleado es jefe o no
  const handleChangeEmpleado = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setIdEmpleado(id);

    const empleado = workTeam.find((e) => e.id_empleado === id);

    if (empleado) {
      setEsJefe(empleado.es_jefe);
    } else {
      setEsJefe(false);
    }
  };

  // Función para añadir un objeto de compromisos
  const addCompromiso = () => {
    setArrayCompromisos((prev) => [...prev, initialValueCompromiso]);
  };

  // Función para remover un objeto de compromisos
  const removeCompromiso = () => {
    const indexToRemove = arrayCompromisos.length;

    setArrayCompromisos((prev) =>
      prev.filter((_, index) => index !== indexToRemove - 1),
    );
  };

  //Función para el cambio de valor en el select
  const onChangeSelect = (
    index: number,
    key: keyof Compromisos,
    value: string | number,
  ) => {
    setArrayCompromisos((prev) => {
      // copiar el array actual
      const updated = [...prev];

      // actualizar SOLO el campo indicado en el objeto indicado
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  // Función para enviar los compromisos al backend
  const handlerSaveCompromisos = async () => {
    setDisableButton(true);

    // Crear un nuevo array y setear el id del empleado y fecha a todos los compromisos
    const new_compromisos = arrayCompromisos.map((c) => ({
      ...c,
      id_evaluador: user?.id_empleado ? user?.id_empleado : 0,
      id_empleado: idEmpleado,
      fecha_registro: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      observaciones: observCompromisos,
    }));

    // Validar que todos los campos estén llenos
    const isValid = new_compromisos.every((c) =>
      Object.values(c).every(
        (value) =>
          value !== "" && value !== null && value !== undefined && value !== 0,
      ),
    );

    // En caso de que los compromisos estén llenos
    if (isValid) {
      await saveCompromisos(new_compromisos, setOpen, setDisableButton);
    } else {
      alert("Revisa que todos los campos estén diligenciados");
      setDisableButton(false);
    }
  };

  useEffect(() => {
    setArrayCompromisos([]);
    setIdEmpleado(0);
    setEsJefe(false);
    setObservCompromisos("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center bg-[#82385D] font-semibold text-2xl text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          <GiStairsGoal className="mr-2 text-2xl text-[#E8B7BA]" />
          Compromisos
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[90vw] !h-[95vh] !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader className="h-[20%]">
          <DialogTitle className="text-[#484848] text-center text-2xl mb-5 font-bold">
            CUMPLIMIENTO DE OBJETIVOS Y RESULTADOS
          </DialogTitle>
          <DialogDescription className="text-[#484848] text-center">
            <p>
              Esta dimensión permite verificar el grado de avance frente a los
              compromisos definidos, valorar el impacto en los resultados del
              área y establecer nuevos objetivos alineados con la estrategia,
              fortaleciendo una cultura de responsabilidad, seguimiento y mejora
              continua. Ten en cuenta los siguientes puntos para tu conclusión
              final:
            </p>
            <ul className="list-decimal list-inside space-y-3 text-gray-700 text-sm w-[100%] mt-6">
              <div className="flex w-[100%] justify-evenly ">
                <li className="bg-[#E8B7BA] p-3 rounded-lg w-[40%] text-[#82385D] font-bold">
                  Cumplió los objetivos definidos en la evaluación anterior en
                  tiempo y calidad.
                </li>
                <li className="bg-[#82385D] p-3 rounded-lg w-[40%] text-[#E8B7BA] font-bold">
                  Ejecutó acciones concretas para cerrar las brechas
                  identificadas.
                </li>
              </div>
              <div className="flex w-[100%] justify-evenly">
                <li className="bg-[#82385D] p-3 rounded-lg w-[40%] text-[#E8B7BA] font-bold">
                  Dio seguimiento sistemático a sus compromisos.
                </li>
                <li className="bg-[#E8B7BA] p-3 rounded-lg w-[40%] text-[#82385D] font-bold">
                  Los resultados obtenidos aportaron a las metas del área.
                </li>
              </div>
              <div className="flex w-[100%] justify-evenly">
                <li className="bg-[#82385D] p-3 rounded-lg w-[40%] text-[#E8B7BA] font-bold">
                  Cuando surgieron desviaciones, gestionó oportunamente ajustes
                  y apoyos.
                </li>
              </div>
              {esJefe && (
                <>
                  <div className="flex w-[100%] justify-evenly">
                    <li className="bg-[#82385D] p-3 rounded-lg w-[40%] text-[#E8B7BA] font-bold">
                      Hizo seguimiento estructurado a los objetivos de su
                      equipo.
                    </li>
                    <li className="bg-[#E8B7BA] p-3 rounded-lg w-[40%] text-[#82385D] font-bold">
                      Alineó los objetivos individuales con los del área y la
                      estrategia de la empresa.
                    </li>
                  </div>
                  <div className="flex w-[100%] justify-evenly">
                    <li className="bg-[#E8B7BA] p-3 rounded-lg w-[40%] text-[#82385D] font-bold">
                      Desarrolló a su equipo a partir de los compromisos
                      acordados.
                    </li>
                    <li className="bg-[#82385D] p-3 rounded-lg w-[40%] text-[#E8B7BA] font-bold">
                      Tomó decisiones oportunas para asegurar el cumplimiento de
                      metas.
                    </li>
                  </div>
                </>
              )}
            </ul>
          </DialogDescription>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="grid gap-4 py-4  overflow-y-auto h-[100%]">
          <div className="flex justify-center w-[100%] h-auto mt-2 mb-10">
            <select
              id="default"
              className="bg-gray-50 w-[40%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-1 px-6"
              value={idEmpleado}
              onChange={handleChangeEmpleado}
            >
              <option value="0">¿A quién deseas evaluar?</option>
              {[...workTeam]
                .sort((a, b) => a.nombre.localeCompare(b.nombre))
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_empleado}>
                    {_valor.nombre} {_valor.apellidos}
                  </option>
                ))}
            </select>
          </div>
          {arrayCompromisos.map((_valor, index) => (
            <FormCompromisos
              _valor={_valor}
              index={index}
              onChangeSelect={onChangeSelect}
              key={index}
            />
          ))}
          <div className="flex items-center justify-center mt-8">
            <CiTrash
              className="cursor-pointer"
              size={40}
              color="#82385D"
              onClick={removeCompromiso}
            />
            <IoIosAddCircleOutline
              className="cursor-pointer"
              size={40}
              color="#82385D"
              onClick={addCompromiso}
            />
          </div>
        </div>

        <DialogFooter className="h-[100%]">
          <div className="flex flex-col w-[100%] h-[100%]">
            <label htmlFor="" className="flex mb-2">
              Conclusión <span className="text-[#ff4f4f]">*</span>
            </label>
            <textarea
              className="border-1 border-[#9D9D9D] w-[100%] h-[100%] p-2 px-4 resize-none rounded-xl"
              value={observCompromisos}
              onChange={(e) => setObservCompromisos(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
          </div>
          <button
            type="button"
            className="bg-[#82385D] text-[#E8B7BA] rounded-[100%] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
            onClick={handlerSaveCompromisos}
            disabled={disableButton}
          >
            <BsSendArrowUp className="text-3xl text-[#E8B7BA]" />
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
