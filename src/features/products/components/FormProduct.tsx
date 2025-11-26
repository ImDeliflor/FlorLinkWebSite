import { useOrderContext } from "@/features/orders/hooks/useOrderContext";
import type { Product } from "../types/product";
import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";
import { medidas } from "@/shared/data/selectOptions";

// Props que va pasar el padre del componente
type FormProductProps = {
  _valor: Product;
  index: number;
};

export const FormProduct = ({ _valor, index }: FormProductProps) => {
  // Contexto de las órdenes
  const { onChangeSelect } = useOrderContext();

  // Contexto de las tablas básicas
  const { categorias } = useBasicTablesContext();

  return (
    <div
      key={index}
      className="flex items-center justify-around h-full w-full my-3"
    >
      <select
        id="default"
        className="bg-gray-50 w-[15%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6"
        onChange={(e) =>
          onChangeSelect(index, "id_categoria", Number(e.target.value))
        }
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
      <input
        className="w-[45%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
        type="text"
        placeholder="Descripción (nombre, referencia, marca, etc)"
        name=""
        id=""
        onChange={(e) =>
          onChangeSelect(index, "descripcion_producto", e.target.value)
        }
        defaultValue={_valor.descripcion_producto}
      />
      <select
        id="default"
        className="bg-gray-50 w-[15%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6 "
        onChange={(e) => onChangeSelect(index, "unidad_medida", e.target.value)}
      >
        {[...medidas]
          .sort((a, b) => a.localeCompare(b))
          .map((_valor) => (
            <option value={_valor}>{_valor}</option>
          ))}
      </select>
      <input
        className=" w-[15%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
        type="number"
        placeholder="Cantidad"
        name=""
        id=""
        onChange={(e) =>
          onChangeSelect(index, "cantidad_solicitada", Number(e.target.value))
        }
      />
    </div>
  );
};
