import type { Vehicle } from "../../types";

export const capitalize = (s: string | number | undefined) =>
  String(s ?? "").replace(/(^|\s)\S/g, (t) => t.toUpperCase());

export const fmtTransmission = (t?: string | number) => {
  if (!t && t !== 0) return "-";
  const v = String(t).toLowerCase();
  if (v === "a") return "Automático";
  if (v === "m") return "Manual";
  return capitalize(v);
};

export const fmtFuel = (f?: string | number) => {
  if (!f && f !== 0) return "-";
  const v = String(f).toLowerCase();
  if (v === "gas") return "Gasolina";
  if (v === "diesel") return "Diésel";
  if (v === "electric") return "Eléctrico";
  if (v === "hybrid") return "Híbrido";
  return capitalize(v);
};

export const fmtDrive = (d?: string | number) => {
  if (!d && d !== 0) return "-";
  const v = String(d).toLowerCase();
  if (v === "fwd") return "Tracción delantera";
  if (v === "rwd") return "Tracción trasera";
  if (v === "awd") return "4x4 / AWD";
  return capitalize(v);
};

export const fmtCylDisp = (vehicle: Vehicle) => {
  const cyl = vehicle.cylinders ?? null;
  const disp = vehicle.displacement ?? null;
  const parts: string[] = [];
  if (cyl !== null && cyl !== undefined) parts.push(`${cyl} cyl`);
  if (disp !== null && disp !== undefined) parts.push(`${disp}L`);
  return parts.join(" · ") || "-";
};
