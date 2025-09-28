import React from "react";
import type { Vehicle } from "../../types";
import {
  capitalize,
  fmtCylDisp,
  fmtDrive,
  fmtFuel,
  fmtTransmission,
} from "./cellHelpers";

interface VehicleCellProps {
  colKey: keyof Vehicle;
  vehicle: Vehicle;
}

// Componente responsable de renderizar el contenido de una celda según la columna
const VehicleCell: React.FC<VehicleCellProps> = ({ colKey, vehicle }) => {
  const value = vehicle[colKey];

  switch (colKey) {
    case "class":
      return <span className="vehicle-table__badge">{value ?? "-"}</span>;
    case "make":
      return (
        <div>
          <span className="vehicle-table__make">
            {capitalize(String(value))}
          </span>
          <small className="vehicle-table__specs">{fmtCylDisp(vehicle)}</small>
        </div>
      );
    case "model":
      return (
        <span className="vehicle-table__model">
          {capitalize(String(value))}
        </span>
      );
    case "year":
      return <span className="vehicle-table__year-pill">{value ?? "-"}</span>;
    case "transmission":
      return (
        <span className="vehicle-table__chip">
          {fmtTransmission(value as string)}
        </span>
      );
    case "fuel_type":
      return (
        <span className="vehicle-table__chip">{fmtFuel(value as string)}</span>
      );
    case "drive":
      return (
        <span className="vehicle-table__chip">{fmtDrive(value as string)}</span>
      );
    case "city_mpg":
      return (
        <div className="vehicle-table__mpg">
          <span className="mpg__dot mpg__dot--city" aria-hidden />
          <span className="mpg__value">{value ?? "-"} mpg</span>
        </div>
      );
    case "highway_mpg":
      return (
        <div className="vehicle-table__mpg">
          <span className="mpg__dot mpg__dot--highway" aria-hidden />
          <span className="mpg__value">{value ?? "-"} mpg</span>
        </div>
      );
    case "combination_mpg":
      return (
        <div className="vehicle-table__mpg">
          <span className="mpg__dot mpg__dot--combo" aria-hidden />
          <span className="mpg__value">{value ?? "-"} mpg</span>
        </div>
      );
    default:
      return <span>{String(value ?? "-")}</span>;
  }
};

export default VehicleCell;
