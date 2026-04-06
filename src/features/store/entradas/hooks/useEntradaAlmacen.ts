import { useMutation } from "@tanstack/react-query";
import type { UpdateStoreEntry } from "../types/entry";
import api from "@/shared/api/axiosConfig";
import { API_BASE_URL } from "@/config/apiConfig";

export const useUpdateEntradaAlmacen = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateStoreEntry;
    }) => {
      await api.put(`${API_BASE_URL}/entradas-almacen/${id}`, data);
    },
  });
};
