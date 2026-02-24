import { API_BASE_URL } from "@/config/apiConfig";
import api from "@/shared/api/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  EmpleadoCentroCostos,
  EmpleadoCentroCostosReport,
} from "../types/empleadoCentroCostos";

// Función para traer todos los centros de costos
export const useGetCentroCostos = (id_empleado: number, open: boolean) => {
  return useQuery<EmpleadoCentroCostosReport[]>({
    queryKey: ["centro_costos", id_empleado],
    queryFn: async () => {
      const { data } = await api.get<EmpleadoCentroCostosReport[]>(
        `${API_BASE_URL}/empleado-centro-costos/report-empleado/${id_empleado}`,
      );
      return data;
    },
    enabled: open && !!id_empleado,
    staleTime: 1000 * 60 * 60 * 2,
  });
};

// Función para asignar un centro de costos a un empleado
export const useAssignCentroCostos = (resetForm?: () => void) => {
  const queryClient = useQueryClient();

  // Función para el post
  return useMutation({
    mutationFn: async (data: EmpleadoCentroCostos) => {
      await api.post(`${API_BASE_URL}/empleado-centro-costos`, data);
    },
    // En caso de que se envíe correctamente
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["centro_costos", variables.id_empleado],
      });
      resetForm?.();
    },
    // En caso de error
    onError: (error) => {
      alert(
        `Error guardando el centro de costos, vuelve a intentarlo: ${error} `,
      );
    },
  });
};
