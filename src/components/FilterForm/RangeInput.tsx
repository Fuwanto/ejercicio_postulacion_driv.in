import React from "react";

interface RangeInputProps {
  minName: string;
  maxName: string;
  valueMin?: string | number;
  valueMax?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  placeholderMin?: string;
  placeholderMax?: string;
}

// Componente pequeño que renderiza dos inputs (min / max) con el mismo estilo
const RangeInput: React.FC<RangeInputProps> = ({
  minName,
  maxName,
  valueMin,
  valueMax,
  onChange,
  min = 0,
  placeholderMin = "Min",
  placeholderMax = "Max",
}) => {
  return (
    <div className="filter-form__range-group">
      <input
        className="filter-form__range-input"
        name={minName}
        type="number"
        placeholder={placeholderMin}
        value={valueMin ?? ""}
        onChange={onChange}
        min={min}
      />
      <span className="filter-form__range-separator">-</span>
      <input
        className="filter-form__range-input"
        name={maxName}
        type="number"
        placeholder={placeholderMax}
        value={valueMax ?? ""}
        onChange={onChange}
        min={min}
      />
    </div>
  );
};

export default RangeInput;
