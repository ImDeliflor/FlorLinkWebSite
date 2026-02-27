import { useState } from "react";
import { API_BASE_URL } from "@/config/apiConfig";
import api from "@/shared/api/axiosConfig";
import { LS_KEYS } from "../constants";

import type {
  Categorias,
  CentroCostos,
  Laboratorio,
  TipoDocumento,
  Ciudad,
  Cargo,
  Area,
  Sexo,
  EstadoCivil,
  Eps,
  FondoPensiones,
  FondoCesantias,
  MedioTransporte,
  TipoContrato,
  RolFamiliar,
  AreaProduccion,
} from "../types/basicTables";

export const useBasicTables = () => {
  const [categorias, setCategorias] = useState<Categorias>([]);
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);
  const [centroCostos, setCentroCostos] = useState<CentroCostos[]>([]);
  const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([]);
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [sexos, setSexos] = useState<Sexo[]>([]);
  const [estadosCiviles, setEstadosCiviles] = useState<EstadoCivil[]>([]);
  const [eps, setEps] = useState<Eps[]>([]);
  const [fondosPensiones, setFondosPensiones] = useState<FondoPensiones[]>([]);
  const [fondosCesantias, setFondosCesantias] = useState<FondoCesantias[]>([]);
  const [mediosTransporte, setMediosTransporte] = useState<MedioTransporte[]>(
    [],
  );
  const [tiposContrato, setTiposContrato] = useState<TipoContrato[]>([]);
  const [rolFamiliar, setRolFamiliar] = useState<RolFamiliar[]>([]);
  const [areaProduccion, setAreaProduccion] = useState<AreaProduccion[]>([]);

  /* ===================== HELPER ===================== */
  const fetchBasicTable = async <T>(
    url: string,
    lsKey: string,
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    forceReload = false,
  ) => {
    if (!forceReload) {
      const cached = localStorage.getItem(lsKey);
      if (cached) {
        setter(JSON.parse(cached));
        return;
      }
    }

    const response = await api.get(`${API_BASE_URL}${url}`);
    setter(response.data);
    localStorage.setItem(lsKey, JSON.stringify(response.data));
  };

  /* ===================== FUNCIONES ===================== */

  const getCategorias = (forceReload = false) =>
    fetchBasicTable(
      "/categoria",
      LS_KEYS.CATEGORIAS,
      setCategorias,
      forceReload,
    );

  const getLaboratorios = (forceReload = false) =>
    fetchBasicTable(
      "/laboratorio",
      LS_KEYS.LABORATORIOS,
      setLaboratorios,
      forceReload,
    );

  const getCentroCostos = (forceReload = false) =>
    fetchBasicTable(
      "/centro-costos",
      LS_KEYS.CENTRO_COSTOS,
      setCentroCostos,
      forceReload,
    );

  const getTiposDocumento = (forceReload = false) =>
    fetchBasicTable(
      "/tipo-documento",
      LS_KEYS.TIPO_DOCUMENTO,
      setTiposDocumento,
      forceReload,
    );

  const getCiudades = (forceReload = false) =>
    fetchBasicTable("/ciudad", LS_KEYS.CIUDAD, setCiudades, forceReload);

  const getCargos = (forceReload = false) =>
    fetchBasicTable("/cargo", LS_KEYS.CARGO, setCargos, forceReload);

  const getAreas = (forceReload = false) =>
    fetchBasicTable("/area", LS_KEYS.AREA, setAreas, forceReload);

  const getSexos = (forceReload = false) =>
    fetchBasicTable("/sexo", LS_KEYS.SEXO, setSexos, forceReload);

  const getEstadosCiviles = (forceReload = false) =>
    fetchBasicTable(
      "/estado-civil",
      LS_KEYS.ESTADO_CIVIL,
      setEstadosCiviles,
      forceReload,
    );

  const getEps = (forceReload = false) =>
    fetchBasicTable("/eps", LS_KEYS.EPS, setEps, forceReload);

  const getFondosPensiones = (forceReload = false) =>
    fetchBasicTable(
      "/fondo-pensiones",
      LS_KEYS.FONDO_PENSIONES,
      setFondosPensiones,
      forceReload,
    );

  const getFondosCesantias = (forceReload = false) =>
    fetchBasicTable(
      "/fondo-cesantias",
      LS_KEYS.FONDO_CESANTIAS,
      setFondosCesantias,
      forceReload,
    );

  const getMediosTransporte = (forceReload = false) =>
    fetchBasicTable(
      "/medio-transporte",
      LS_KEYS.MEDIO_TRANSPORTE,
      setMediosTransporte,
      forceReload,
    );

  const getTiposContrato = (forceReload = false) =>
    fetchBasicTable(
      "/tipo-contrato",
      LS_KEYS.TIPO_CONTRATO,
      setTiposContrato,
      forceReload,
    );

  const getRolesFamiliar = (forceReload = false) =>
    fetchBasicTable(
      "/rol-familiar",
      LS_KEYS.ROL_FAMILIAR,
      setRolFamiliar,
      forceReload,
    );

  const getAreasProduccion = (forceReload = false) =>
    fetchBasicTable(
      "/area-produccion",
      LS_KEYS.AREA_PRODUCCION,
      setAreaProduccion,
      forceReload,
    );

  return {
    categorias,
    getCategorias,
    laboratorios,
    getLaboratorios,
    centroCostos,
    getCentroCostos,
    tiposDocumento,
    getTiposDocumento,
    ciudades,
    getCiudades,
    cargos,
    getCargos,
    areas,
    getAreas,
    sexos,
    getSexos,
    estadosCiviles,
    getEstadosCiviles,
    eps,
    getEps,
    fondosPensiones,
    getFondosPensiones,
    fondosCesantias,
    getFondosCesantias,
    mediosTransporte,
    getMediosTransporte,
    tiposContrato,
    getTiposContrato,
    rolFamiliar,
    getRolesFamiliar,
    areaProduccion,
    getAreasProduccion,
  };
};
