import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCars } from "../../services/api";
import type { VehicleFilters } from "../../types";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import ModalFilters from "../../components/Filters/ModalFilters";
import Loader from "../../components/Loader/Loader";
import VehicleTable from "../../components/VehicleTable/VehicleTable";

import "./HomeView.css";

const HomeView = () => {
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<VehicleFilters>(() => {
    try {
      const raw = localStorage.getItem("drivin.filters");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [currentPage, setCurrentPage] = useState<number>(() => {
    try {
      const raw = localStorage.getItem("drivin.page");
      return raw ? Number(raw) || 1 : 1;
    } catch {
      return 1;
    }
  });
  const itemsPerPage = 20;

  const offset = (currentPage - 1) * itemsPerPage;
  const apiFilters = {
    ...filters,
    limit: itemsPerPage,
    offset,
  };

  const {
    data: vehicles = [],
    error,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getCars(apiFilters),
    queryKey: ["vehicles", itemsPerPage, offset, filters],
    retry: 1,
  });

  const hasNextPage = vehicles.length === itemsPerPage;

  useEffect(() => {
    try {
      localStorage.setItem("drivin.filters", JSON.stringify(filters));
    } catch (e) {
      console.warn("Could not persist filters to localStorage", e);
    }
  }, [filters]);

  useEffect(() => {
    try {
      localStorage.setItem("drivin.page", String(currentPage));
    } catch (e) {
      console.warn("Could not persist page to localStorage", e);
    }
  }, [currentPage]);

  return (
    <div className="home-view">
      <div className="home-view__container">
        <header className="home-view__header">
          <div className="home-view__header-content">
            <h1 className="home-view__title">Listado de Vehículos</h1>
            <button
              className="home-view__filters-btn"
              onClick={() => setShowFilters(true)}
              aria-label="Abrir filtros de búsqueda"
            >
              Filtros
              {Object.keys(filters).length > 0 && (
                <span className="home-view__filters-badge">
                  {Object.keys(filters).length}
                </span>
              )}
            </button>
          </div>

          {Object.keys(filters).length > 0 && (
            <div className="home-view__active-filters">
              <span className="home-view__active-filters-text">
                Filtros activos: {Object.keys(filters).length}
              </span>
              <button
                className="home-view__clear-filters"
                onClick={() => {
                  setFilters({});
                  setCurrentPage(1);
                }}
              >
                Limpiar
              </button>
            </div>
          )}
        </header>

        <ModalFilters
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          setFilter={(newFilters) => {
            setFilters(newFilters);
            setCurrentPage(1);
          }}
          clearFilters={() => {
            setFilters({});
            setCurrentPage(1);
          }}
        />

        <main className="home-view__main">
          {isLoading ? (
            <div className="home-view__loader-container">
              <Loader />
              <p className="home-view__loading-text">Cargando vehículos...</p>
            </div>
          ) : isError ? (
            <ErrorMessage>
              {error?.message || "Error al cargar los vehículos"}
            </ErrorMessage>
          ) : (
            <>
              <VehicleTable vehicles={vehicles} />

              {(vehicles.length > 0 || currentPage > 1) && (
                <div className="home-view__pagination">
                  <button
                    className="home-view__pagination-btn home-view__pagination-btn--prev"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    aria-label="Página anterior"
                  >
                    <span>←</span>
                    Anterior
                  </button>

                  <div className="home-view__pagination-info">
                    <span className="home-view__page-number">
                      Página {currentPage}
                    </span>
                  </div>

                  <button
                    className="home-view__pagination-btn home-view__pagination-btn--next"
                    disabled={!hasNextPage}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    aria-label="Página siguiente"
                  >
                    Siguiente
                    <span>→</span>
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomeView;
