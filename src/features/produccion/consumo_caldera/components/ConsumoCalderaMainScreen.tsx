import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es"; // importar el idioma

export const ConsumoCalderaMainScreen = () => {
  // Configuración de fecha, hora y zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  return (
    <div className="flex flex-col gap-4 justify-between bg-[rgb(249,241,245)] h-screen p-2">
      En desarrollo
    </div>
  );
};
