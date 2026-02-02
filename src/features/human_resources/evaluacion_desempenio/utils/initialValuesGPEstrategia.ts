import {
  ADNDeliflor,
  EnfoqueEvaluacion,
  GrupoEvaluacion,
} from "@/shared/enums/evaluacion_desempenio";
import type { PreguntasEvaluacion } from "../types/preguntas";

// Valores iniciales para el grupo primario (liderazgo)
export const initialValueGrupoPrimEstrategia = {
  id_grupo_evaluacion: GrupoEvaluacion.GrupoPrimario,
  id_evaluador: 0,
  id_evaluado: 0,
  id_enfoque_evaluacion: EnfoqueEvaluacion.Estrategico,
  observaciones: "",
  preguntas: [
    // Preguntas para el ADN de SOMOS PARA NUESTROS CLIENTES
    {
      pregunta:
        "Define e impulsa lineamientos que promuevan relaciones de confianza con clientes clave",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },
    {
      pregunta:
        "Representa a Deliflor con autenticidad y compromiso frente a socios estratégicos",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },
    {
      pregunta:
        "Fomenta la cercanía y la transparencia en la relación con grandes clientes o aliados",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },

    // Preguntas para el ADN de EL QUE SABE, SABE
    {
      pregunta: "Procura el desarrollo de capacidades estratégicas",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },
    {
      pregunta:
        "Lidera iniciativas para mejorar procesos o resultados estratégicos",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },
    {
      pregunta: "Toma decisiones ágiles y fundamentadas con visión de negocio",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },

    // Preguntas para el ADN de UNIDOS SOMOS MÁS PODEROSOS
    {
      pregunta:
        "Fomenta la colaboración entre áreas y equipos para lograr objetivos comunes",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta:
        "Maneja conflictos entre diferentes áreas o procesos con equidad y visión global",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta:
        "Inspira cohesión y sentido de pertenencia en toda la organización",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },

    // Preguntas para el ADN de TODO Y MÁS POR LOS CRISANTEMOS
    {
      pregunta:
        "Hace seguimiento a sus indicadores clave para garantizar resultados",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta:
        "Administra recursos estratégicos de manera responsable y sostenible",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta:
        "Impulsa la disciplina, la calidad y la mejora continua en la organización",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta: "Vela por el cumplimiento del presupuesto de su proceso",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
  ] as PreguntasEvaluacion[],
};
