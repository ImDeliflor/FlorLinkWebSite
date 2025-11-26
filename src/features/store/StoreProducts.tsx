import { medidas } from "@/shared/data/selectOptions";
import "dayjs/locale/es"; // importar el idioma
import { useState } from "react";
// import { useAuthStore } from "@/shared/store/authStore";
import { BiStore } from "react-icons/bi";
import { useBasicTablesContext } from "../basic_tables/hooks/useBasicTablesContext";

export const StoreProducts = () => {
  // Contexto global del usuario logeado
  //   const { user } = useAuthStore();

  // Contexto de las tablas básicas
  const { categorias } = useBasicTablesContext();

  const [storeProduct, setStoreProduct] = useState({
    categoria: 1,
    descripcion: "",
    unidad_medida: "",
  });

  return (
    <div className="flex flex-col justify-between bg-[rgb(249,241,245)] h-screen p-2">
      <div className="flex items-center justify-between min-h-[10%] min-w-full bg-white px-5 rounded-[0.7rem]">
        <div className="flex items-center justify-center">
          <BiStore size={35} color="#484848" />
          <span className="ml-4 text-3xl text-[#484848] font-bold">
            Productos de almacén de inventario
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-around min-h-[30%] max-h-[30%] min-w-full bg-white p-5 rounded-[0.7rem]">
        <span className="text-xl text-[#484848] font-bold">
          Registrar producto
        </span>
        <div className="flex justify-around w-[100%]">
          <select
            id="default"
            className="bg-gray-50 w-[20%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6"
            value={storeProduct.categoria}
            onChange={(e) =>
              setStoreProduct((prev) => ({
                ...prev,
                categoria: Number(e.target.value),
              }))
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
            className="w-[50%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
            type="text"
            placeholder="Descripción (nombre, referencia, marca, etc)"
            name=""
            id=""
            onChange={(e) =>
              setStoreProduct((prev) => ({
                ...prev,
                descripcion: e.target.value,
              }))
            }
            defaultValue={storeProduct.descripcion}
          />
          <select
            id="default"
            className="bg-gray-50 w-[20%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6 "
            value={storeProduct.unidad_medida}
            onChange={(e) =>
              setStoreProduct((prev) => ({
                ...prev,
                unidad_medida: e.target.value,
              }))
            }
          >
            {[...medidas]
              .sort((a, b) => a.localeCompare(b))
              .map((_valor) => (
                <option value={_valor}>{_valor}</option>
              ))}
          </select>
        </div>
        <button className="flex items-center justify-center bg-[#82385D] text-[1rem] font-medium text-[#E8B7BA] h-auto cursor-pointer py-2 px-8 rounded-xl">
          Registrar
        </button>
      </div>

      <div className="flex flex-col items-center min-h-[55%] max-h-[55%] min-w-full bg-white p-5 rounded-[0.7rem]">
        <table className="table-fixed min-w-full max-w-full border border-gray-200 rounded-lg shadow-sm text-sm text-left">
          <thead className="bg-[#E8B7BA] text-white">
            <tr>
              <th className="px-4 py-3">Cod Producto</th>
              <th className="px-4 py-3">Abreviación Categoria</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Descripción</th>
              <th className="px-4 py-3">Unidad de medida</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">100</td>
              <td className="px-4 py-2">AC</td>
              <td className="px-4 py-2">Elemento de protección personal</td>
              <td className="px-4 py-2">Guante industrial calibre 35</td>
              <td className="px-4 py-2">Unidades</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
