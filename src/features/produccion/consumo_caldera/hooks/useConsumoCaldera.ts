import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ConsumoCaldera,
  ConsumoCalderaReport,
  UpdateConsumoCaldera,
} from "../types/consumoCaldera";
import api from "@/shared/api/axiosConfig";
import { API_BASE_URL } from "@/config/apiConfig";
import Swal from "sweetalert2";

/* Types del hook */
type UpdateConsumoPayload = {
  id_consumo: number;
  data: UpdateConsumoCaldera;
};

export const useGetReportConsumoCaldera = () => {
  return useQuery<ConsumoCalderaReport[]>({
    queryKey: ["consumo_caldera"],
    queryFn: async () => {
      const { data } = await api.get<ConsumoCalderaReport[]>(
        `${API_BASE_URL}/consumo-caldera/report`,
      );
      return data;
    },
    staleTime: 1000 * 60 * 60 * 3,
  });
};

export const useGetConsumosPendientesByUser = (id_empleado: number) => {
  return useQuery<ConsumoCalderaReport[]>({
    queryKey: ["consumo_pendiente_cierre"],
    queryFn: async () => {
      const { data } = await api.get<ConsumoCalderaReport[]>(
        `${API_BASE_URL}/consumo-caldera/pending-register/${id_empleado}`,
      );
      return data;
    },
    staleTime: 1000 * 60 * 60 * 3,
  });
};

export const useSaveNewConsumo = (
  closeForm?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ConsumoCaldera) => {
      await api.post(`${API_BASE_URL}/consumo-caldera`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["consumo_caldera"],
      });
      queryClient.invalidateQueries({
        queryKey: ["consumo_pendiente_cierre"],
      });
      closeForm?.(false);
    },
    onError: (error) => {
      alert(`Error guardando el consumo, vuelve a intentarlo: ${error} `);
    },
  });
};

export const useEditPendingConsumo = (resetForm?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id_consumo, data }: UpdateConsumoPayload) => {
      await api.put(`${API_BASE_URL}/consumo-caldera/${id_consumo}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["consumo_caldera"],
      });
      queryClient.invalidateQueries({
        queryKey: ["consumo_pendiente_cierre"],
      });
      Swal.fire({
        icon: "success",
        title: `¡Consumo cerrado exitosamente!`,
        confirmButtonColor: "#82385D",
      });
      resetForm?.();
    },
    onError: (error) => {
      alert(`Error cerrando el consumo, vuelve a intentarlo: ${error} `);
    },
  });
};
