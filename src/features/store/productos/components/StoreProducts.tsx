/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { medidas } from "@/shared/data/selectOptions";
import "dayjs/locale/es"; // importar el idioma
import { useEffect, useState } from "react";
// import { useAuthStore } from "@/shared/store/authStore";
import { useBasicTablesContext } from "../../../basic_tables/hooks/useBasicTablesContext";
import { useStoreProductsContext } from "../hooks/useStoreProductsContext";
import { type StoreProduct } from "../types/storeProduct";
import { BiStore } from "react-icons/bi";
import type { FormFilterInventory } from "../../inventario/types/storeInventory";
import { FiRefreshCcw } from "react-icons/fi";
import { filterProducts } from "../utils/productFilters";
import { initialFilteredFormProduct } from "../../utils/initialValues";
import ModalProductEntry from "../../entradas/components/modals/ModalProductEntry";
import { useProtectedElement } from "@/shared/hooks/useProtectedElement";
import { IndividualPrivileges } from "@/shared/config/permissions";

export const StoreProducts = () => {
  // Configuración de fecha, hora y zona horaria
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale("es");

  // Contexto global del usuario logeado
  //   const { user } = useAuthStore();

  // Contexto de almacén-productos
  const { productos, getStoreProducts, saveStoreProduct } =
    useStoreProductsContext();

  // Contexto de las tablas básicas
  const { categorias, getCategorias } = useBasicTablesContext();

  const { canAccess } = useProtectedElement();

  const [storeProduct, setStoreProduct] = useState<StoreProduct>({
    id_categoria: 27,
    descripcion: "",
    unidad_medida: "",
    fecha_registro: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  });

  const resetFormStoreProduct = () => {
    setStoreProduct({
      id_categoria: 27,
      descripcion: "",
      unidad_medida: "",
      fecha_registro: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    });
  };

  const handlerSaveStoreProduct = async () => {
    await saveStoreProduct(storeProduct);
    await getStoreProducts();
    resetFormStoreProduct();
  };

  // useEffect para traer las categorías
  useEffect(() => {
    getCategorias();
    getStoreProducts();
  }, []);

  // Funciones para el filtrado de los productos
  const [formFilter, setFormFilter] = useState<FormFilterInventory>(
    initialFilteredFormProduct,
  );

  // Función para filtrar los productos
  const filteredProducts = filterProducts(productos, formFilter);

  // Función para borrar filtros
  const resetFilters = () => {
    setFormFilter(initialFilteredFormProduct);
  };

  return (
    <div className="flex flex-col gap-4 justify-between bg-[rgb(249,241,245)] h-screen p-2">
      <div className="flex items-center justify-between min-h-[10%] min-w-full bg-white px-5 rounded-[0.7rem]">
        <div className="flex w-[100%]">
          <div className="flex justify-start w-[40%]">
            <BiStore size={35} color="#484848" />
            <span className="ml-4 text-3xl text-[#484848] font-bold">
              Productos de almacén
            </span>
          </div>
          <div className="flex flex-1 justify-around">
            {/* <input
                      className="w-[10%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
                      type="text"
                      placeholder="Código"
                      name=""
                      id=""
                      onChange={(e) =>
                        setFormFilter((prev) => ({
                          ...prev,
                          codigo: e.target.value,
                        }))
                      }
                      defaultValue={formFilter.codigo}
                    /> */}
            <select
              id="default"
              className="bg-gray-50 w-[20%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6"
              value={formFilter.categoria}
              onChange={(e) =>
                setFormFilter((prev) => ({
                  ...prev,
                  categoria: e.target.value,
                }))
              }
            >
              <option value="Todas">Todas</option>
              {[...categorias]
                .sort((a, b) =>
                  a.nombre_categoria_producto.localeCompare(
                    b.nombre_categoria_producto,
                  ),
                )
                .map((_valor, index) => (
                  <option key={index} value={_valor.nombre_categoria_producto}>
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
                setFormFilter((prev) => ({
                  ...prev,
                  descripcion: e.target.value,
                }))
              }
              value={formFilter.descripcion}
            />
            <select
              id="default"
              className="bg-gray-50 w-[20%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6 "
              value={formFilter.unidad_medida}
              onChange={(e) =>
                setFormFilter((prev) => ({
                  ...prev,
                  unidad_medida: e.target.value,
                }))
              }
            >
              <option value="Todas">Todas</option>
              {[...medidas]
                .sort((a, b) => a.localeCompare(b))
                .map((_valor) => (
                  <option key={_valor} value={_valor}>
                    {_valor}
                  </option>
                ))}
            </select>
            <button
              className="flex items-center justify-center bg-[#82385D] text-[1rem] font-medium text-[#E8B7BA] h-auto cursor-pointer py-2 px-8 rounded-xl"
              onClick={resetFilters}
            >
              <FiRefreshCcw />
            </button>
          </div>
        </div>
      </div>

      {canAccess(IndividualPrivileges.almacen.crearNuevoProducto) && (
        <div className="flex flex-col items-center justify-around min-h-[30%] max-h-[30%] min-w-full bg-white p-5 rounded-[0.7rem]">
          <span className="text-xl text-[#484848] font-bold">
            Registrar producto
          </span>
          <div className="flex justify-around w-[100%]">
            <select
              id="default"
              className="bg-gray-50 w-[20%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6"
              value={storeProduct.id_categoria}
              onChange={(e) =>
                setStoreProduct((prev) => ({
                  ...prev,
                  id_categoria: Number(e.target.value),
                }))
              }
            >
              {[...categorias]
                .sort((a, b) =>
                  a.nombre_categoria_producto.localeCompare(
                    b.nombre_categoria_producto,
                  ),
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
                  <option key={_valor} value={_valor}>
                    {_valor}
                  </option>
                ))}
            </select>
          </div>
          <button
            className="flex items-center justify-center bg-[#82385D] text-[1rem] font-medium text-[#E8B7BA] h-auto cursor-pointer py-2 px-8 rounded-xl"
            onClick={handlerSaveStoreProduct}
          >
            Registrar
          </button>
        </div>
      )}

      <div className="flex flex-col items-center min-h-[55%] max-h-auto min-w-full bg-white p-5 rounded-[0.7rem]">
        <div className="min-w-full max-w-full overflow-y-auto">
          <table className="table-fixed min-w-full max-w-full border border-gray-200 rounded-lg shadow-sm text-sm text-left">
            <thead className="bg-[#E8B7BA] text-white sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-[#82385D]">Cod Producto</th>
                <th className="px-4 py-3 text-[#82385D]">Categoria</th>
                <th className="px-4 py-3 text-[#82385D]">Categoria Costo</th>
                <th className="px-4 py-3 text-[#82385D]">Descripción</th>
                <th className="px-4 py-3 text-[#82385D]">Unidad de medida</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{product.cod_producto}</td>
                  <td className="px-4 py-2">
                    {product.nombre_categoria_producto}
                  </td>
                  <td className="px-4 py-2">
                    {product.nombre_categoria_costo}
                  </td>
                  <td className="px-4 py-2">{product.descripcion}</td>
                  <td className="px-4 py-2">{product.unidad_medida}</td>
                  {canAccess(
                    IndividualPrivileges.almacen.administrarAlmacen,
                  ) && (
                    <td className="px-4 py-2">
                      <ModalProductEntry product={product} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
