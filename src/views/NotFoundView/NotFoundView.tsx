import "./NotFoundView.css";

export default function NotFoundView() {
  return (
    <div className="notfound">
      <div className="notfound__card">
        <h1 className="notfound__title">404</h1>
        <p className="notfound__subtitle">Página no encontrada</p>
        <p className="notfound__desc">
          Lo sentimos — la página que buscas no existe.
        </p>
        <div className="notfound__actions">
          <a href="/" className="notfound__link">
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
