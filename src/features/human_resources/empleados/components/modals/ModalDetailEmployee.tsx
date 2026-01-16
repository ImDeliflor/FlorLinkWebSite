/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import type { Empleado } from "../../types/employee";
import { useBasicTablesContext } from "@/features/basic_tables/hooks/useBasicTablesContext";
import { useEmployeeContext } from "../../hooks/useEmployeeContext";
import { Button } from "@/components/ui/button";
import { useProtectedElement } from "@/shared/hooks/useProtectedElement";
import { IndividualPrivileges } from "@/shared/config/permissions";

interface EmployeeProps {
  employee: Empleado;
}

export default function ModalDetailEmployee({ employee }: EmployeeProps) {
  // Contexto de las tablas básicas
  const {
    tiposDocumento,
    ciudades,
    cargos,
    areas,
    sexos,
    estadosCiviles,
    eps,
    fondosPensiones,
    fondosCesantias,
    mediosTransporte,
    tiposContrato,
  } = useBasicTablesContext();

  // Contexto de los empleados
  const { employees, updateEmployee, getEmployees } = useEmployeeContext();

  // useState para manejar el estado del modal
  const [open, setOpen] = useState(false);

  const [dataEmployee, setDataEmployee] = useState<Empleado>(employee);

  // Almacenar los datos originales
  const originData = employee;

  // Función para dar acceso a un elemento
  const { canAccess } = useProtectedElement();

  // Función para formato de pesos en COP
  const formatCOP = (value: number | null | undefined) => {
    if (!value) return "";

    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Función para modificar los datos del empleado
  const handlerUpdateEmployee = async () => {
    const id_empleado = employee.id_empleado;
    const new_empleado = dataEmployee;

    await updateEmployee(id_empleado, new_empleado, setOpen);
    await getEmployees();
  };

  useEffect(() => {
    setDataEmployee(employee);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center bg-[#82385D] font-medium text-[#E8B7BA] h-auto cursor-pointer p-3 rounded-xl">
          <CiEdit className="mr-2" size={20} color="#E8B7BA" />
          Ver/Editar
        </button>
      </DialogTrigger>

      <DialogContent className="!w-[95vw] !h-[95vh] !max-w-none bg-white border-none text-[#484848]">
        <DialogHeader>
          <DialogTitle className="text-[#484848] text-center">
            INFORMACIÓN PERSONAL DE {employee.nickname?.toUpperCase()}
          </DialogTitle>
        </DialogHeader>

        {/* Contenido personalizado */}
        <div className="flex items-center justify-around flex-wrap overflow-y-auto">
          {/********************* DIV PARA EL TIPO DE DOCUMENTO *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Tipo de documento
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataEmployee.id_tipo_documento}
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  id_tipo_documento: Number(e.target.value),
                }))
              }
            >
              {[...tiposDocumento]
                .sort((a, b) =>
                  a.nombre_tipo_documento.localeCompare(b.nombre_tipo_documento)
                )
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_tipo_documento}>
                    {_valor.nombre_tipo_documento}
                  </option>
                ))}
            </select>
          </div>

          {/********************* DIV PARA EL NRO DE DOCUMENTO *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              N° de documento
            </label>
            <input
              className="border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
              type="text"
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  nro_documento: e.target.value,
                }))
              }
              defaultValue={dataEmployee.nro_documento}
            />
          </div>

          {/********************* DIV PARA LA CIUDAD DE EXPEDICIÓN *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Ciudad expedición
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataEmployee.id_ciudad_expedicion}
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  id_ciudad_expedicion: Number(e.target.value),
                }))
              }
            >
              {[...ciudades]
                .sort((a, b) => a.nombre_ciudad.localeCompare(b.nombre_ciudad))
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_ciudad}>
                    {_valor.nombre_ciudad}
                  </option>
                ))}
            </select>
          </div>

          {/********************* DIV PARA EL NOMBRE DEL EMPLEADO *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Nombre(s)
            </label>
            <input
              className="border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
              type="text"
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  nombre: e.target.value,
                }))
              }
              defaultValue={dataEmployee.nombre}
            />
          </div>

          {/********************* DIV PARA LOS APELLIDOS DEL EMPLEADO *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Apellidos
            </label>
            <input
              className="border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
              type="text"
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  apellidos: e.target.value,
                }))
              }
              defaultValue={dataEmployee.apellidos}
            />
          </div>

          {/********************* DIV PARA EL NICKNAME *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Nickname
            </label>
            <input
              className="border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
              type="text"
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  nickname: e.target.value,
                }))
              }
              defaultValue={dataEmployee.nickname}
            />
          </div>

          {/********************* DIV PARA LA CIUDAD DE RESIDENCIA *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Ciudad residencia
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataEmployee.id_ciudad_residencia}
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  id_ciudad_residencia: Number(e.target.value),
                }))
              }
            >
              {[...ciudades]
                .sort((a, b) => a.nombre_ciudad.localeCompare(b.nombre_ciudad))
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_ciudad}>
                    {_valor.nombre_ciudad}
                  </option>
                ))}
            </select>
          </div>

          {/********************* DIV PARA EL CELULAR *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Celular
            </label>
            <input
              className="border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
              type="text"
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  celular: e.target.value,
                }))
              }
              defaultValue={dataEmployee.celular}
            />
          </div>

          {/********************* DIV PARA EL CORREO *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Correo
            </label>
            <input
              className="border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
              type="text"
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  correo: e.target.value,
                }))
              }
              defaultValue={dataEmployee.correo}
            />
          </div>

          {/********************* DIV PARA EL CARGO *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Cargo
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataEmployee.id_cargo}
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  id_cargo: Number(e.target.value),
                }))
              }
            >
              {[...cargos]
                .sort((a, b) => a.nombre_cargo.localeCompare(b.nombre_cargo))
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_cargo}>
                    {_valor.nombre_cargo}
                  </option>
                ))}
            </select>
          </div>

          {/********************* DIV PARA EL ÁREA *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Área
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataEmployee.id_area}
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  id_area: Number(e.target.value),
                }))
              }
            >
              {[...areas]
                .sort((a, b) => a.nombre_area.localeCompare(b.nombre_area))
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_area}>
                    {_valor.nombre_area}
                  </option>
                ))}
            </select>
          </div>

          {/********************* DIV PARA LA FECHA DE INGRESO *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Fecha ingreso
            </label>
            <input
              className="border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
              type="date"
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  fecha_ingreso: e.target.value,
                }))
              }
              defaultValue={dataEmployee.fecha_ingreso}
            />
          </div>

          {canAccess(IndividualPrivileges.gestion_humana.accesoSalario) && (
            <>
              {/********************* DIV PARA EL SALARIO *****************************/}
              <div className="w-auto mr-4">
                <label htmlFor="" className="text-[#909090] mx-2">
                  Salario
                </label>
                <input
                  className="border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
                  type="text"
                  value={formatCOP(dataEmployee.salario)}
                  onChange={(e) => {
                    // Quitamos todo lo que no sea número
                    const rawValue = e.target.value.replace(/\D/g, "");
                    setDataEmployee((prev) => ({
                      ...prev,
                      salario: Number(rawValue),
                    }));
                  }}
                />
              </div>

              {/********************* DIV PARA EL SALARIO EN LETRAS *****************************/}
              <div className="w-auto mr-4">
                <label htmlFor="" className="text-[#909090] mx-2">
                  Salario letras
                </label>
                <input
                  className="border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
                  type="text"
                  value={dataEmployee.salario_letras}
                  onChange={(e) => {
                    setDataEmployee((prev) => ({
                      ...prev,
                      salario_letras: e.target.value,
                    }));
                  }}
                />
              </div>
            </>
          )}

          {/********************* DIV PARA EL AUXILIO DE TRANSPORTE *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Auxilio transporte
            </label>
            <input
              className="border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
              type="text"
              value={formatCOP(dataEmployee.auxilio_transporte)}
              onChange={(e) => {
                // Quitamos todo lo que no sea número
                const rawValue = e.target.value.replace(/\D/g, "");
                setDataEmployee((prev) => ({
                  ...prev,
                  auxilio_transporte: Number(rawValue),
                }));
              }}
            />
          </div>

          {/********************* DIV PARA EL AUXILIO DE TRANSPORTE EN LETRAS *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Auxilio transporte letras
            </label>
            <input
              className="border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
              type="text"
              value={dataEmployee.auxilio_transporte_letras}
              onChange={(e) => {
                setDataEmployee((prev) => ({
                  ...prev,
                  auxilio_transporte_letras: e.target.value,
                }));
              }}
            />
          </div>

          {/********************* DIV PARA EL SEXO *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Sexo
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataEmployee.id_sexo}
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  id_sexo: Number(e.target.value),
                }))
              }
            >
              {[...sexos]
                .sort((a, b) => a.descripcion.localeCompare(b.descripcion))
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_sexo}>
                    {_valor.descripcion}
                  </option>
                ))}
            </select>
          </div>

          {/********************* DIV PARA LA EPS *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              EPS
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataEmployee.id_eps}
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  id_eps: Number(e.target.value),
                }))
              }
            >
              {[...eps]
                .sort((a, b) => a.nombre_eps.localeCompare(b.nombre_eps))
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_eps}>
                    {_valor.nombre_eps}
                  </option>
                ))}
            </select>
          </div>

          {/********************* DIV PARA EL FONDO DE PENSIÓN *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Fondo pensión
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataEmployee.id_fondo_pension}
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  id_fondo_pension: Number(e.target.value),
                }))
              }
            >
              {[...fondosPensiones]
                .sort((a, b) =>
                  a.nombre_fondo_pensiones.localeCompare(
                    b.nombre_fondo_pensiones
                  )
                )
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_fondo_pension}>
                    {_valor.nombre_fondo_pensiones}
                  </option>
                ))}
            </select>
          </div>

          {/********************* DIV PARA EL FONDO DE CESANTÍAS *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Fondo cesantías
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataEmployee.id_fondo_cesantias}
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  id_fondo_cesantias: Number(e.target.value),
                }))
              }
            >
              {[...fondosCesantias]
                .sort((a, b) =>
                  a.nombre_fondo_cesantias.localeCompare(
                    b.nombre_fondo_cesantias
                  )
                )
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_fondo_cesantias}>
                    {_valor.nombre_fondo_cesantias}
                  </option>
                ))}
            </select>
          </div>

          {/********************* DIV PARA LOS DÍAS DE VACACIONES *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Días vacaciones
            </label>
            <input
              className="border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
              type="number"
              value={dataEmployee.dias_vacaciones}
              onChange={(e) => {
                setDataEmployee((prev) => ({
                  ...prev,
                  dias_vacaciones: Number(e.target.value),
                }));
              }}
            />
          </div>

          {/********************* DIV PARA LA FECHA DE NACIMIENTO *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Fecha nacimiento
            </label>
            <input
              className="border-1 p-2 rounded-lg border-[#9D9D9D] text-[#484848] text-center"
              type="date"
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  fecha_nacimiento: e.target.value,
                }))
              }
              defaultValue={dataEmployee.fecha_nacimiento}
            />
          </div>

          {/********************* DIV PARA EL ESTADO CIVÍL *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Estado civíl
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataEmployee.id_estado_civil}
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  id_estado_civil: Number(e.target.value),
                }))
              }
            >
              {[...estadosCiviles]
                .sort((a, b) =>
                  a.nombre_estado_civil.localeCompare(b.nombre_estado_civil)
                )
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_estado_civil}>
                    {_valor.nombre_estado_civil}
                  </option>
                ))}
            </select>
          </div>

          {/********************* DIV PARA EL MEDIO DE TRANSPORTE *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Medio transporte
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataEmployee.id_medio_transporte}
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  id_medio_transporte: Number(e.target.value),
                }))
              }
            >
              {[...mediosTransporte]
                .sort((a, b) =>
                  a.nombre_medio_transporte.localeCompare(
                    b.nombre_medio_transporte
                  )
                )
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_medio_transporte}>
                    {_valor.nombre_medio_transporte}
                  </option>
                ))}
            </select>
          </div>

          {/********************* DIV PARA EL TIPO DE CONTRATO *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Tipo contrato
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataEmployee.id_tipo_contrato}
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  id_tipo_contrato: Number(e.target.value),
                }))
              }
            >
              {[...tiposContrato]
                .sort((a, b) =>
                  a.nombre_tipo_contrato.localeCompare(b.nombre_tipo_contrato)
                )
                .map((_valor, index) => (
                  <option key={index} value={_valor.id_tipo_contrato}>
                    {_valor.nombre_tipo_contrato}
                  </option>
                ))}
            </select>
          </div>

          {/********************* DIV PARA EL JEFE DIRECTO *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Jefe directo
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataEmployee.id_jefe}
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  id_jefe: Number(e.target.value),
                }))
              }
            >
              {[...employees]
                .filter((emp) => emp.es_jefe === true)
                .sort((a, b) => a.nombre.localeCompare(b.nombre))
                .map((emp) => (
                  <option key={emp.id_empleado} value={emp.id_empleado}>
                    {emp.nombre}
                  </option>
                ))}
            </select>
          </div>

          {/********************* DIV PARA SABER SI ES JEFE O NO *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              ¿Es jefe?
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataEmployee.es_jefe ? "true" : "false"}
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  es_jefe: e.target.value === "true",
                }))
              }
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>

          {/********************* DIV PARA EL ESTADO DEL EMPLEADO *****************************/}
          <div className="w-auto mr-4">
            <label htmlFor="" className="text-[#909090] mx-2">
              Estado empleado
            </label>
            <select
              id="default"
              className="bg-gray-50 border border-gray-300 text-[#484848] rounded-lg py-2 px-6"
              value={dataEmployee.estado_empleado}
              onChange={(e) =>
                setDataEmployee((prev) => ({
                  ...prev,
                  estado_empleado: e.target.value,
                }))
              }
            >
              <option value="Activo">Activo</option>
              <option value="Retirado">Retirado</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          {JSON.stringify(originData) === JSON.stringify(dataEmployee) || (
            <Button
              onClick={handlerUpdateEmployee}
              className="bg-[#82385D] text-[#E8B7BA] hover:text-[#E8B7BA] hover:bg-[#82385D] cursor-pointer mx-5 px-10"
            >
              Editar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
