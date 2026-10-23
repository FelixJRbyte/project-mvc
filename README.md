# project-mvc

Aplicación web full-stack construida con **Next.js (App Router) + React** y **MySQL 8.4**, estructurada bajo el patrón arquitectónico **MVC (Model-View-Controller)** y contenerizada con **Docker Compose**.

## Módulos y Entidades

| Módulo | Entidades | Descripción |
|---|---|---|
| `location` | `state`, `city` | Gestión de departamentos/estados y ciudades |
| `client` | `person`, `user` | Registro de personas y cuentas de usuario |
| `reservation` | `reservation-type`, `reservation` | Catálogo de tipos de reserva y gestión de reservas |

## Estructura del Proyecto

```text
project-mvc/
├── docs/                   # Documentación de gobernanza, prototipo, requerimientos, ágil, arquitectura y SQL
├── public/                 # Archivos estáticos públicos
├── src/
│   ├── app/                # Rutas de páginas (page.jsx) y endpoints API (route.js)
│   ├── view/               # Componentes React de presentación (listas, formularios, shared)
│   ├── controller/         # Validación de datos y reglas de negocio por entidad
│   ├── model/              # Acceso a datos MySQL y mapeo snake_case <-> camelCase
│   └── assets/             # Estilos globales, imágenes y librerías transversales (library/)
├── Dockerfile              # Imagen de la aplicación Next.js
├── docker-compose.yml      # Orquestación de contenedores (app + db MySQL 8.4)
└── package.json            # Dependencias y scripts del proyecto
```

## Requisitos Previos

- **Node.js** >= 20 LTS (recomendado v22+)
- **Docker** y **Docker Compose** (o instancia local de **MySQL 8.4**)

## Instalación y Ejecución

### Opción 1: Con Docker Compose (Recomendado)

1. Copiar el archivo de variables de entorno:
   ```bash
   cp .env.example .env
   ```
2. Construir y levantar los contenedores (`app` y `db`):
   ```bash
   docker compose up -d --build
   ```
3. Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

### Opción 2: Desarrollo Local

1. Configurar las variables de entorno en `.env` apuntando a tu servidor MySQL local (`DB_HOST=localhost`) y ejecutar los scripts SQL (`01-schema.sql` y `02-seed.sql`).
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

## Documentación y Gobernanza

- [Índice general de documentación](docs/README.md)
- [Buenas prácticas y convenciones (best-practice.md)](docs/governance/best-practice.md)
- [Design Thinking y prototipado](docs/prototype/01-design-thinking.md)
- [Roles y responsabilidades (`admin` y `user`)](docs/requirement/01-role-responsibility.md)
- [Requerimientos funcionales (`RF-01` a `RF-24`)](docs/requirement/02-functional-requirement.md)
- [Requerimientos no funcionales (`RNF-01` a `RNF-14`)](docs/requirement/03-non-functional-requirement.md)
- [Historias de usuario (`HU-01` a `HU-12`)](docs/agile/01-user-story.md)
- [Definition of Ready (`DoR`) y Definition of Done (`DoD`)](docs/agile/02-dor-dod.md)
- [Matriz de priorización MoSCoW](docs/agile/03-moscow.md)
- [Arquitectura de alto nivel](docs/architecture/01-architecture.md)
- [Modelo relacional](docs/architecture/02-relational-model.md)
- [Diagrama de clases](docs/architecture/03-class-diagram.md)
- [Casos de uso](docs/architecture/04-use-case-diagram.md)
- [Diagramas de secuencia](docs/architecture/05-sequence-diagram.md)
