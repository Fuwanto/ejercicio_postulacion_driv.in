import { useState, useMemo } from "react";
import type { Vehicle } from "../types";

export const useSorting = (
  data: Vehicle[],
  defaultSortBy: keyof Vehicle | null = null,
  defaultOrder: "asc" | "desc" = "asc"
) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Vehicle | null;
    direction: "asc" | "desc";
  }>({
    key: defaultSortBy,
    direction: defaultOrder,
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return [...data];
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortConfig.direction === "asc" ? -1 : 1;
      if (bValue == null) return sortConfig.direction === "asc" ? 1 : -1;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = (key: keyof Vehicle, direction?: "asc" | "desc") => {
    if (direction) {
      setSortConfig({ key, direction });
      return;
    }

    let nextDirection: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      nextDirection = "desc";
    }
    setSortConfig({ key, direction: nextDirection });
  };

  return { sortedData, requestSort, sortConfig };
};
