/* eslint-disable react-hooks/exhaustive-deps */
import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";
import { useAuthStore } from "@/shared/store/authStore";
import { useEffect } from "react";

export const MainPage = () => {
  const { user } = useAuthStore();

  // Contexto de las tablas básicas
  const {
    getTiposDocumento,
    getCiudades,
    getCargos,
    getAreas,
    getSexos,
    getEstadosCiviles,
    getEps,
    getFondosPensiones,
    getFondosCesantias,
    getMediosTransporte,
    getTiposContrato,
    getCentroCostos,
    getAreasProduccion,
  } = useBasicTablesContext();

  // useEffect para traer las tablas básicas
  useEffect(() => {
    getTiposDocumento(true);
    getCiudades(true);
    getCargos(true);
    getAreas(true);
    getSexos(true);
    getEstadosCiviles(true);
    getEps(true);
    getFondosPensiones(true);
    getFondosCesantias(true);
    getMediosTransporte(true);
    getTiposContrato(true);
    getCentroCostos(true);
    getAreasProduccion(true);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-center min-h-screen">
      <span className="text-2xl lg:text-6xl text-[#81194d82] font-normal">
        Hola {user?.nickname}!{" "}
        {user?.codigo_sexo === "M" ? "Bienvenido" : "Bienvenida"} a
      </span>
      <span className="text-7xl lg:text-9xl text-[#81194D] font-bold">
        FlorLink
      </span>
    </div>
  );
};
