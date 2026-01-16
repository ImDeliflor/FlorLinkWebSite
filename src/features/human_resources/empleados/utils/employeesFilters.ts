import type { Empleado, FormFilterEmployees } from "../types/employee";

export function filterEmployees(
  employees: Empleado[],
  formFilter: FormFilterEmployees
) {
  return employees.filter((item) => {
    const rules: boolean[] = [];

    if (formFilter.nombre !== "") {
      rules.push(
        (item.nombre || "")
          .toLowerCase()
          .includes(formFilter.nombre.toLowerCase())
      );
    }

    return rules.length === 0 || rules.every(Boolean);
  });
}
