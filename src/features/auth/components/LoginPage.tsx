import styles from "./LoginPage.module.scss";
import { CiLogin } from "react-icons/ci";
import portada_login from "../../../assets/portada_login.jpg";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config/apiConfig";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/shared/store/authStore";

interface FormData {
  email: string;
  password_hash: string;
}

export const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password_hash: "",
  });

  const { login } = useAuthStore();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
      const token = response.data.token;

      // Guardar el token en el contexto
      await login(token);

      navigate("/", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 401) {
          alert(message);
        } else {
          alert(message || "Error desconocido");
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center lg:flex-row w-screen min-h-screen">
      {/* LOGIN */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <div className="flex flex-col w-full max-w-md">
          <h3 className="border-4 border-[#82385D] border-l-0 border-r-0 px-8 py-3 text-xl font-bold rounded-4xl mb-10 text-center">
            Inicio de Sesión
          </h3>

          <input
            type="text"
            className={styles.input_with_icon}
            placeholder="Usuario"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            className={styles.input_with_icon}
            placeholder="Contraseña"
            value={formData.password_hash}
            onChange={(e) =>
              setFormData({ ...formData, password_hash: e.target.value })
            }
          />

          <button
            className="flex items-center justify-center bg-[#E8B7BA] text-[15px] font-medium text-[#82385D] py-3 px-6 rounded-xl mt-5 cursor-pointer"
            onClick={handleLogin}
          >
            <CiLogin className="mr-4" size={20} color="#82385D" />
            Ingresar
          </button>
        </div>
      </div>

      {/* IMAGEN */}
      <img
        src={portada_login}
        className="hidden lg:block md:w-1/2 object-cover p-3 rounded-4xl"
      />
    </div>
  );
};
