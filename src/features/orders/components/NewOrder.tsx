/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/es"; // importar el idioma
import { MdOutlineNoteAdd } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import Rules from "./rules/Rules";
import { BsSendPlus } from "react-icons/bs";
import { useOrderContext } from "../hooks/useOrderContext";
import { FormProduct } from "@/features/products/components/FormProduct";
import { useGlobalDataContext } from "@/shared/hooks/useGlobalDataContext";
import { useEffect } from "react";
import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";
import { useAuthStore } from "@/shared/store/authStore";

export const NewOrder = () => {
  // Configuración de la zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // Contexto global del usuario logeado
  const { user } = useAuthStore();

  // OrderContext -> data y funciones correspondientes a las órdenes
  const {
    arrayProducts,
    addProduct,
    order,
    removeProduct,
    onChangeOrder,
    handlerSubmitOrder,
    disabledButton,
  } = useOrderContext();

  const { dateSpanish } = useGlobalDataContext();

  // Contexto de las tablas básicas (categoría)
  const { getCategorias } = useBasicTablesContext();

  // useEffect para traer las categorías
  useEffect(() => {
    getCategorias();
  }, []);

  return (
    <div className="flex flex-col justify-between bg-[rgb(249,241,245)] h-screen p-2">
      <div className="flex items-center justify-between min-h-[10%] min-w-full bg-white px-5 rounded-[0.7rem]">
        <div className="flex items-center justify-center">
          <MdOutlineNoteAdd size={35} color="#484848" />
          <span className="ml-4 text-3xl text-[#484848] font-bold">
            Crear orden de compra
          </span>
        </div>
        <Rules />
      </div>

      <div className="flex items-center justify-around min-h-[10%] min-w-full bg-[#82385D] px-5 rounded-[0.7rem]">
        <div className="flex items-center justify-center">
          <span className="ml-4 text-xl text-white font-medium">
            Área solicitante
          </span>
          <span className="ml-6 text-xl text-[#484848] font-medium bg-white px-6 py-3 rounded-xl">
            {user?.nombre_grupo_colaborativo}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <span className="ml-4 text-xl text-white font-medium ">Fecha</span>
          <span className="ml-6 text-xl text-[#484848] font-medium bg-white px-6 py-3 rounded-xl">
            {dateSpanish}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center min-h-[50%] max-h-[50%] min-w-full bg-white p-5 rounded-[0.7rem]">
        <h2 className="text-2xl text-[#484848] font-medium mb-5">
          Listado de productos
        </h2>
        <div className="flex flex-col items-center gap-y-4 mt-5 mb-5 max-h-[60%] min-h-[40%] w-full overflow-y-auto">
          {arrayProducts.map((_valor, index) => (
            <FormProduct _valor={_valor} index={index} key={index} />
          ))}
        </div>
        <div className="flex items-center justify-center mt-8">
          <CiTrash
            className="cursor-pointer"
            size={40}
            color="#82385D"
            onClick={() => removeProduct()}
          />
          <IoIosAddCircleOutline
            className="cursor-pointer"
            size={40}
            color="#82385D"
            onClick={addProduct}
          />
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[20%] min-w-full bg-white p-3 rounded-[0.7rem]">
        <div className="flex items-center justify-center h-full w-[30%]">
          <textarea
            className="border-1 border-[#9D9D9D] h-[100%] w-[100%] p-2 resize-none rounded-xl"
            placeholder="Observaciones"
            value={order.observaciones}
            onChange={(e) => onChangeOrder("observaciones", e.target.value)}
          />
        </div>

        <div className="flex flex-col h-full w-[50%] ">
          <span className=" text-xl text-[#B4B4B4] font-medium w-[100%] h-[30%] py-4 px-7">
            Solicitado por:
          </span>
          <span className="flex flex-1 text-3xl text-[#484848] font-bold p-4 justify-center">
            {user?.nombre} {user?.apellidos}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center h-full w-[20%] ">
          <button
            className="flex items-center justify-center bg-[#82385D] text-xl font-medium text-[#E8B7BA] h-auto cursor-pointer py-3 px-6 rounded-xl"
            onClick={handlerSubmitOrder}
            disabled={disabledButton}
          >
            <BsSendPlus className="mr-4" size={25} color="#E8B7BA" />
            Solicitar
          </button>
        </div>
      </div>
    </div>
  );
};
