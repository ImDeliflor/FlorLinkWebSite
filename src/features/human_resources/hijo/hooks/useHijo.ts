import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProcessHijo } from "../types/processHijo";
import api from "@/shared/api/axiosConfig";
import { API_BASE_URL } from "@/config/apiConfig";

export const useProcessHijo = (resetForm?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProcessHijo) => {
      await api.post(`${API_BASE_URL}/hijo/process-hijo`, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["hijos", variables.id_empleado],
      });
      resetForm?.();
    },
    onError: (error) => {
      alert(`Error guardando el hijo, vuelve a intentarlo: ${error} `);
    },
  });
};
