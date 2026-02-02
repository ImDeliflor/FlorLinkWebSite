import {
  ADNDeliflor,
  EnfoqueEvaluacion,
  GrupoEvaluacion,
} from "@/shared/enums/evaluacion_desempenio";
import type { PreguntasEvaluacion } from "../types/preguntas";

// Valores iniciales para el grupo primario (liderazgo)
export const initialValuesJefeToColaborador = {
  id_grupo_evaluacion: GrupoEvaluacion.JefeToColaborador,
  id_evaluador: 0,
  id_evaluado: 0,
  id_enfoque_evaluacion: EnfoqueEvaluacion.General,
  observaciones: "",
  preguntas: [
    // Preguntas para el ADN de SOMOS PARA NUESTROS CLIENTES
    {
      pregunta:
        "Demuestra autenticidad y cercanía al relacionarse con clientes internos o externos",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },
    {
      pregunta: "Fomenta vínculos de confianza siendo honesto y transparente",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },
    {
      pregunta: "Aprende de otros para mejorar su servicio",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },
    {
      pregunta:
        "Comparte y promueve espacios de integración y colaboración con compañeros o clientes",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },
    {
      pregunta:
        "(Para líderes) Promueve en su equipo la construcción de relaciones de confianza con los públicos de interés",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.SomosParaClientes,
    },

    // Preguntas para el ADN de EL QUE SABE, SABE
    {
      pregunta: "Posee y actualiza los conocimientos necesarios para su cargo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },
    {
      pregunta: "Propone ideas para mejorar o transformar procesos",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },
    {
      pregunta: "Actúa con iniciativa y agilidad para resolver problemas",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },
    {
      pregunta:
        "Se asegura de comprender y superar las expectativas del cliente interno o externo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },
    {
      pregunta:
        "(Para líderes) Promueve el desarrollo y el aprendizaje continuo de su equipo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.ElQueSabe,
    },

    // Preguntas para el ADN de UNIDOS SOMOS MÁS PODEROSOS
    {
      pregunta:
        "Actúa con justicia, transparencia y cuidado hacia sus compañeros",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta: "Se comunica con claridad y frecuencia con otros equipos",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta:
        "Participa en conversaciones valientes para resolver conflictos",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta:
        "Contribuye a la mejora de los estándares del equipo para enfrentar retos del entorno",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta:
        "(Para líderes) Escucha de forma receptiva y promueve la colaboración entre equipos",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },
    {
      pregunta:
        "(Para líderes) Facilita conversaciones transparentes para resolver conflictos",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.UnidosMasPoderosos,
    },

    // Preguntas para el ADN de TODO Y MÁS POR LOS CRISANTEMOS
    {
      pregunta:
        "Se reta a sí mismo saliendo de su zona de confort para cumplir metas",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta: "Usa los recursos de forma consciente y disciplinada",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta: "Es diligente, riguroso y consistente en su trabajo",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta:
        "Demuestra autogestión y mantiene altos estándares de calidad y eficiencia",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta:
        "(Para líderes) Define metas retadoras para el equipo y acompaña su cumplimiento",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
    {
      pregunta:
        "(Para líderes) Provee recursos adecuados y hace seguimiento para asegurar resultados",
      calificacion: "",
      fecha: "",
      id_adn: ADNDeliflor.TodoYMas,
    },
  ] as PreguntasEvaluacion[],
};
