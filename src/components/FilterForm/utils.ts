import type { VehicleFilters } from "../../types";

// Devuelve el valor de un campo para usar en el value de un input
export const inputVal = (filters: VehicleFilters, key: keyof VehicleFilters) =>
  filters[key] ?? "";

export default { inputVal };
