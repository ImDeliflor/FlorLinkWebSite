import { useQuery } from "@tanstack/react-query";
import type { Empleado } from "../types/employee";
import api from "@/shared/api/axiosConfig";
import { API_BASE_URL } from "@/config/apiConfig";

export const useGetEmpleado = () => {
  return useQuery<Empleado[]>({
    queryKey: ["empleados"],
    queryFn: async () => {
      const { data } = await api.get<Empleado[]>(`${API_BASE_URL}/empleado`);
      return data;
    },
    staleTime: 1000 * 60 * 60 * 2,
  });
};
