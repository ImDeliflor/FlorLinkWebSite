import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CostoFijo, CostoFijoReport } from "../types/costoFijo";
import api from "@/shared/api/axiosConfig";
import { API_BASE_URL } from "@/config/apiConfig";

export const useGetCostoFijo = () => {
  return useQuery<CostoFijoReport[]>({
    queryKey: ["costos_fijos"],
    queryFn: async () => {
      const { data } = await api.get<CostoFijoReport[]>(
        `${API_BASE_URL}/costos-fijos/report`,
      );
      console.log(data);
      return data;
    },
    staleTime: Infinity,
  });
};

export const useCreateNewCosto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CostoFijo) => {
      await api.post(`${API_BASE_URL}/costos-fijos`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["costos_fijos"],
      });
    },
    onError: (error) => {
      alert(`Hubo un error en el envío. Valida los datos: ${error}`);
    },
  });
};
