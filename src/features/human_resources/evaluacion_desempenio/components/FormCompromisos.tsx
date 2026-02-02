import type { Compromisos } from "../types/compromisos";

// Interface del OnChange
type OnChangeSelectFn = (
  index: number,
  key: keyof Compromisos,
  value: string | number,
) => void;

// Props que va pasar el padre del componente
type FormProductProps = {
  _valor: Compromisos;
  index: number;
  onChangeSelect: OnChangeSelectFn;
};

export const FormCompromisos = ({
  _valor,
  index,
  onChangeSelect,
}: FormProductProps) => {
  return (
    <div
      key={index}
      className="flex items-center justify-around h-full w-full my-1"
    >
      <input
        className="w-[30%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
        type="text"
        placeholder="Descripción compromiso"
        name=""
        id=""
        onChange={(e) =>
          onChangeSelect(index, "descripcion_compromiso", e.target.value)
        }
        defaultValue={_valor.descripcion_compromiso}
      />
      <div className="w-[20%]">
        <label htmlFor="" className="px-1">
          %
        </label>
        <input
          className="w-[90%] border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848]"
          type="number"
          placeholder="% Cumplimiento"
          name=""
          id=""
          onChange={(e) =>
            onChangeSelect(index, "porc_cumplimiento", Number(e.target.value))
          }
          defaultValue={_valor.porc_cumplimiento}
        />
      </div>

      <select
        id="default"
        className="bg-gray-50 w-[20%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6"
        value={_valor.semestre_compromiso}
        onChange={(e) =>
          onChangeSelect(index, "semestre_compromiso", e.target.value)
        }
      >
        <option value="1">Semestre 1</option>
        <option value="2">Semestre 2</option>
      </select>
      <select
        id="default"
        className="bg-gray-50 w-[20%] border border-gray-300 text-[#484848] rounded-lg focus:border-1 py-2 px-6"
        value={_valor.anio_compromiso}
        onChange={(e) =>
          onChangeSelect(index, "anio_compromiso", e.target.value)
        }
      >
        <option value="2025">Año 2025</option>
        <option value="2026">Año 2026</option>
      </select>
    </div>
  );
};
