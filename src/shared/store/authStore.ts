import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import api from "../api/axiosConfig";
import { API_BASE_URL } from "@/config/apiConfig";

interface TokenPayload {
  email: string;
  id_rol: number;
  iat: number;
  exp: number;
}

export interface UserData {
  apellidos: string;
  area: string;
  cantidad_hijos: string;
  cargo: string;
  cedula_jefe: string;
  celular: string;
  ciudad_expedicion: string;
  ciudad_residencia: string;
  codigo_sexo: string;
  correo: string;
  correo_jefe: string;
  dias_vacaciones: number;
  eps: string;
  es_jefe: boolean;
  estado_civil: string;
  estado_empleado: string;
  fecha_ingreso: Date;
  fecha_nacimiento: Date;
  fondo_cesantias: string;
  fondo_pension: string;
  grupo: string;
  hijos: string;
  id_empleado: number;
  medio_transporte: string;
  nickname: string;
  nombre: string;
  nombre_jefe: string;
  nro_documento: string;
  sexo: string;
  tipo_contrato: string;
  tipo_documento: string;
  id_usuario: number | null;
  id_jefe_grupo_colaborativo: number | null;
  jefe_grupo_colaborativo: string | null;
  id_grupo_colaborativo: number | null;
  nombre_grupo_colaborativo: string | null;
  tratamiento: string;
}

interface AuthState {
  token: string | null;
  user: UserData | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  fetchUserData: (token: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (newToken: string) => {
        set({ token: newToken, isAuthenticated: true });
        await get().fetchUserData(newToken);
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },

      fetchUserData: async (tokenToUse: string) => {
        try {
          const decoded = jwtDecode<TokenPayload>(tokenToUse);
          const correo = decoded.email;
          const res = await api.get(
            `${API_BASE_URL}/empleado/empleado-view/correo/${correo}`
          );
          set({ user: res.data });
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
