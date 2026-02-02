import {
  ADNDeliflor,
  EnfoqueEvaluacion,
  GrupoEvaluacion,
} from "@/shared/enums/evaluacion_desempenio";
import type { PreguntasEvaluacion } from "../types/preguntas";

// Valores iniciales para el grupo primario (liderazgo)
export const initialValuesColaboradorToJefe = {
  id_grupo_evaluacion: GrupoEvaluacion.ColaboradorToJefe,
  id_evaluador: 0,
  id_evaluado: 0,
  id_enfoque_evaluacion: EnfoqueEvaluacion.General,
  observaciones: "",
  preguntas: [
    // Preguntas para el ADN de SOMOS PARA NUESTROS CLIENTES
    {
      pregunta:
        "Promueve relaciones de confianza con los miembros de su equipo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },
    {
      pregunta: "Es cercano y accesible para resolver inquietudes",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },
    {
      pregunta: "Es coherente entre lo que dice y hace, generando credibilidad",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },
    {
      pregunta: "Fomenta un trato respetuoso y cordial en el equipo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },

    // Preguntas para el ADN de EL QUE SABE, SABE
    {
      pregunta:
        "Domina y actualiza los conocimientos necesarios para liderar su equipo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },
    {
      pregunta:
        "Comparte conocimiento y guía al equipo para resolver dudas o problemas",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },
    {
      pregunta:
        "Impulsa la mejora continua y la búsqueda de soluciones innovadoras",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },
    {
      pregunta: "Toma decisiones con oportunidad, agilidad y criterio",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },

    // Preguntas para el ADN de UNIDOS SOMOS MÁS PODEROSOS
    {
      pregunta:
        "Escucha activamente y con respeto las ideas y necesidades del equipo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta:
        "Comunica con claridad, transparencia y frecuencia las metas y expectativas",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta: "Maneja los conflictos de forma justa y constructiva",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta:
        "Fomenta la colaboración y la cohesión dentro del equipo y con otras áreas",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },

    // Preguntas para el ADN de TODO Y MÁS POR LOS CRISANTEMOS
    {
      pregunta: "Define metas claras y retadoras para el equipo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta: "Hace seguimiento y acompaña para lograr los resultados",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta: "Administra de forma responsable los recursos del equipo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta:
        "Promueve la disciplina, la calidad y la autogestión en el equipo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
  ] as PreguntasEvaluacion[],
};
