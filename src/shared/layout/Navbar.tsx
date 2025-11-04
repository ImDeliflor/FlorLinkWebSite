import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { IoIosFlower } from "react-icons/io";
import { MdAccountBalance } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const { logout, user } = useAuthStore();

  return (
    // 👇 altura mínima de toda la pantalla y layout flex
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
            <li>
              <button
                type="button"
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center w-full p-2 text-[1.2rem] hover:text-[#82385D] font-normal text-white transition duration-75 rounded-lg group hover:bg-[#E8B7BA]"
              >
                <MdAccountBalance size={23} />
                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                  Contabilidad
                </span>
                <svg
                  className={`w-3 h-3 transition-transform ${
                    openDropdown ? "rotate-180" : ""
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
              {openDropdown && (
                <ul className="py-2 space-y-2">
                  <li>
                    <NavLink
                      to="/shopping/new-order"
                      className="flex items-center w-full font-light p-2 text-[1rem] hover:text-[#82385D] text-white transition pl-11 duration-75 rounded-lg group hover:bg-[#E8B7BA]"
                    >
                      Crear orden de compra
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/shopping/my-orders"
                      className="flex items-center w-full font-light p-2 text-[1rem] hover:text-[#82385D] text-white transition pl-11 duration-75 rounded-lg group hover:bg-[#E8B7BA]"
                    >
                      Mis órdenes de compra
                    </NavLink>
                  </li>
                  {user?.id_usuario === 13 ||
                    (user?.id_usuario === 30 && (
                      <>
                        <li>
                          <NavLink
                            to="/shopping/team-orders"
                            className="flex items-center w-full font-light p-2 text-[1rem] hover:text-[#82385D] text-white transition pl-11 duration-75 rounded-lg group hover:bg-[#E8B7BA]"
                          >
                            Órdenes de mi equipo
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/shopping/orders"
                            className="flex items-center w-full font-light p-2 text-[1rem] hover:text-[#82385D] text-white transition pl-11 duration-75 rounded-lg group hover:bg-[#E8B7BA]"
                          >
                            Órdenes de compra
                          </NavLink>
                        </li>
                      </>
                    ))}
                </ul>
              )}
            </li>
          </ul>
          <div className="w-full flex items-center justify-center">
            <button
              className="flex items-center justify-center bg-[#E8B7BA] text-[15px] font-medium text-[#82385D] h-auto cursor-pointer py-3 px-6 rounded-xl mt-5"
              onClick={logout}
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
