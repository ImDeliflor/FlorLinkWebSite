import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export const useGlobalData = () => {
  // Configuración de la zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  const dateSpanish = dayjs().format("DD [de] MMMM, YYYY");

  return { dateSpanish };
};
