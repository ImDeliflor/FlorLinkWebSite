/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useState, type ReactNode } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { getNombreADN } from "../../utils/ADNDeliflor";
import { BsSendArrowUp } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useEmployeeContext } from "@/features/human_resources/empleados/hooks/useEmployeeContext";
import { useAuthStore } from "@/shared/store/authStore";
import type { ProcesarEvaluacion } from "../../types/evaluacion";
import { useEvaluacionContext } from "../../hooks/useEvaluacionContext";
import { GrupoEvaluacion } from "@/shared/enums/evaluacion_desempenio";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";

interface ModalEvaluacionProps {
  button_title: string;
  button_icon: ReactNode;
  title_evaluacion: string;
  description_evaluacion: string;
  grupo_evaluacion: number;
  data_grupo_evaluacion: ProcesarEvaluacion;
  info_observaciones: string;
}

export default function ModalEvaluacion({
  button_title,
  button_icon,
  title_evaluacion = "Sin título",
  description_evaluacion = "Sin descripción",
  grupo_evaluacion = 0,
  data_grupo_evaluacion,
  info_observaciones,
}: ModalEvaluacionProps) {
  // Configuración de fecha, hora y zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // Contexto de las tablas básicas - empleados
  const { workTeam } = useEmployeeContext();

  // Contexto de las evaluaciones
  const { processEvaluacion } = useEvaluacionContext();

  // Contexto del usuario logeado
  const { user } = useAuthStore();

  // Estado inicial para el grupo primario de liderazgo
  const [grupo, setGrupo] = useState(data_grupo_evaluacion);

  // Estado para habilitar/deshabilitar el botón de envío de datos
  const [disableButton, setDisableButton] = useState(false);

  // useState para saber si un colaborador es jefe
  const [esJefe, setEsJefe] = useState("no");

  // Opciones de calificacion
  const opcionesCalificacion = [
    { label: "Nunca", value: "Nunca" },
    { label: "A veces", value: "A veces" },
    { label: "Frecuentemente", value: "Frecuentemente" },
    { label: "Siempre", value: "Siempre" },
  ];

  // Función para agrupar por preguntas
  const preguntasPorAdn = grupo.preguntas.reduce(
    (acc, pregunta, index) => {
      const key = pregunta.id_adn;

      if (!acc[key]) acc[key] = [];
      acc[key].push({ ...pregunta, index });

      return acc;
    },
    {} as Record<
      number,
      ((typeof grupo.preguntas)[number] & { index: number })[]
    >,
  );

  // Función para actualizar cada pregunta
  const onChangeCalificacion = (index: number, value: string) => {
    setGrupo((prev) => ({
      ...prev,
      preguntas: prev.preguntas.map((p, i) =>
        i === index
          ? {
              ...p,
              calificacion: value,
              fecha: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            }
          : p,
      ),
    }));
  };

  // Función para guardar la evaluación junto a las preguntas
  const handlerSaveEvaluacion = async () => {
    setDisableButton(true);
    // Crear el objeto para guardar
    let new_evaluacion = {
      ...grupo,
      id_evaluador: user?.id_empleado ? user?.id_empleado : 0,
    };

    // En caso de que sea una evaluación de colaborador a jefe
    if (grupo_evaluacion === GrupoEvaluacion.ColaboradorToJefe) {
      // Asignar el id_evaluado como el id_jefe del usuario logeado
      new_evaluacion.id_evaluado = user?.id_jefe ? user.id_jefe : 0;
    }

    // En caso de que sea de jefe a colaborador y el colaborador no sea jefe
    if (grupo_evaluacion === GrupoEvaluacion.JefeToColaborador) {
      // Remover las preguntas para líderes
      if (esJefe === "no") {
        new_evaluacion = {
          ...grupo,
          id_evaluador: user?.id_empleado ? user.id_empleado : 0,
          preguntas: grupo.preguntas.filter(
            (p) => !p.pregunta.includes("(Para líderes)"),
          ),
        };
      }
    }

    // Validar que todos los campos estén llenos
    const isValid = Object.entries(new_evaluacion)
      .filter(([key]) => key !== "preguntas")
      .every(
        ([, value]) =>
          value !== "" && value !== null && value !== undefined && value !== 0,
      );

    // Validar que todos los campos estén llenos
    const isValidPreguntas = new_evaluacion.preguntas.every(
      (p) =>
        p.pregunta.includes("(Para líderes)") ||
        (p.calificacion !== "" && p.calificacion !== null),
    );

    // En caso de que las preguntas y los datos básicos estén diligenciados por completo
    if (isValid && isValidPreguntas) {
      await processEvaluacion(new_evaluacion, setOpen, setDisableButton);
    } else {
      alert(
        "Revisa que todos los campos estén diligenciados, incluídas las observaciones",
      );
      setDisableButton(false);
    }
  };

  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setGrupo(data_grupo_evaluacion);
    setEsJefe("no");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center bg-[#82385D] font-semibold text-2xl text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          {button_icon}
          {button_title}
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[95vw] !h-[95vh] !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848] text-center text-2xl mb-5 font-bold">
            {title_evaluacion}
          </DialogTitle>
          <DialogDescription className="text-[#484848] text-center">
            {description_evaluacion}
          </DialogDescription>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="flex items-center justify-around flex-wrap overflow-y-auto mt-10">
          {grupo_evaluacion === GrupoEvaluacion.Autoevaluacion ||
            grupo_evaluacion === GrupoEvaluacion.ColaboradorToJefe || (
              <div className="flex justify-center w-[100%] mt-2 mb-10">
                <select
                  id="default"
                  className="bg-gray-50 w-[40%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6"
                  value={grupo.id_evaluado}
                  onChange={(e) =>
                    setGrupo((prev) => ({
                      ...prev,
                      id_evaluado: Number(e.target.value),
                    }))
                  }
                >
                  <option value="0">¿A quién deseas evaluar?</option>
                  {[...workTeam]
                    .filter((e) =>
                      grupo_evaluacion === GrupoEvaluacion.JefeToOperarios
                        ? e.grupo === "Operativo"
                        : e.grupo === "Administrativo",
                    )
                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                    .map((_valor, index) => (
                      <option key={index} value={_valor.id_empleado}>
                        {_valor.nombre} {_valor.apellidos}
                      </option>
                    ))}
                </select>
                {grupo_evaluacion === GrupoEvaluacion.JefeToColaborador && (
                  <>
                    <ToggleGroup
                      type="single"
                      value={esJefe}
                      onValueChange={setEsJefe}
                      className="rounded-xl ml-5"
                    >
                      <ToggleGroupItem
                        value="si"
                        className="px-6 py-2 data-[state=on]:bg-[#82385D] data-[state=on]:text-white rounded-xl"
                      >
                        Es jefe
                      </ToggleGroupItem>

                      <ToggleGroupItem
                        value="no"
                        className="px-6 py-2 data-[state=on]:bg-[#82385D] data-[state=on]:text-white rounded-xl"
                      >
                        No es jefe
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </>
                )}
              </div>
            )}
          {/*********DIV PARA LA EVALUACIÓN DE COLABORADOR A JEFE ********/}
          {grupo_evaluacion === GrupoEvaluacion.ColaboradorToJefe && (
            <div className="flex justify-center w-[100%] mt-2 mb-10">
              <h2 className="bg-[#82385D] py-2 px-4 rounded-2xl text-[#ffff] shadow-xl/30 shadow-[#E8B7BA]">
                Vas a evaluar a{" "}
                <span className="font-bold">{user?.nombre_jefe}</span>
              </h2>
            </div>
          )}

          {/********************* DIV PARA EL TIPO DE DOCUMENTO *****************************/}
          {Object.entries(preguntasPorAdn).map(([idAdn, preguntas]) => (
            <div key={idAdn} className="mb-8 w-[50%]">
              <h3 className="font-semibold text-lg mb-4 text-center">
                {getNombreADN(Number(idAdn))}
              </h3>

              {preguntas.map((p) => (
                <div key={p.index} className="mb-3 py-3">
                  <p className="mb-3 text-center">{p.pregunta}</p>

                  <div className="flex gap-3 justify-center">
                    {opcionesCalificacion.map((op) => (
                      <button
                        key={op.value}
                        className={`px-3 py-2 rounded-lg border cursor-pointer
                ${
                  p.calificacion === op.value
                    ? "bg-[#82385D] text-white"
                    : "bg-white"
                }
              `}
                        onClick={() => onChangeCalificacion(p.index, op.value)}
                      >
                        {op.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <DialogFooter>
          <div className="flex flex-col w-[100%]">
            <label htmlFor="" className="flex mb-2">
              Observaciones <span className="text-[#ff4f4f]">*</span>
              <IoIosInformationCircleOutline
                className="ml-2 text-2xl text-[#82385D] cursor-pointer"
                onClick={() => alert(info_observaciones)}
              />
            </label>
            <textarea
              className="border-1 border-[#9D9D9D] w-[100%] p-2 px-4 resize-none rounded-xl"
              onChange={(e) =>
                setGrupo((prev) => ({
                  ...prev,
                  observaciones: e.target.value,
                }))
              }
              onFocus={(e) => e.target.select()}
            />
          </div>
          <button
            type="button"
            className="bg-[#82385D] w-auto h-auto text-[#E8B7BA] rounded-[100%] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
            onClick={handlerSaveEvaluacion}
            disabled={disableButton}
          >
            <BsSendArrowUp className="text-3xl text-[#E8B7BA]" />
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
