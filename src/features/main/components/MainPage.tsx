import { useAuthStore } from "@/shared/store/authStore";

export const MainPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col justify-center items-center text-center min-h-full">
      <span className="text-6xl text-[#81194d82] font-normal">
        Hola {user?.nickname}!{" "}
        {user?.codigo_sexo === "M" ? "Bienvenido" : "Bienvenida"} a
      </span>
      <span className="text-9xl text-[#81194D] font-bold">FlorLink</span>
    </div>
  );
};
