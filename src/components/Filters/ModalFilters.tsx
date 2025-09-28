import { useRef } from "react";
import type { VehicleFilters } from "../../types";
import FilterForm from "../FilterForm/FilterForm";

import "./ModalFilters.css";

interface ModalFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: VehicleFilters;
  setFilter: (filters: VehicleFilters) => void;
  clearFilters: () => void;
}

const ModalFilters: React.FC<ModalFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  setFilter,
  clearFilters,
}) => {
  // referencia al overlay (el contenedor del modal)
  const overlayRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <div
      className="modal-filters"
      role="dialog"
      aria-modal="true"
      aria-label="Filtros de vehiculos"
      ref={overlayRef}
      tabIndex={-1}
      onClick={(e) => {
        // si se hace click en el overlay (fuera del contenido) cerramos
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="modal-filters__content">
        <div className="modal-filters__header">
          <h2 className="modal-filters__title">Filtros de veh\u00edculos</h2>
        </div>
        <FilterForm
          initialFilters={filters}
          onApply={setFilter}
          onClear={clearFilters}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default ModalFilters;
