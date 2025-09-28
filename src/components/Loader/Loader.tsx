import React from "react";
import "./Loader.css";

const Loader: React.FC = () => (
  <div className="loader">
    <div className="loader__spinner" />
    <div className="loader__text">
      Cargando vehículos <span className="loader__dots" />
    </div>
  </div>
);

export default Loader;
