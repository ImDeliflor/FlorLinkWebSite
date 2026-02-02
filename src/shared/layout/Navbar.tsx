import { useState } from "react";
import { CiLogout } from "react-icons/ci";
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

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdownContabilidad, setOpenDropdownContabilidad] =
    useState(false);
  const [openDropdownAlmacen, setOpenDropdownAlmacen] = useState(false);
  const [openDropdownGH, setOpenDropdownGH] = useState(false);

  const { logout } = useAuthStore();

  const { canAccess } = useProtectedElement();

  return (
    // altura mínima de toda la pantalla y layout flex
    <div className="flex min-h-screen">
      {/* Botón para abrir el sidebar en mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar-multi-level-sidebar"
        className={`sm:static top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-[#82385D]">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center p-5 mb-10 text-gray-900 rounded-lg bg-[#E8B7BA] group"
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
                  className="flex items-center w-full p-2 text-[1.2rem] hover:text-[#82385D] font-normal text-white transition duration-75 rounded-lg group hover:bg-[#E8B7BA]"
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
                        >
                          Mis órdenes de compra
                        </NavLink>
                      </li>
                    )}

                    {/* elemento para órdenes de mi equipo */}
                    {canAccess(
                      PermissionsSections.contabilidad.ordenesEquipo
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
                  className="flex items-center w-full p-2 text-[1.2rem] hover:text-[#82385D] font-normal text-white transition duration-75 rounded-lg group hover:bg-[#E8B7BA]"
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
                      PermissionsSections.almacen.productosAlmacen
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
                        >
                          Productos
                        </NavLink>
                      </li>
                    )}

                    {/* elemento para el inventario de almacén */}
                    {canAccess(
                      PermissionsSections.almacen.inventarioAlmacen
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
                        >
                          Salidas
                        </NavLink>
                      </li>
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
                  className="flex items-center w-full p-2 text-[1.2rem] hover:text-[#82385D] font-normal text-white transition duration-75 rounded-lg group hover:bg-[#E8B7BA]"
                >
                  <PiUsersThreeBold size={23} />
                  <span className="flex-1 ms-3 text-left whitespace-nowrap">
                    Gestión Humana
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
                {openDropdownGH && (
                  <ul className="py-2 space-y-2">
                    {/* elemento para los empleados */}
                    {canAccess(
                      PermissionsSections.gestion_humana.empleados
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
                        >
                          Empleados
                        </NavLink>
                      </li>
                    )}

                    {/* elemento para evaluaciones de desempeño */}
                    {canAccess(
                      PermissionsSections.gestion_humana.evaluaciones_desempenio
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
                        >
                          Evaluaciones Desempeño
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
