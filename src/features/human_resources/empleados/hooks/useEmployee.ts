import { API_BASE_URL } from "@/config/apiConfig";
import type { Empleado } from "../types/employee";
import api from "@/shared/api/axiosConfig";
import Swal from "sweetalert2";
import { useState } from "react";

export const useEmployee = () => {
  // SECCIÓN PARA LOS EMPLEADOS

  // useState para los empleados
  const [employees, setEmployees] = useState<Empleado[]>([]);

  // Función para traer todos los empleados
  const getEmployees = async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/empleado`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error al traer los empleados");
      throw error;
    }
  };

  // Función para guardar los empleados
  const saveEmployee = async (employee: Empleado) => {
    try {
      await api.post(`${API_BASE_URL}/empleado`, employee);
      Swal.fire({
        icon: "success",
        title: `Empleado creado exitosamente!`,
        confirmButtonColor: "#82385D",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `¡Hubo un error al guardar el empleado!`,
        confirmButtonColor: "#82385D",
      });
      throw error;
    }
  };

  // Función para modificar un empleado
  const updateEmployee = async (
    id_empleado = 0,
    employee: Empleado,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      await api.put(`${API_BASE_URL}/empleado/${id_empleado}`, employee);
      Swal.fire({
        icon: "success",
        title: `¡Empleado modificado exitosamente!`,
        confirmButtonColor: "#82385D",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `¡Hubo un error al modificar el empleado!`,
        confirmButtonColor: "#82385D",
      });
      throw error;
    } finally {
      setOpen(false);
    }
  };

  // Función para retirar un empleado
  const takeOutEmployee = async (id_empleado = 0) => {
    try {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción retirará a esta persona de la compañía",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#82385D",
        cancelButtonColor: "#D64550",
        confirmButtonText: "¡Sí, retirar!",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await api.put(
            `${API_BASE_URL}/empleado/take-out-employee/${id_empleado}`
          );
          await getEmployees();
          Swal.fire({
            title: "¡Retirado!",
            text: "Esta persona ha sido retirada.",
            icon: "success",
            confirmButtonColor: "#82385D",
          });
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `¡Hubo un error al retirar el empleado!`,
        confirmButtonColor: "#82385D",
      });
      throw error;
    }
  };

  // Datos y funciones a retornar
  return {
    saveEmployee,
    employees,
    getEmployees,
    updateEmployee,
    takeOutEmployee,
  };
};
