import "./FilterForm.css";
import React, { useEffect, useState } from "react";
import type { VehicleFilters } from "../../types";
import { asNumber, rangeValid, inputVal } from "../../utils/filterFormUtils";
import RangeInput from "./RangeInput";

interface FilterFormProps {
  initialFilters: VehicleFilters;
  onApply: (filters: VehicleFilters) => void;
  onClear: () => void;
  onClose: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  initialFilters,
  onApply,
  onClear,
  onClose,
}) => {
  const [localFilters, setLocalFilters] =
    useState<VehicleFilters>(initialFilters);

  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  const isValidCombRange = rangeValid(
    asNumber(localFilters.min_comb_mpg),
    asNumber(localFilters.max_comb_mpg)
  );
  const isValidCityRange = rangeValid(
    asNumber(localFilters.min_city_mpg),
    asNumber(localFilters.max_city_mpg)
  );
  const isValidHwyRange = rangeValid(
    asNumber(localFilters.min_hwy_mpg),
    asNumber(localFilters.max_hwy_mpg)
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : Number(value),
    }));
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidCombRange || !isValidCityRange || !isValidHwyRange) return;
    onApply(localFilters);
    onClose();
  };

  const handleClear = () => {
    setLocalFilters({});
    onClear();
    onClose();
  };

  return (
    <form className="filter-form" onSubmit={handleApply}>
      <div className="filter-form__group">
        <label className="filter-form__label" htmlFor="class">
          Tipo de auto:
        </label>
        <input
          className="filter-form__input"
          id="class"
          name="class"
          value={localFilters.class || ""}
          onChange={handleChange}
          placeholder="Ej: sedan, coupe, suv"
        />
      </div>
      <div className="filter-form__group">
        <label className="filter-form__label" htmlFor="make">
          Marca:
        </label>
        <input
          className="filter-form__input"
          id="make"
          name="make"
          value={localFilters.make || ""}
          onChange={handleChange}
        />
      </div>
      <div className="filter-form__group">
        <label className="filter-form__label" htmlFor="model">
          Modelo:
        </label>
        <input
          className="filter-form__input"
          id="model"
          name="model"
          value={localFilters.model || ""}
          onChange={handleChange}
        />
      </div>
      <div className="filter-form__group">
        <label className="filter-form__label" htmlFor="year">
          Año:
        </label>
        <input
          className="filter-form__input"
          id="year"
          name="year"
          type="number"
          value={localFilters.year || ""}
          onChange={handleChange}
        />
      </div>
      <div className="filter-form__group">
        <label className="filter-form__label" htmlFor="transmission">
          Transmisión:
        </label>
        <div className="filter-form__select-wrap">
          <select
            className="filter-form__select"
            id="transmission"
            name="transmission"
            value={localFilters.transmission || ""}
            onChange={handleChange}
            aria-label="Transmisión"
          >
            <option value="">Todas</option>
            <option value="m">Manual</option>
            <option value="a">Automática</option>
          </select>
        </div>
      </div>
      <div className="filter-form__group">
        <label className="filter-form__label">Consumo ciudad (mi/gal):</label>
        <RangeInput
          minName="min_city_mpg"
          maxName="max_city_mpg"
          valueMin={inputVal(localFilters, "min_city_mpg")}
          valueMax={inputVal(localFilters, "max_city_mpg")}
          onChange={handleRangeChange}
          min={0}
        />
        {!isValidCityRange && (
          <span className="filter-form__error">
            El mínimo debe ser menor o igual al máximo
          </span>
        )}
      </div>
      <div className="filter-form__group">
        <label className="filter-form__label">
          Consumo carretera (mi/gal):
        </label>
        <RangeInput
          minName="min_hwy_mpg"
          maxName="max_hwy_mpg"
          valueMin={inputVal(localFilters, "min_hwy_mpg")}
          valueMax={inputVal(localFilters, "max_hwy_mpg")}
          onChange={handleRangeChange}
          min={0}
        />
        {!isValidHwyRange && (
          <span className="filter-form__error">
            El mínimo debe ser menor o igual al máximo
          </span>
        )}
      </div>
      <div className="filter-form__group">
        <label className="filter-form__label">Consumo mixto (mi/gal):</label>
        <RangeInput
          minName="min_comb_mpg"
          maxName="max_comb_mpg"
          valueMin={inputVal(localFilters, "min_comb_mpg")}
          valueMax={inputVal(localFilters, "max_comb_mpg")}
          onChange={handleRangeChange}
          min={0}
        />
        {!isValidCombRange && (
          <span className="filter-form__error">
            El mínimo debe ser menor o igual al máximo
          </span>
        )}
      </div>
      <div className="filter-form__actions">
        <button
          className="filter-form__btn filter-form__btn--apply"
          type="submit"
          disabled={!(isValidCombRange && isValidCityRange && isValidHwyRange)}
        >
          Aplicar
        </button>
        <button
          className="filter-form__btn filter-form__btn--clear"
          type="button"
          onClick={handleClear}
        >
          Limpiar
        </button>
        <button
          className="filter-form__btn filter-form__btn--close"
          type="button"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
