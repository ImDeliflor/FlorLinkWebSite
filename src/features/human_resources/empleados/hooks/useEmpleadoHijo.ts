import { API_BASE_URL } from "@/config/apiConfig";
import api from "@/shared/api/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import type { HijoEmpleado } from "../types/empleadoHijo";

export const useEmpleadoHijo = (id_empleado: number, open: boolean) => {
  return useQuery<HijoEmpleado[]>({
    queryKey: ["hijos", id_empleado],
    queryFn: async () => {
      const { data } = await api.get<HijoEmpleado[]>(
        `${API_BASE_URL}/empleado-hijo/${id_empleado}`,
      );
      return data;
    },
    enabled: open && !!id_empleado,
    staleTime: 1000 * 60 * 60,
  });
};
