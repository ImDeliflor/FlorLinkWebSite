import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/es";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale("es");
dayjs.tz.setDefault("America/Bogota");

export default dayjs;
