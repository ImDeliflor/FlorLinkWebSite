import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { Button } from "@/components/ui/button";
import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";
import { medidas } from "@/shared/data/selectOptions";
import { BsCartCheck, BsCartDash } from "react-icons/bs";
import { FaRegCheckCircle } from "react-icons/fa";
import {
  MdDeleteOutline,
  MdOutlineCancel,
  MdOutlinePending,
} from "react-icons/md";
import { useProductContext } from "../hooks/useProductContext";

interface FormEditProductProps {
  id_detalle_compra?: number;
  id_categoria: number;
  descripcion_producto: string;
  unidad_medida: string;
  cantidad_solicitada: number;
  estado_detalle_compra?: string;
  index_producto: number;
  updateFilteredProduct: (
    index: number,
    key: string,
    value: string | number
  ) => void;
  is_jefe?: boolean;
  is_gerencia?: boolean;
  canChangeState?: boolean;
  canEdit?: boolean;
}

export const FormEditProduct = ({
  id_categoria,
  descripcion_producto,
  unidad_medida,
  cantidad_solicitada,
  index_producto,
  updateFilteredProduct,
  is_jefe = false,
  estado_detalle_compra = "",
  id_detalle_compra = 0,
  is_gerencia = false,
  canChangeState = true,
  canEdit = true,
}: FormEditProductProps) => {
  // Configuración de la zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // Contexto de las tablas básicas
  const { categorias } = useBasicTablesContext();

  // Contexto de useProduct
  const { setDetailProductState, deleteProduct } = useProductContext();

  return (
    <div className="flex items-center justify-around h-full w-full my-3 ">
      {estado_detalle_compra && (
        <>
          <label
            htmlFor=""
            className={`
            ${
              estado_detalle_compra === "Pendiente"
                ? "bg-[#E9B44C] text-[#ffff]"
                : estado_detalle_compra === "Aprobado"
                ? "bg-[#3FA271] text-[#ffff]"
                : "bg-[#D64550] text-[#ffff]"
            } py-1.5 px-2 rounded-xl
            `}
          >
            {estado_detalle_compra === "Pendiente" ? (
              <MdOutlinePending />
            ) : estado_detalle_compra === "Aprobado" ? (
              <FaRegCheckCircle />
            ) : (
              <MdOutlineCancel />
            )}
          </label>
        </>
      )}
      <select
        id="default"
        className="bg-gray-50 w-[15%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6"
        value={id_categoria}
        onChange={(e) =>
          updateFilteredProduct(
            index_producto,
            "id_categoria",
            Number(e.target.value)
          )
        }
        disabled={(is_jefe || is_gerencia) && true}
      >
        {[...categorias]
          .sort((a, b) =>
            a.nombre_categoria_producto.localeCompare(
              b.nombre_categoria_producto
            )
          )
          .map((_valor, index) => (
            <option key={index} value={_valor.id_categoria_producto}>
              {_valor.nombre_categoria_producto}
            </option>
          ))}
      </select>
      <textarea
        className="w-[30%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
        placeholder="Descripción (nombre, referencia, marca, etc)"
        value={descripcion_producto}
        onChange={(e) =>
          updateFilteredProduct(
            index_producto,
            "descripcion_producto",
            e.target.value
          )
        }
        disabled={is_jefe || (is_gerencia && true)}
        name=""
        id=""
      />
      <select
        id="default"
        className="bg-gray-50 w-[15%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6 "
        value={unidad_medida}
        onChange={(e) =>
          updateFilteredProduct(index_producto, "unidad_medida", e.target.value)
        }
        disabled={is_jefe || (is_gerencia && true)}
      >
        {[...medidas]
          .sort((a, b) => a.localeCompare(b))
          .map((_valor, index) => (
            <option key={index} value={_valor}>
              {_valor}
            </option>
          ))}
      </select>
      <input
        className=" w-[15%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
        type="number"
        placeholder="Cantidad"
        value={cantidad_solicitada}
        onChange={(e) =>
          updateFilteredProduct(
            index_producto,
            "cantidad_solicitada",
            Number(e.target.value)
          )
        }
        disabled={(is_jefe || is_gerencia) && true}
      />
      {is_jefe || is_gerencia || (
        <Button
          onClick={() => deleteProduct(id_detalle_compra)}
          disabled={canEdit ? false : true}
          className="bg-[#D64550] text-[#ffff] hover:text-[#ffff] hover:bg-[#ab2d37] cursor-pointer px-10"
        >
          <MdDeleteOutline />
          Eliminar
        </Button>
      )}
      {is_jefe && canChangeState && (
        <>
          <Button
            onClick={() =>
              setDetailProductState({
                id_detalle_compra,
                estado_detalle_compra: "Aprobado",
                fecha_validacion_detalle_compra: dayjs().format(
                  "YYYY-MM-DD HH:mm:ss"
                ),
              })
            }
            className="bg-[#3FA271] text-[#ffff] hover:text-[#ffff] hover:bg-[#2f8a5d] cursor-pointer px-10"
          >
            <BsCartCheck />
            Aprobar
          </Button>
          <Button
            onClick={() =>
              setDetailProductState({
                id_detalle_compra,
                estado_detalle_compra: "Rechazado",
                fecha_validacion_detalle_compra: dayjs().format(
                  "YYYY-MM-DD HH:mm:ss"
                ),
              })
            }
            className="bg-[#D64550] text-[#ffff] hover:text-[#ffff] hover:bg-[#ab2d37] cursor-pointer px-10"
          >
            <BsCartDash />
            Rechazar
          </Button>
        </>
      )}
    </div>
  );
};
