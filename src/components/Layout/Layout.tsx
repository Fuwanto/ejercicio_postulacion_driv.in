import { Outlet, Link } from "react-router";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <header className="layout__header">
        <div className="layout__header-content">
          <Link to="/" className="layout__logo" aria-label="Ir al inicio">
            Driv.in - Gestor de Vehículos
          </Link>
        </div>
      </header>
      <main className="layout__main">
        <Outlet />
      </main>
      <footer className="layout__footer">
        <div className="layout__footer-content">
          <span>
            © {new Date().getFullYear()} Driv.in - Ejercicio Postulación
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
