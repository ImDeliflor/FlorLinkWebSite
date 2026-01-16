import axios from "axios";

const api = axios.create({
  //baseURL: "https://florlinkbackend-eul2.onrender.com",
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  try {
    // Obtener el objeto completo del store persistido
    const storedData = localStorage.getItem("auth-storage");

    if (storedData) {
      const parsed = JSON.parse(storedData);
      const token = parsed?.state?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.error("Error leyendo el token del localStorage:", error);
  }

  return config;
});

export default api;
