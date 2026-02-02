import {
  ADNDeliflor,
  EnfoqueEvaluacion,
  GrupoEvaluacion,
} from "@/shared/enums/evaluacion_desempenio";
import type { PreguntasEvaluacion } from "../types/preguntas";

// Valores iniciales para el grupo primario (liderazgo)
export const initialValuesAutoevaluacionJefe = {
  id_grupo_evaluacion: GrupoEvaluacion.Autoevaluacion,
  id_evaluador: 0,
  id_evaluado: 134,
  id_enfoque_evaluacion: EnfoqueEvaluacion.General,
  observaciones: "",
  preguntas: [
    // Preguntas para el ADN de SOMOS PARA NUESTROS CLIENTES
    {
      pregunta: "Soy auténtico y cercano con los demás",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },
    {
      pregunta: "Genero confianza siendo honesto",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },
    {
      pregunta: "Aprendo de otros y aplico lo aprendido",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },
    {
      pregunta: "Promuevo un ambiente colaborativo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },

    // Preguntas para el ADN de EL QUE SABE, SABE
    {
      pregunta: "Procuro actualizar los conocimientos necesarios para mi rol",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },
    {
      pregunta: "Propongo mejoras o soluciones para mejorar los procesos",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },
    {
      pregunta: "Tomo iniciativa con agilidad",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },
    {
      pregunta: "Supero expectativas del cliente interno/externo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },

    // Preguntas para el ADN de UNIDOS SOMOS MÁS PODEROSOS
    {
      pregunta: "Actúo con justicia y transparencia",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta: "Me comunico con claridad y respeto",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta: "Ayudo a resolver conflictos de forma constructiva",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta: "Trabajo en equipo y contribuyo a elevar estándares",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },

    // Preguntas para el ADN de TODO Y MÁS POR LOS CRISANTEMOS
    {
      pregunta: "Me comprometo con metas retadoras",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta: "Uso recursos de forma consciente",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta: "Soy disciplinado y consistente",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta: "Me autogestiono y cuido la calidad",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },

    // Preguntas para el ADN de LÍDERES
    {
      pregunta: "Promuevo relaciones de confianza en mi equipo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.Lideres,
    },
    {
      pregunta: "Impulso el aprendizaje y el desarrollo de mi equipo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.Lideres,
    },
    {
      pregunta: "Escucho activamente y fomento colaboración",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.Lideres,
    },
    {
      pregunta: "Facilito solución de conflictos con conversaciones claras",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.Lideres,
    },
    {
      pregunta: "Defino metas retadoras y acompaño su logro",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.Lideres,
    },
    {
      pregunta: "Aseguro recursos y seguimiento para resultados",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.Lideres,
    },
  ] as PreguntasEvaluacion[],
};
