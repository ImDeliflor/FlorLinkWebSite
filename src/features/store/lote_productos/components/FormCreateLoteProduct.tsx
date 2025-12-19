import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";
import { categoriasToxicologicas } from "@/shared/data/selectOptions";
import type { LoteProduct } from "../types/loteProduct";
import { useLoteProductsContext } from "../hooks/useLoteProductsContext";

// Props que va pasar el padre del componente
type FormProductProps = {
  _valor: LoteProduct;
  index: number;
};

export const FormCreateLoteProduct = ({ _valor, index }: FormProductProps) => {
  // Contexto de las tablas básicas
  const { onChangeSelectLote } = useLoteProductsContext();

  // Contexto de las tablas básicas
  const { laboratorios } = useBasicTablesContext();

  return (
    <div
      key={index}
      className="flex items-center justify-around h-full w-full my-1"
    >
      <div className="flex flex-col items-center w-[20%] text-[#484848]">
        <label htmlFor="" className="mb-2">
          N° Lote
        </label>
        <input
          className="w-[100%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
          type="text"
          placeholder="N° Lote"
          name=""
          id=""
          onChange={(e) =>
            onChangeSelectLote(index, "nro_lote", e.target.value)
          }
          defaultValue={_valor.nro_lote}
        />
      </div>
      <div className="flex flex-col items-center w-[20%] text-[#484848]">
        <label htmlFor="" className="mb-2">
          Vencimiento
        </label>
        <input
          className="w-[100%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
          type="date"
          onChange={(e) =>
            onChangeSelectLote(index, "fecha_vencimiento", e.target.value)
          }
          defaultValue={_valor.fecha_vencimiento}
        />
      </div>
      <div className="flex flex-col items-center w-[15%] text-[#484848]">
        <label htmlFor="" className="mb-2">
          Laboratorio
        </label>
        <select
          id="default"
          className="bg-gray-50 w-[100%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6"
          onChange={(e) =>
            onChangeSelectLote(index, "id_laboratorio", Number(e.target.value))
          }
        >
          {[...laboratorios]
            .sort((a, b) =>
              a.nombre_laboratorio.localeCompare(b.nombre_laboratorio)
            )
            .map((_valor, index) => (
              <option key={index} value={_valor.id_laboratorio}>
                {_valor.nombre_laboratorio}
              </option>
            ))}
        </select>
      </div>
      <div className="flex flex-col items-center w-[15%] text-[#484848]">
        <label htmlFor="" className="mb-2">
          Cat. Toxicol
        </label>
        <select
          id="default"
          className="bg-gray-50 w-[100%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6 "
          onChange={(e) =>
            onChangeSelectLote(index, "categoria_toxicologica", e.target.value)
          }
        >
          {[...categoriasToxicologicas]
            .sort((a, b) => a.localeCompare(b))
            .map((_valor) => (
              <option key={_valor} value={_valor}>
                {_valor}
              </option>
            ))}
        </select>
      </div>
      <div className="flex flex-col items-center w-[15%] text-[#484848]">
        <label htmlFor="" className="mb-2">
          Cantidad
        </label>
        <input
          className=" w-[100%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
          type="number"
          placeholder="Cantidad"
          name=""
          id=""
          onChange={(e) =>
            onChangeSelectLote(
              index,
              "cantidad_disponible_lote",
              Number(e.target.value)
            )
          }
        />
      </div>
    </div>
  );
};
