import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  TarifaMensual,
  TarifaMensualReport,
} from "../types/tarifaMensual";
import api from "@/shared/api/axiosConfig";
import { API_BASE_URL } from "@/config/apiConfig";

export const useGetTarifasMensuales = () => {
  return useQuery<TarifaMensualReport[]>({
    queryKey: ["tarifa_mensual"],
    queryFn: async () => {
      const { data } = await api.get<TarifaMensualReport[]>(
        `${API_BASE_URL}/tarifa-mensual/report`,
      );
      return data;
    },
    staleTime: Infinity,
  });
};

export const useCreateNewTarifa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TarifaMensual) => {
      await api.post(`${API_BASE_URL}/tarifa-mensual`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tarifa_mensual"],
      });
    },
    onError: (error) => {
      alert(`Hubo un error en el envío. Valida los datos: ${error}`);
    },
  });
};
