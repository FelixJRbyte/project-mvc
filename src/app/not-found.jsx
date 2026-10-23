import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="status-card">
      <div className="status-code">404</div>
      <h1 className="status-title">Página no encontrada</h1>
      <p className="status-message">
        La ruta que intentas consultar no existe o aún no ha sido habilitada.
      </p>
      <div className="action-row">
        <Link href="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
