import type { Vehicle, VehicleFilters } from "../types";
import { vehiclesMock } from "../mocks/vehiclesMock";
// import api from "../config/axios";
// import { isAxiosError } from "axios";

// Por limitaciones de la API (ciertas funcionalidades solo disponibles con API Key premium), se utiliza un mock de datos.
// Si tenes acceso premium, podes descomentar el llamado real a la API.

/**
 * Obtiene vehículos desde la API (si tienes acceso premium) o desde el mock.
 * @param limit Número de resultados a devolver (simulado en mock, real en API premium)
 * @param offset Número de resultados a saltar (simulado en mock, real en API premium)
 */

export async function getCars(params: VehicleFilters): Promise<Vehicle[]> {
  const {
    limit = 20,
    offset = 0,
    make,
    model,
    class: vehicleClass,
    transmission,
    year,
    min_city_mpg,
    max_city_mpg,
    min_hwy_mpg,
    max_hwy_mpg,
    min_comb_mpg,
    max_comb_mpg,
  } = params;

  // --- Implementación real (descomentar para usar API real) ---

  // try {
  //   const { data } = await api.get<Vehicle[]>(
  //     `/cars?` +
  //       (model ? `model=${model}` : "model=camry") +
  //       (make ? `&make=${make}` : "") +
  //       (vehicleClass ? `&class=${vehicleClass}` : "") +
  //       (transmission ? `&transmission=${transmission}` : "") +
  //       (year ? `&year=${year}` : "") +
  //       (min_city_mpg !== undefined ? `&min_city_mpg=${min_city_mpg}` : "") +
  //       (max_city_mpg !== undefined ? `&max_city_mpg=${max_city_mpg}` : "") +
  //       (min_hwy_mpg !== undefined ? `&min_hwy_mpg=${min_hwy_mpg}` : "") +
  //       (max_hwy_mpg !== undefined ? `&max_hwy_mpg=${max_hwy_mpg}` : "") +
  //       (min_comb_mpg !== undefined ? `&min_comb_mpg=${min_comb_mpg}` : "") +
  //       (max_comb_mpg !== undefined ? `&max_comb_mpg=${max_comb_mpg}` : "") +
  //       `&limit=${limit}` +
  //       `&offset=${offset}`
  //   );
  //   return data;
  // } catch (error) {
  //   if (isAxiosError(error) && error.response) {
  //     throw new Error("No se pudieron recuperar los datos de los vehículos.");
  //   }
  //   throw error;
  // }

  // --- Mock de datos ---
  let filtered = vehiclesMock;
  if (make) filtered = filtered.filter((v) => v.make === make);
  if (model) filtered = filtered.filter((v) => v.model === model);
  if (vehicleClass) filtered = filtered.filter((v) => v.class === vehicleClass);
  if (transmission)
    filtered = filtered.filter((v) => v.transmission === transmission);
  if (year) filtered = filtered.filter((v) => String(v.year) === String(year));
  if (min_city_mpg !== undefined)
    filtered = filtered.filter((v) => v.city_mpg >= Number(min_city_mpg));
  if (max_city_mpg !== undefined)
    filtered = filtered.filter((v) => v.city_mpg <= Number(max_city_mpg));
  if (min_hwy_mpg !== undefined)
    filtered = filtered.filter((v) => v.highway_mpg >= Number(min_hwy_mpg));
  if (max_hwy_mpg !== undefined)
    filtered = filtered.filter((v) => v.highway_mpg <= Number(max_hwy_mpg));
  if (min_comb_mpg !== undefined)
    filtered = filtered.filter(
      (v) => v.combination_mpg >= Number(min_comb_mpg)
    );
  if (max_comb_mpg !== undefined)
    filtered = filtered.filter(
      (v) => v.combination_mpg <= Number(max_comb_mpg)
    );

  return new Promise((resolve) => {
    setTimeout(() => resolve(filtered.slice(offset, offset + limit)), 600);
  });
}

/**
 * Obtiene un vehículo por make, model y year usando el mock.
 * Si tenes acceso premium, podes descomentar la llamada real a la API.
 */
export async function getCarById({
  make,
  model,
  year,
  transmission,
}: {
  make: string;
  model: string;
  year: string;
  transmission: string;
}) {
  // --- Implementación real (descomentar para usar API real) ---
  // try {
  //   const { data } = await api.get<Vehicle[]>(
  //     `/cars?make=${make}&model=${model}&year=${year}&transmission=${transmission}`
  //   );
  //   return data[0];
  // } catch (error) {
  //   if (isAxiosError(error) && error.response) {
  //     throw new Error("No se pudieron recuperar los datos del vehiculo");
  //   }
  //   throw error;
  // }

  // --- Mock de datos ---
  return new Promise<Vehicle | undefined>((resolve) => {
    setTimeout(() => {
      const found = vehiclesMock.find((v) => {
        if (v.make !== make) return false;
        if (v.model !== model) return false;
        if (String(v.year) !== String(year)) return false;
        if (transmission !== undefined && v.transmission !== transmission)
          return false;
        return true;
      });
      resolve(found);
    }, 400);
  });
}
