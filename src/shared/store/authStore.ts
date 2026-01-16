import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import api from "../api/axiosConfig";
import { API_BASE_URL } from "@/config/apiConfig";

interface TokenPayload {
  email: string;
  roles: number[];
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
  roles: {
    id_rol: number;
    nombre_rol: string;
  }[];
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
  logout: (message?: string) => void;
  fetchUserData: (token: string) => Promise<void>;
  checkToken: () => boolean;
  hasRole: (roleId: number) => boolean;
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

      logout: (message?: string) => {
        if (message) {
          alert(message);
        }

        set({ token: null, user: null, isAuthenticated: false });
      },

      checkToken: () => {
        const token = get().token;
        if (!token) return false;

        try {
          const decoded = jwtDecode<TokenPayload>(token);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decoded.exp < currentTime) {
            get().logout("Tu sesión ha expirado...");
            return false;
          }

          // Si el token es válido pero no se ha cargado el user (por persist)
          if (!get().user) {
            get().fetchUserData(token);
          }

          return true;
        } catch (error) {
          console.error("Error al validar token:", error);
          get().logout();
          return false;
        }
      },

      fetchUserData: async (tokenToUse: string) => {
        try {
          const decoded = jwtDecode<TokenPayload>(tokenToUse);
          const correo = decoded.email;
          const res = await api.get(
            `${API_BASE_URL}/empleado/empleado-view/correo/${correo}`
          );
          console.log(res.data);
          set({ user: res.data });
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      },

      hasRole: (roleId: number) => {
        const user = get().user;
        if (!user?.roles) return false;
        return user.roles.some((r) => r.id_rol === roleId);
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
