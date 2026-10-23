import Link from 'next/link';
import '@/assets/css/globals.css';

export const metadata = {
  title: 'project-mvc | Reservation & Location Management',
  description: 'Full-stack MVC application built with Next.js App Router and MySQL 8.4',
};

const NAVIGATION_ITEMS = [
  { href: '/', label: 'Inicio' },
  { href: '/location/state', label: 'Departamentos' },
  { href: '/location/city', label: 'Ciudades' },
  { href: '/client/person', label: 'Personas' },
  { href: '/client/user', label: 'Usuarios' },
  { href: '/reservation/reservation-type', label: 'Tipos de Reserva' },
  { href: '/reservation', label: 'Reservas' },
];

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header className="main-header">
          <div className="header-inner">
            <Link href="/" className="brand-link">
              <span className="brand-badge">MVC</span>
              <span>project-mvc</span>
            </Link>
            <nav className="main-nav" aria-label="Main navigation">
              {NAVIGATION_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="main-container">{children}</main>
        <footer className="main-footer">
          <p>project-mvc &mdash; Next.js App Router + React + MySQL 8.4 (MVC Architecture)</p>
        </footer>
      </body>
    </html>
  );
}
