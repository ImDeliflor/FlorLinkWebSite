import {
  ADNDeliflor,
  EnfoqueEvaluacion,
  GrupoEvaluacion,
} from "@/shared/enums/evaluacion_desempenio";
import type { PreguntasEvaluacion } from "../types/preguntas";

// Valores iniciales para el grupo primario (liderazgo)
export const initialValuesJefeToOperario = {
  id_grupo_evaluacion: GrupoEvaluacion.JefeToOperarios,
  id_evaluador: 0,
  id_evaluado: 0,
  id_enfoque_evaluacion: EnfoqueEvaluacion.General,
  observaciones: "",
  preguntas: [
    // Preguntas para el ADN de SOMOS PARA NUESTROS CLIENTES
    {
      pregunta:
        "Trata con respeto y amabilidad a sus compañeros y supervisores",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },
    {
      pregunta: "Cumple con los compromisos y tareas para generar confianza",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },
    {
      pregunta: "Está dispuesto a aprender de otros y enseñar lo que sabe",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },
    {
      pregunta: "Ayuda a que haya buen ambiente de trabajo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },

    // Preguntas para el ADN de EL QUE SABE, SABE
    {
      pregunta: "Sabe hacer bien su trabajo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },
    {
      pregunta:
        "Tiene ganas de aprender cosas nuevas para hacer su trabajo cada vez mejor",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },
    {
      pregunta: "Propone ideas para trabajar mejor o más rapido",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },
    {
      pregunta: "Entrega su trabajo con buena calidad",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },

    // Preguntas para el ADN de UNIDOS SOMOS MÁS PODEROSOS
    {
      pregunta: "Ayuda a sus compañeros cuando lo necesitan",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta:
        "Se comunica claramente con sus compañeros de trabajo y con su Supervisor y/o jefes",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta: "Resuelve problemas de forma tranquila y respetuosa",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta: "Trabaja bien con el equipo para cumplir las metas",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },

    // Preguntas para el ADN de TODO Y MÁS POR LOS CRISANTEMOS
    {
      pregunta: "Se esfuerza por cumplir las metas y tareas asignadas",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta: "Cuida las herramientas y materiales de la empresa",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta: "Es puntual, ordenado y disciplinado en su trabajo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta: "Mantiene un ritmo de trabajo eficiente y con calidad",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },

    // Preguntas para el ADN de SEGURIDAD
    {
      pregunta: "Usa correctamente los elementos de protección personal (EPP)",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.Seguridad,
    },
    {
      pregunta:
        "Cumple los procedimientos de seguridad en su puesto de trabajo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.Seguridad,
    },
    {
      pregunta: "Reporta condiciones o actos inseguros",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.Seguridad,
    },
    {
      pregunta: "Mantiene el orden y la limpieza en su área de trabajo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.Seguridad,
    },
    {
      pregunta: "Colabora en la identificación y prevención de riesgos",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.Seguridad,
    },
  ] as PreguntasEvaluacion[],
};
