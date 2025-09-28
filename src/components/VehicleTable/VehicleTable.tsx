import React, { useState } from "react";
import { useNavigate } from "react-router";

import { useSorting } from "../../hooks/useSorting";
import type { Vehicle } from "../../types";

import "./VehicleTable.css";
import VehicleCell from "./VehicleCell";

const COLUMNS: { key: keyof Vehicle; label: string; mobile: boolean }[] = [
  { key: "class", label: "Tipo", mobile: true },
  { key: "fuel_type", label: "Combustible", mobile: true },
  { key: "make", label: "Marca", mobile: true },
  { key: "model", label: "Modelo", mobile: true },
  { key: "year", label: "Año", mobile: true },
  { key: "transmission", label: "Transmisión", mobile: true },
  { key: "city_mpg", label: "Consumo en ciudad", mobile: true },
  { key: "highway_mpg", label: "Consumo en carretera", mobile: true },
  { key: "combination_mpg", label: "Consumo mixto", mobile: true },
];

interface VehicleTableProps {
  vehicles: Vehicle[];
}

const VehicleTable: React.FC<VehicleTableProps> = ({ vehicles }) => {
  const navigate = useNavigate();
  const { sortedData, requestSort, sortConfig } = useSorting(vehicles);
  const [mobileSortKey, setMobileSortKey] = useState<keyof Vehicle | "">(
    (sortConfig && sortConfig.key) || ""
  );
  const [mobileSortDirection, setMobileSortDirection] = useState<
    "asc" | "desc"
  >(sortConfig?.direction ?? "asc");

  React.useEffect(() => {
    setMobileSortKey(sortConfig?.key ?? "");
    setMobileSortDirection(sortConfig?.direction ?? "asc");
  }, [sortConfig]);

  if (sortedData.length === 0) {
    return (
      <div className="vehicle-table__empty">
        <p>No hay vehículos disponibles</p>
      </div>
    );
  }

  const getSortSymbol = (key: keyof Vehicle) => {
    if (!sortConfig) return "↕";
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "↑" : "↓";
    }
    return "↕";
  };

  const handleRowClick = (vehicle: Vehicle) => {
    // armamos un id seguro para la URL codificando los componentes, así evitamos caracteres inválidos
    const id = encodeURIComponent(
      `${vehicle.make}-${vehicle.model}-${vehicle.year}-${vehicle.transmission}`
    );
    navigate(`/vehicles/${id}`);
  };

  const handleRowKeyDown = (
    e: React.KeyboardEvent<HTMLTableRowElement>,
    vehicle: Vehicle
  ) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      handleRowClick(vehicle);
    }
  };

  const handleMobileSortChange = (key: keyof Vehicle | "") => {
    setMobileSortKey(key);
    if (key) requestSort(key, mobileSortDirection);
  };

  const toggleMobileDirection = () => {
    const next = mobileSortDirection === "asc" ? "desc" : "asc";
    setMobileSortDirection(next);
    if (mobileSortKey) requestSort(mobileSortKey, next);
  };

  return (
    <div className="vehicle-table">
      <div className="vehicle-table__container">
        <div className="vehicle-table__mobile-controls" aria-hidden={false}>
          <div className="vehicle-table__mobile-heading">Ordenar por</div>
          <div className="vehicle-table__mobile-row">
            <select
              className="vehicle-table__mobile-select"
              value={mobileSortKey as string}
              onChange={(e) =>
                handleMobileSortChange(e.target.value as keyof Vehicle | "")
              }
              aria-label="Seleccionar columna para ordenar"
            >
              <option value="">--</option>
              {COLUMNS.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="vehicle-table__mobile-toggle"
              onClick={toggleMobileDirection}
              aria-label={`Cambiar dirección a ${
                mobileSortDirection === "asc" ? "descendente" : "ascendente"
              }`}
            >
              {mobileSortDirection === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>

        <table className="vehicle-table__table">
          <thead className="vehicle-table__thead">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`vehicle-table__th vehicle-table__th--${col.key} ${
                    !col.mobile ? "vehicle-table__th--hidden-mobile" : ""
                  }`}
                  onClick={() => requestSort(col.key)}
                >
                  <span className="vehicle-table__th-content">
                    {col.label}
                    <span className="vehicle-table__sort-indicator">
                      {getSortSymbol(col.key)}
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="vehicle-table__tbody">
            {sortedData.map((vehicle: Vehicle) => (
              <tr
                key={`${vehicle.make}-${vehicle.model}-${vehicle.year}-${vehicle.transmission}`}
                className="vehicle-table__tr"
                onClick={() => handleRowClick(vehicle)}
                tabIndex={0}
                onKeyDown={(e) => handleRowKeyDown(e, vehicle)}
                role="button"
                aria-label={`Ver detalles de ${vehicle.make} ${vehicle.model} ${vehicle.year}`}
              >
                {COLUMNS.map((col) => (
                  <td
                    key={col.key}
                    className={`vehicle-table__td vehicle-table__td--${
                      col.key
                    } ${!col.mobile ? "vehicle-table__td--hidden-mobile" : ""}`}
                    data-label={col.label}
                  >
                    <VehicleCell colKey={col.key} vehicle={vehicle} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTable;
