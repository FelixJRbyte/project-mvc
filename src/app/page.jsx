import Link from 'next/link';

const MODULE_GROUPS = [
  {
    moduleName: 'location',
    title: 'Módulo de Ubicación (Location)',
    entities: [
      {
        name: 'Departamentos / Estados',
        table: 'state',
        description: 'Catálogo raíz de departamentos o estados con código postal y descripción.',
        pageHref: '/location/state',
        apiHref: '/api/state',
      },
      {
        name: 'Ciudades',
        table: 'city',
        description: 'Gestión de ciudades asociadas a un departamento (FK state_id).',
        pageHref: '/location/city',
        apiHref: '/api/city',
      },
    ],
  },
  {
    moduleName: 'client',
    title: 'Módulo de Clientes (Client)',
    entities: [
      {
        name: 'Personas',
        table: 'person',
        description: 'Registro de datos básicos de personas con validación de correo único.',
        pageHref: '/client/person',
        apiHref: '/api/person',
      },
      {
        name: 'Usuarios',
        table: 'user',
        description: 'Cuentas de acceso vinculadas a una persona (FK person_id) con contraseña cifrada.',
        pageHref: '/client/user',
        apiHref: '/api/user',
      },
    ],
  },
  {
    moduleName: 'reservation',
    title: 'Módulo de Reservas (Reservation)',
    entities: [
      {
        name: 'Tipos de Reserva',
        table: 'reservation_type',
        description: 'Catálogo de modalidades o categorías disponibles para reservar.',
        pageHref: '/reservation/reservation-type',
        apiHref: '/api/reservation-type',
      },
      {
        name: 'Reservas',
        table: 'reservation',
        description: 'Gestión central de reservas integrando usuario, tipo de reserva y ciudad.',
        pageHref: '/reservation',
        apiHref: '/api/reservation',
      },
    ],
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="page-hero">
        <h1 className="page-hero-title">Sistema de Gestión de Reservas (project-mvc)</h1>
        <p className="page-hero-subtitle">
          Panel principal de navegación por módulos y entidades bajo arquitectura Modelo-Vista-Controlador
          con Next.js App Router y MySQL 8.4.
        </p>
      </section>

      {MODULE_GROUPS.map((group) => (
        <section key={group.moduleName} className="module-section">
          <div className="module-section-header">
            <h2 className="module-section-title">{group.title}</h2>
            <span className="module-tag">{group.moduleName}</span>
          </div>

          <div className="module-grid">
            {group.entities.map((entity) => (
              <article key={entity.table} className="module-card">
                <div>
                  <div className="module-card-title">
                    <span>{entity.name}</span>
                    <code className="module-card-code">{entity.table}</code>
                  </div>
                  <p className="module-card-desc">{entity.description}</p>
                </div>

                <div className="module-card-footer">
                  <code className="module-card-code">{entity.apiHref}</code>
                  <Link href={entity.pageHref} className="btn btn-primary btn-sm">
                    Gestionar &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
