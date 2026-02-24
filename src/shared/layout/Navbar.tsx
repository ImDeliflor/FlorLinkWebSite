import { useState } from "react";
import { CiLogout, CiMenuBurger } from "react-icons/ci";
import { IoIosFlower } from "react-icons/io";
import { MdAccountBalance } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  PermissionsDropdowns,
  PermissionsSections,
} from "../config/permissions";
import { useProtectedElement } from "../hooks/useProtectedElement";
import { BiStore } from "react-icons/bi";
import { PiUsersThreeBold } from "react-icons/pi";
import { ImStatsDots } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { GrUserWorker } from "react-icons/gr";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdownContabilidad, setOpenDropdownContabilidad] =
    useState(false);
  const [openDropdownAlmacen, setOpenDropdownAlmacen] = useState(false);
  const [openDropdownInfAlmacen, setOpenDropdownInfAlmacen] = useState(false);
  const [openDropdownGH, setOpenDropdownGH] = useState(false);
  const [openDropdownProduccion, setOpenDropdownProduccion] = useState(false);

  const { logout } = useAuthStore();

  const { canAccess } = useProtectedElement();

  return (
    // altura mínima de toda la pantalla y layout flex
    <div className="md:min-h-screen">
      {/* Botón para abrir el sidebar en mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ${
          isOpen ? "top-4 left-68" : "top-4 left-4"
        } z-50 lg:hidden bg-[#81194D] p-2 rounded-lg shadow`}
      >
        {isOpen ? (
          <IoClose size={26} color="#E8B7BA" />
        ) : (
          <CiMenuBurger size={26} color="#E8B7BA" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed lg:static top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-[#82385D]">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center p-5 mb-10 text-gray-900 rounded-lg bg-[#E8B7BA] group"
                onClick={() => setIsOpen(!isOpen)}
              >
                <IoIosFlower color="#82385D" size={30} />
                <span className="ms-3 font-extrabold text-3xl text-[#82385D]">
                  FlorLink
                </span>
              </Link>
            </li>
            {/* Dropdown Contabilidad */}
            {canAccess(PermissionsDropdowns.contabilidad) && (
              <li>
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdownContabilidad(!openDropdownContabilidad)
                  }
                  className="flex items-center w-full p-2 text-[1.2rem] hover:text-[#82385D] font-semibold text-white transition duration-75 rounded-lg group hover:bg-[#E8B7BA]"
                >
                  <MdAccountBalance size={23} />
                  <span className="flex-1 ms-3 text-left whitespace-nowrap">
                    Contabilidad
                  </span>
                  <svg
                    className={`w-3 h-3 transition-transform ${
                      openDropdownContabilidad ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* Submenú */}
                {openDropdownContabilidad && (
                  <ul className="py-2 space-y-2">
                    {/* elemento para las órdenes nuevas */}
                    {canAccess(PermissionsSections.contabilidad.nuevaOrden) && (
                      <li>
                        <NavLink
                          to="/shopping/new-order"
                          className={({ isActive }) =>
                            `flex items-center w-full font-light p-2 text-[1rem] pl-11 rounded-lg group transition duration-75 
     ${
       isActive
         ? "bg-[#E8B7BA] text-[#82385D]" // estilos cuando está activa
         : "text-white hover:text-[#82385D] hover:bg-[#E8B7BA]" // estilos normales
     }`
                          }
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          Crear orden de compra
                        </NavLink>
                      </li>
                    )}

                    {/* elemento para mis órdenes */}
                    {canAccess(PermissionsSections.contabilidad.misOrdenes) && (
                      <li>
                        <NavLink
                          to="/shopping/my-orders"
                          className={({ isActive }) =>
                            `flex items-center w-full font-light p-2 text-[1rem] pl-11 rounded-lg group transition duration-75 
     ${
       isActive
         ? "bg-[#E8B7BA] text-[#82385D]" // estilos cuando está activa
         : "text-white hover:text-[#82385D] hover:bg-[#E8B7BA]" // estilos normales
     }`
                          }
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          Mis órdenes de compra
                        </NavLink>
                      </li>
                    )}

                    {/* elemento para órdenes de mi equipo */}
                    {canAccess(
                      PermissionsSections.contabilidad.ordenesEquipo,
                    ) && (
                      <li>
                        <NavLink
                          to="/shopping/team-orders"
                          className={({ isActive }) =>
                            `flex items-center w-full font-light p-2 text-[1rem] pl-11 rounded-lg group transition duration-75 
     ${
       isActive
         ? "bg-[#E8B7BA] text-[#82385D]" // estilos cuando está activa
         : "text-white hover:text-[#82385D] hover:bg-[#E8B7BA]" // estilos normales
     }`
                          }
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          Órdenes de mi equipo
                        </NavLink>
                      </li>
                    )}

                    {/* elemento para todas las órdenes */}
                    {canAccess(PermissionsSections.contabilidad.ordenes) && (
                      <li>
                        <NavLink
                          to="/shopping/orders"
                          className={({ isActive }) =>
                            `flex items-center w-full font-light p-2 text-[1rem] pl-11 rounded-lg group transition duration-75 
     ${
       isActive
         ? "bg-[#E8B7BA] text-[#82385D]" // estilos cuando está activa
         : "text-white hover:text-[#82385D] hover:bg-[#E8B7BA]" // estilos normales
     }`
                          }
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          Órdenes de compra
                        </NavLink>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            )}
            {/* Dropdown para almacén */}
            {canAccess(PermissionsDropdowns.almacen) && (
              <li>
                <button
                  type="button"
                  onClick={() => setOpenDropdownAlmacen(!openDropdownAlmacen)}
                  className="flex items-center w-full p-2 text-[1.2rem] hover:text-[#82385D] font-semibold text-white transition duration-75 rounded-lg group hover:bg-[#E8B7BA]"
                >
                  <BiStore size={23} />
                  <span className="flex-1 ms-3 text-left whitespace-nowrap">
                    Almacén
                  </span>
                  <svg
                    className={`w-3 h-3 transition-transform ${
                      openDropdownAlmacen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* Submenú */}
                {openDropdownAlmacen && (
                  <ul className="py-2 space-y-2">
                    {/* elemento para los productos de almacén */}
                    {canAccess(
                      PermissionsSections.almacen.productosAlmacen,
                    ) && (
                      <li>
                        <NavLink
                          to="/store/products"
                          className={({ isActive }) =>
                            `flex items-center w-full font-light p-2 text-[1rem] pl-11 rounded-lg group transition duration-75 
     ${
       isActive
         ? "bg-[#E8B7BA] text-[#82385D]" // estilos cuando está activa
         : "text-white hover:text-[#82385D] hover:bg-[#E8B7BA]" // estilos normales
     }`
                          }
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          Productos
                        </NavLink>
                      </li>
                    )}

                    {/* elemento para el inventario de almacén */}
                    {canAccess(
                      PermissionsSections.almacen.inventarioAlmacen,
                    ) && (
                      <li>
                        <NavLink
                          to="/store/inventory"
                          className={({ isActive }) =>
                            `flex items-center w-full font-light p-2 text-[1rem] pl-11 rounded-lg group transition duration-75 
     ${
       isActive
         ? "bg-[#E8B7BA] text-[#82385D]" // estilos cuando está activa
         : "text-white hover:text-[#82385D] hover:bg-[#E8B7BA]" // estilos normales
     }`
                          }
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          Inventario
                        </NavLink>
                      </li>
                    )}

                    {/* elemento para las entradas de almacén */}
                    {canAccess(PermissionsSections.almacen.entradas) && (
                      <li>
                        <NavLink
                          to="/store/entries"
                          className={({ isActive }) =>
                            `flex items-center w-full font-light p-2 text-[1rem] pl-11 rounded-lg group transition duration-75 
     ${
       isActive
         ? "bg-[#E8B7BA] text-[#82385D]" // estilos cuando está activa
         : "text-white hover:text-[#82385D] hover:bg-[#E8B7BA]" // estilos normales
     }`
                          }
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          Entradas
                        </NavLink>
                      </li>
                    )}

                    {/* elemento para todas las órdenes */}
                    {canAccess(PermissionsSections.almacen.salidas) && (
                      <li>
                        <NavLink
                          to="/store/issues"
                          className={({ isActive }) =>
                            `flex items-center w-full font-light p-2 text-[1rem] pl-11 rounded-lg group transition duration-75 
     ${
       isActive
         ? "bg-[#E8B7BA] text-[#82385D]" // estilos cuando está activa
         : "text-white hover:text-[#82385D] hover:bg-[#E8B7BA]" // estilos normales
     }`
                          }
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          Salidas
                        </NavLink>
                      </li>
                    )}

                    {/* elemento para los informes de contabilidad */}
                    {canAccess(PermissionsDropdowns.informes_almacen) && (
                      <>
                        <li>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenDropdownInfAlmacen(!openDropdownInfAlmacen)
                            }
                            className="flex items-center w-[90%] p-2 text-[1.2rem] hover:text-[#82385D] font-normal text-white transition duration-75 rounded-lg group hover:bg-[#E8B7BA]"
                          >
                            <ImStatsDots size={23} />
                            <span className="flex-1 ms-3 text-left whitespace-nowrap">
                              Informes
                            </span>
                            <svg
                              className={`w-3 h-3 transition-transform ${
                                openDropdownInfAlmacen ? "rotate-180" : ""
                              }`}
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                              />
                            </svg>
                          </button>
                          {openDropdownInfAlmacen && (
                            <ul className="py-2 space-y-2">
                              {/* elemento para las órdenes nuevas */}
                              {canAccess(
                                PermissionsSections.almacen.informes
                                  .vencimientoLotes,
                              ) && (
                                <li>
                                  <NavLink
                                    to="/store/informes/lotes-vencimiento"
                                    className={({ isActive }) =>
                                      `flex items-center w-full font-light p-2 text-[1rem] pl-11 rounded-lg group transition duration-75 
     ${
       isActive
         ? "bg-[#E8B7BA] text-[#82385D]" // estilos cuando está activa
         : "text-white hover:text-[#82385D] hover:bg-[#E8B7BA]" // estilos normales
     }`
                                    }
                                    onClick={() => setIsOpen(!isOpen)}
                                  >
                                    Vencimiento lotes
                                  </NavLink>
                                </li>
                              )}
                            </ul>
                          )}
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </li>
            )}
            {/* Dropdown para Gestión Humana */}
            {canAccess(PermissionsDropdowns.gestion_humana) && (
              <li>
                <button
                  type="button"
                  onClick={() => setOpenDropdownGH(!openDropdownGH)}
                  className="flex items-center w-full p-2 text-[1.2rem] hover:text-[#82385D] font-semibold text-white transition duration-75 rounded-lg group hover:bg-[#E8B7BA]"
                >
                  <PiUsersThreeBold size={23} />
                  <span className="flex-1 ms-3 text-left whitespace-nowrap">
                    Gestión Humana
                  </span>
                  <svg
                    className={`w-3 h-3 transition-transform ${
                      openDropdownGH ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* Submenú */}
                {openDropdownGH && (
                  <ul className="py-2 space-y-2">
                    {/* elemento para los empleados */}
                    {canAccess(
                      PermissionsSections.gestion_humana.empleados,
                    ) && (
                      <li>
                        <NavLink
                          to="/gh/employees"
                          className={({ isActive }) =>
                            `flex items-center w-full font-light p-2 text-[1rem] pl-11 rounded-lg group transition duration-75 
     ${
       isActive
         ? "bg-[#E8B7BA] text-[#82385D]" // estilos cuando está activa
         : "text-white hover:text-[#82385D] hover:bg-[#E8B7BA]" // estilos normales
     }`
                          }
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          Empleados
                        </NavLink>
                      </li>
                    )}

                    {/* elemento para evaluaciones de desempeño */}
                    {canAccess(
                      PermissionsSections.gestion_humana
                        .evaluaciones_desempenio,
                    ) && (
                      <li>
                        <NavLink
                          to="/gh/perf-evaluation"
                          className={({ isActive }) =>
                            `flex items-center w-full font-light p-2 text-[1rem] pl-11 rounded-lg group transition duration-75 
     ${
       isActive
         ? "bg-[#E8B7BA] text-[#82385D]" // estilos cuando está activa
         : "text-white hover:text-[#82385D] hover:bg-[#E8B7BA]" // estilos normales
     }`
                          }
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          Evaluaciones Desempeño
                        </NavLink>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            )}
            {/* Dropdown para Producción */}
            {canAccess(PermissionsDropdowns.produccion) && (
              <li>
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdownProduccion(!openDropdownProduccion)
                  }
                  className="flex items-center w-full p-2 text-[1.2rem] hover:text-[#82385D] font-semibold text-white transition duration-75 rounded-lg group hover:bg-[#E8B7BA]"
                >
                  <GrUserWorker size={23} />
                  <span className="flex-1 ms-3 text-left whitespace-nowrap">
                    Producción
                  </span>
                  <svg
                    className={`w-3 h-3 transition-transform ${
                      openDropdownProduccion ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* Submenú */}
                {openDropdownProduccion && (
                  <ul className="py-2 space-y-2">
                    {/* elemento para los empleados */}
                    {canAccess(
                      PermissionsSections.gestion_humana.empleados,
                    ) && (
                      <li>
                        <NavLink
                          to="/produccion/consumo-caldera"
                          className={({ isActive }) =>
                            `flex items-center w-full font-light p-2 text-[1rem] pl-11 rounded-lg group transition duration-75 
     ${
       isActive
         ? "bg-[#E8B7BA] text-[#82385D]" // estilos cuando está activa
         : "text-white hover:text-[#82385D] hover:bg-[#E8B7BA]" // estilos normales
     }`
                          }
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          Consumo Caldera
                        </NavLink>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            )}
          </ul>
          <div className="w-full flex items-center justify-center">
            <button
              className="flex items-center justify-center bg-[#E8B7BA] text-[15px] font-medium text-[#82385D] h-auto cursor-pointer py-3 px-6 rounded-xl mt-5"
              onClick={() => logout()}
            >
              <CiLogout className="mr-4" size={20} color="#82385D" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
