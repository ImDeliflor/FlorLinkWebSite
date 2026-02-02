/* eslint-disable react-hooks/exhaustive-deps */
import "dayjs/locale/es"; // importar el idioma
import { CgPerformance } from "react-icons/cg";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineLightBulb,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { TfiUser } from "react-icons/tfi";
import { MdOutlineAutoMode } from "react-icons/md";
import { FaHelmetSafety } from "react-icons/fa6";
import { useEmployeeContext } from "../../empleados/hooks/useEmployeeContext";
import { useEffect } from "react";
import { useAuthStore } from "@/shared/store/authStore";
import ModalEvaluacion from "./modals/ModalEvaluacion";
import { GrupoEvaluacion } from "@/shared/enums/evaluacion_desempenio";
import { initialValueGrupoPrimLiderazgo } from "../utils/initialValuesGPLiderazgo";
import { initialValueGrupoPrimEstrategia } from "../utils/initialValuesGPEstrategia";
import { initialValuesJefeToColaborador } from "../utils/initialValuesJefeToColaborador";
import { initialValuesAutoevaluacion } from "../utils/initialValuesAutoevaluacion";
import { initialValuesAutoevaluacionJefe } from "../utils/initialValuesAutoevaluacionJefe";
import { initialValuesColaboradorToJefe } from "../utils/initialValuesColaboradorToJefe";
import { initialValuesJefeToOperario } from "../utils/initialValuesJefeToOperario";
import ModalCompromisos from "./modals/ModalCompromisos";
import { useProtectedElement } from "@/shared/hooks/useProtectedElement";
import { IndividualPrivileges } from "@/shared/config/permissions";

export const EvaluacionesMainScreen = () => {
  // Contexto del usuario logeado
  const { user } = useAuthStore();

  // Contexto de las tablas básicas - empleados
  const { getWorkTeam, workTeam } = useEmployeeContext();

  // use para el acceso a elementos
  const { canAccess } = useProtectedElement();

  useEffect(() => {
    getWorkTeam(user?.id_empleado);
  }, []);

  /*********************************  CONTEXTOS *************************************/

  return (
    <div className="flex flex-col justify-between bg-[rgb(249,241,245)] h-screen p-2">
      <div className="flex items-center justify-between min-h-[10%] min-w-full bg-white px-5 rounded-[0.7rem]">
        <div className="flex items-center justify-center">
          <CgPerformance size={35} color="#484848" />
          <span className="ml-4 text-3xl text-[#484848] font-bold">
            Evaluaciones de Desempeño
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-around min-h-[20%] max-h-[30%] min-w-full bg-white p-5 rounded-[0.7rem]">
        <span>
          Realiza las evaluaciones de desempeño según correspondan a tu equipo o
          cargo
        </span>
      </div>

      <div className="flex flex-row justify-around gap-5 min-h-[65%] max-h-[65%] min-w-full bg-white p-5 rounded-[0.7rem]">
        <div className="flex flex-col w-[35%] h-[100%] justify-evenly overflow-y-auto">
          {/*********************** EVALUAR QUE SEA DON DAVID ***********************/}
          {canAccess(
            IndividualPrivileges.gestion_humana.evaluaciones_desempenio
              .grupo_primario,
          ) && (
            <>
              {/**************************MODAL PARA EL GRUPO PRIMARIO - LIDERAZGO********************/}
              <ModalEvaluacion
                button_title="Grupo Primario - Liderazgo"
                button_icon={
                  <HiOutlineUserGroup className="mr-2 text-2xl text-[#E8B7BA]" />
                }
                title_evaluacion="EVALUACIÓN GRUPO PRIMARIO - LIDERAZGO"
                description_evaluacion="Esta evaluación es una herramienta estratégica para reflexionar de manera estructurada y objetiva sobre el desempeño de cada miembro del equipo directivo de Deliflor. Más que calificar con un número, se trata de analizar con claridad y visión de negocio cómo cada director contribuye a consolidar el ADN Deliflor, liderar su equipo y alinear las acciones de su área con la estrategia de la empresa. Te invitamos a tomarte este espacio como una oportunidad valiosa para: Reconocer las fortalezas y aportes estratégicos de cada director Identificar oportunidades de desarrollo que fortalezcan su liderazgo y la colaboración entre áreas Alinear expectativas y prioridades para construir juntos el futuro de Deliflor"
                grupo_evaluacion={GrupoEvaluacion.GrupoPrimario}
                data_grupo_evaluacion={initialValueGrupoPrimLiderazgo}
                info_observaciones={`Ten en cuenta las siguientes preguntas abiertas para las observaciones:

- ¿Qué observaciones podrías hacerle a tu colaborador para mejorar en su trabajo?
- ¿Qué fortalezas estratégicas destacas en el liderazgo de este colaborador?
- ¿Qué sugerencias tienes para que fortalezca su rol estratégico?`}
              />

              {/**************************MODAL PARA EL GRUPO PRIMARIO - ESTRATEGIA********************/}
              <ModalEvaluacion
                button_title="Grupo Primario - Estrategia"
                button_icon={
                  <HiOutlineLightBulb className="mr-2 text-2xl text-[#E8B7BA]" />
                }
                title_evaluacion="EVALUACIÓN GRUPO PRIMARIO - ESTRATEGIA"
                description_evaluacion="Esta evaluación es una herramienta estratégica para reflexionar de manera estructurada y objetiva sobre el desempeño de cada miembro del equipo directivo de Deliflor. Más que calificar con un número, se trata de analizar con claridad y visión de negocio cómo cada director contribuye a consolidar el ADN Deliflor, liderar su equipo y alinear las acciones de su área con la estrategia de la empresa. Te invitamos a tomarte este espacio como una oportunidad valiosa para: Reconocer las fortalezas y aportes estratégicos de cada director Identificar oportunidades de desarrollo que fortalezcan su liderazgo y la colaboración entre áreas Alinear expectativas y prioridades para construir juntos el futuro de Deliflor"
                grupo_evaluacion={GrupoEvaluacion.GrupoPrimario}
                data_grupo_evaluacion={initialValueGrupoPrimEstrategia}
                info_observaciones={`Ten en cuenta las siguientes preguntas abiertas:

- ¿Qué observaciones podrías hacerle a tu colaborador para mejorar en su trabajo?
- ¿Qué fortalezas estratégicas destacas en el liderazgo de este colaborador?
- ¿Qué sugerencias tienes para que fortalezca su rol estratégico?`}
              />
            </>
          )}

          {/**************************EVALUAR QUE SEA JEFE********************/}
          {(user?.es_jefe || user?.id_usuario === 13) && (
            <>
              {/**************************MODAL PARA LA EVALUACIÓN DE JEFE A COLABORADOR********************/}
              <ModalEvaluacion
                button_title="Jefe a Colaborador"
                button_icon={
                  <HiOutlineClipboardDocumentList className="mr-2 text-2xl text-[#E8B7BA]" />
                }
                title_evaluacion="EVALUACIÓN JEFE A COLABORADOR"
                description_evaluacion="Más que calificar con un número, esta evaluación es una invitación a reflexionar sobre el desarrollo de tu equipo, reconocer fortalezas y detectar oportunidades de mejora. Tómate el tiempo de pensar en comportamientos concretos y ejemplos reales. Tu retroalimentación es clave para motivar, orientar y apoyar a tu colaborador a crecer profesional y personalmente. Responde con objetividad y compromiso. Hagamos de esta evaluación una herramienta real de desarrollo y alineación con nuestro ADN Deliflor."
                grupo_evaluacion={GrupoEvaluacion.JefeToColaborador}
                data_grupo_evaluacion={initialValuesJefeToColaborador}
                info_observaciones={`Ten en cuenta las siguientes preguntas abiertas:

- ¿Qué observaciones podrías hacerle a tu colaborador para mejorar en su trabajo?`}
              />
            </>
          )}

          {/**************************MODAL PARA LA AUTOEVALUACIÓN********************/}
          {user?.es_jefe ? (
            <ModalEvaluacion
              button_title="Autoevaluación Líder"
              button_icon={
                <MdOutlineAutoMode className="mr-2 text-2xl text-[#E8B7BA]" />
              }
              title_evaluacion="AUTOEVALUACIÓN LÍDER"
              description_evaluacion="Este no es solo un formulario para asignar un número a tu trabajo. Es una herramienta para reflexionar sobre tus fortalezas, tus logros y también las áreas en las que puedes crecer. Tómate el tiempo de pensar sinceramente en cómo vives los pilares del ADN Deliflor en tu día a día. La autoevaluación es un acto de responsabilidad personal y una gran oportunidad para identificar acciones concretas que te permitan mejorar y aportar aún más al equipo y a la empresa. Responde con honestidad y compromiso. ¡Gracias por ser parte de este proceso de crecimiento compartido!"
              grupo_evaluacion={GrupoEvaluacion.Autoevaluacion}
              data_grupo_evaluacion={initialValuesAutoevaluacionJefe}
              info_observaciones={`Ten en cuenta las siguientes preguntas abiertas:

- ¿Qué acciones concretas podrías implementar para vivir más plenamente el ADN de Deliflor?`}
            />
          ) : (
            <ModalEvaluacion
              button_title="Autoevaluación"
              button_icon={
                <MdOutlineAutoMode className="mr-2 text-2xl text-[#E8B7BA]" />
              }
              title_evaluacion="AUTOEVALUACIÓN"
              description_evaluacion="Este no es solo un formulario para asignar un número a tu trabajo. Es una herramienta para reflexionar sobre tus fortalezas, tus logros y también las áreas en las que puedes crecer. Tómate el tiempo de pensar sinceramente en cómo vives los pilares del ADN Deliflor en tu día a día. La autoevaluación es un acto de responsabilidad personal y una gran oportunidad para identificar acciones concretas que te permitan mejorar y aportar aún más al equipo y a la empresa. Responde con honestidad y compromiso. ¡Gracias por ser parte de este proceso de crecimiento compartido!"
              grupo_evaluacion={GrupoEvaluacion.Autoevaluacion}
              data_grupo_evaluacion={initialValuesAutoevaluacion}
              info_observaciones={`Ten en cuenta las siguientes preguntas abiertas:

- ¿Qué acciones concretas podrías implementar para vivir más plenamente el ADN de Deliflor?`}
            />
          )}

          {/*********************** EVALUAR QUE NO SEA DON DAVID ***********************/}
          {user?.id_usuario === 15 || (
            <>
              {/**************************MODAL PARA LA EVALUACIÓN DE COLABORADOR A JEFE********************/}
              <ModalEvaluacion
                button_title="Colaborador a Jefe"
                button_icon={
                  <TfiUser className="mr-2 text-2xl text-[#E8B7BA]" />
                }
                title_evaluacion="EVALUACIÓN COLABORADOR A JEFE"
                description_evaluacion="Este espacio no es solo para calificar, sino para construir juntos un mejor ambiente de trabajo y fortalecer el liderazgo en Deliflor. Reflexiona con sinceridad y respeto sobre cómo tu jefe acompaña al equipo, comunica, promueve la confianza y facilita el logro de objetivos. Tus respuestas son valiosas para ayudar a tu líder a crecer y mejorar, y para consolidar un estilo de liderazgo alineado con nuestro ADN. Gracias por participar con compromiso en este ejercicio de mejora compartida."
                grupo_evaluacion={GrupoEvaluacion.ColaboradorToJefe}
                data_grupo_evaluacion={initialValuesColaboradorToJefe}
                info_observaciones={`Ten en cuenta las siguientes preguntas abiertas:

- ¿Qué cualidades destacas de tu jefe como líder?
- ¿Qué sugerencias tienes para que tu jefe mejore su liderazgo?`}
              />
            </>
          )}

          {(workTeam.filter((e) => e.grupo == "Operativo").length > 0 ||
            user?.id_usuario === 13) && (
            <>
              {/**************************MODAL PARA LA EVALUACIÓN DE JEFE A OPERARIO********************/}
              <ModalEvaluacion
                button_title="Jefe a Colaborador (Operarios)"
                button_icon={
                  <FaHelmetSafety className="mr-2 text-2xl text-[#E8B7BA]" />
                }
                title_evaluacion="EVALUACIÓN JEFE A COLABORADOR (OPERARIOS)"
                description_evaluacion="Más que calificar con un número, esta evaluación es una invitación a reflexionar sobre el desarrollo de tu equipo, reconocer fortalezas y detectar oportunidades de mejora. Tómate el tiempo de pensar en comportamientos concretos y ejemplos reales. Tu retroalimentación es clave para motivar, orientar y apoyar a tu colaborador. Responde con objetividad y compromiso. Hagamos de esta evaluación una herramienta real de desarrollo y alineación con nuestro ADN Deliflor."
                grupo_evaluacion={GrupoEvaluacion.JefeToOperarios}
                data_grupo_evaluacion={initialValuesJefeToOperario}
                info_observaciones={`Ten en cuenta las siguientes preguntas abiertas:

- ¿Qué observaciones podrías hacerle a tu colaborador para mejorar en su trabajo?`}
              />
            </>
          )}
        </div>
        {(user?.es_jefe || user?.id_usuario === 13) && (
          <div className="flex flex-col w-[35%] h-[100%] justify-center">
            <ModalCompromisos />
          </div>
        )}
      </div>
    </div>
  );
};
