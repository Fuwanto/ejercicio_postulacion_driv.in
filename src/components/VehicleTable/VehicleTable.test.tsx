import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import VehicleTable from "./VehicleTable";
import * as ReactRouter from "react-router";
import "@testing-library/jest-dom";

const vehicles = [
  {
    class: "compact car",
    fuel_type: "gas",
    make: "toyota",
    model: "corolla",
    year: 2020,
    transmission: "a",
    city_mpg: 30,
    highway_mpg: 40,
    combination_mpg: 35,
    cylinders: 4,
    displacement: 1.8,
    drive: "fwd",
  },
  {
    class: "suv",
    fuel_type: "diesel",
    make: "ford",
    model: "explorer",
    year: 2018,
    transmission: "m",
    city_mpg: 20,
    highway_mpg: 28,
    combination_mpg: 23,
    cylinders: 6,
    displacement: 3.5,
    drive: "awd",
  },
];

const defaultProps = {
  vehicles,
};

jest.mock("../../mocks/vehiclesMock", () => ({
  vehiclesMock: vehicles,
}));

// 1. Ordenar por columna
it("ordena por columna 'make'", () => {
  render(
    <MemoryRouter>
      <VehicleTable {...defaultProps} />
    </MemoryRouter>
  );
  const table = screen.getByRole("table");
  const makeHeader = within(table).getByText("Marca");
  fireEvent.click(makeHeader);
  const bodyRows = table.querySelectorAll("tbody tr");
  expect(bodyRows.length).toBeGreaterThanOrEqual(2);
  expect(bodyRows[0]).toHaveTextContent(/ford/i);
  expect(bodyRows[1]).toHaveTextContent(/toyota/i);
});

// 2. Aplicar un filtro y validar el resultado
it("muestra solo vehículos filtrados (simulación) por modelo 'corolla'", () => {
  const filtered = vehicles.filter((v) => v.model === "corolla");
  render(
    <MemoryRouter>
      <VehicleTable vehicles={filtered} />
    </MemoryRouter>
  );
  expect(screen.getByText(/corolla/i)).toBeInTheDocument();
  expect(screen.queryByText(/explorer/i)).not.toBeInTheDocument();
});

// 3. Visualizar un vehículo en el mapa (navegación)
it("navega al mapa del vehículo al hacer click en la fila", () => {
  const navigate = jest.fn();
  jest.spyOn(ReactRouter, "useNavigate").mockReturnValue(navigate);

  render(
    <MemoryRouter>
      <VehicleTable {...defaultProps} />
    </MemoryRouter>
  );

  // Buscamos la fila que tenga el modelo "explorer"
  const explorerRow = screen.getByText(/explorer/i).closest("tr");
  if (explorerRow) {
    fireEvent.click(explorerRow);
  } else {
    throw new Error("No se encontró la fila del modelo 'explorer'");
  }

  expect(navigate).toHaveBeenCalledWith("/vehicles/ford-explorer-2018-m");
});
