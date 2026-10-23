'use client';

import Link from 'next/link';

export default function GlobalErrorPage({ error, reset }) {
  return (
    <div className="status-card">
      <div className="status-code">Error</div>
      <h1 className="status-title">Ha ocurrido un problema inesperado</h1>
      <p className="status-message">
        {error?.message || 'No fue posible procesar la solicitud en este momento.'}
      </p>
      <div className="action-row">
        <button type="button" onClick={() => reset()} className="btn btn-primary">
          Reintentar
        </button>
        <Link href="/" className="btn btn-secondary">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
