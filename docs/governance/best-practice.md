# Buenas prácticas - project-mvc

Reglas obligatorias para todo el que aporte código al proyecto. Si algo no está aquí, se sigue el estilo del código que ya existe.

## 1. Principios

| Regla | Detalle |
|---|---|
| **Código 100 % en inglés** | Carpetas, archivos, variables, funciones, clases, componentes, tablas, columnas, rutas, ramas y commits. La prosa de la documentación (este archivo, por ejemplo) puede ir en español |
| **Entidades en singular** | `person`, `user`, `reservation_type`, `city`; nunca `persons`, `users` ni `cities` |
| **Atributos en singular** | `name`, `email`, `person_id`. Un atributo solo va en plural si es una lista: `persons: Person[]` |
| **Minúsculas por defecto** | Carpetas, archivos, URL, tablas y columnas van en minúsculas. Las mayúsculas solo aparecen donde la tabla de la sección 2 lo indica |
| **Sin tildes, ñ ni espacios** | En ningún nombre técnico. `location`, no `ubicación`; `year`, no `año` |
| **Nombres que describen** | `getById`, no `get2`; `reservationList`, no `data` ni `aux` |

## 2. Cuándo usar cada notación

| Notación | Ejemplo | Se usa en |
|---|---|---|
| `kebab-case` | `reservation-type` | Carpetas, archivos, URL, ramas, clases CSS, documentación |
| `snake_case` | `reservation_type` | Base de datos: nombre de la base, tablas, columnas, restricciones e índices |
| `camelCase` | `reservationTypeId` | JavaScript: variables, funciones, métodos, propiedades y campos JSON de la API |
| `PascalCase` | `ReservationForm` | JavaScript: componentes React y clases |
| `UPPER_SNAKE_CASE` | `DB_HOST`, `MAX_PAGE_SIZE` | Variables de entorno y constantes globales |

Regla corta: **lo que es un archivo o una URL va en kebab-case, lo que vive en la base de datos va en snake_case y lo que vive dentro del código JavaScript va en camelCase o PascalCase.**

## 3. Por capa

### 3.1 Front (view)

| Elemento | Notación | Ejemplo |
|---|---|---|
| Carpeta | kebab-case | `src/view/reservation/reservation-type/` |
| Archivo de componente | kebab-case | `reservation-type-form.jsx` |
| Nombre del componente | PascalCase | `export default function ReservationTypeForm()` |
| Props, estado, handlers | camelCase | `reservationType`, `isLoading`, `handleSubmit` |
| Booleanos | camelCase con `is`, `has`, `can` | `isOpen`, `hasError`, `canDelete` |
| Archivo CSS | kebab-case | `reservation.module.css`, `globals.css` |
| Clase CSS global | kebab-case | `.main-header` |
| Clase en CSS Modules | camelCase | `.formRow` → `styles.formRow` |
| Imágenes y documentos | kebab-case | `logo-sena.png`, `user-manual.pdf` |

### 3.2 Rutas de Next.js (`src/app/`)

| Elemento | Notación | Ejemplo |
|---|---|---|
| Segmento de URL | kebab-case, singular | `/reservation/reservation-type` |
| Segmento dinámico | Lo exige Next.js | `[id]` |
| Archivos especiales | Nombre fijo de Next.js | `page.jsx`, `layout.jsx`, `route.js`, `loading.jsx`, `not-found.jsx` |
| Endpoint de API | kebab-case, singular | `/api/reservation-type/[id]` |

### 3.3 Back (controller y model)

| Elemento | Notación | Ejemplo |
|---|---|---|
| Archivo | kebab-case con el sufijo de la capa | `reservation-type-controller.js`, `reservation-type-model.js` |
| Clase | PascalCase | `ReservationTypeController` |
| Función o método | camelCase, verbo + objeto | `getAll`, `getById`, `create`, `update`, `remove` |
| Variable | camelCase | `reservationTypeId` |
| Constante | UPPER_SNAKE_CASE | `DEFAULT_PAGE_SIZE` |
| Campo JSON de entrada/salida | camelCase | `{ "reservationTypeId": 1, "cityId": 4 }` |
| Utilidad en `assets/library` | kebab-case | `hash-password.js`, `format-date.js` |

El **model** es la frontera entre las dos convenciones: recibe y devuelve camelCase (`personId`) y traduce a snake_case (`person_id`) solo dentro del SQL.

### 3.4 Base de datos (MySQL)

| Elemento | Notación | Ejemplo |
|---|---|---|
| Base de datos | snake_case | `project_mvc` |
| Tabla | snake_case, singular | `person`, `reservation_type` |
| Columna | snake_case, singular | `name`, `postal_code` |
| Llave primaria | `id` | `id` |
| Llave foránea | `<tabla>_id` | `person_id`, `reservation_type_id`, `city_id` |
| Primary key | `pk_<tabla>` | `pk_person` |
| Unique | `uk_<tabla>_<columna>` | `uk_person_email` |
| Foreign key | `fk_<tabla>_<tabla_referenciada>` | `fk_reservation_city` |
| Índice | `ix_<tabla>_<columna>` | `ix_city_name` |
| Script | kebab-case con número de orden | `01-schema.sql`, `02-seed.sql` |
| Palabras SQL | MAYÚSCULAS | `CREATE TABLE`, `NOT NULL` |

Los nombres van en minúsculas porque **MySQL en Linux (Docker) distingue mayúsculas en los nombres de tabla**: `Person` y `person` son tablas distintas. Escribirlo todo en minúsculas evita errores que en Windows no aparecen.

### 3.5 Documentación

| Elemento | Notación | Ejemplo |
|---|---|---|
| Carpeta | kebab-case, en inglés | `docs/architecture/`, `docs/model-data/`, `docs/governance/` |
| Archivo | kebab-case, en inglés, con número si hay orden de lectura | `01-architecture.md`, `best-practice.md` |
| Diagrama | kebab-case, en inglés, el mismo nombre para el `.puml` y el `.svg` | `02-relational-model.puml` / `.svg` |
| Excepción | Nombre que exige la herramienta | `README.md` |

### 3.6 Archivos de configuración

Se respeta el nombre que exige cada herramienta: `Dockerfile`, `docker-compose.yml`, `package.json`, `next.config.mjs`, `jsconfig.json`, `.env`, `.env.example`, `.gitignore`, `.dockerignore`.

## 4. Ramas

| Rama | Uso | Recibe cambios de |
|---|---|---|
| `main` | Producción. Solo código liberado | `qa` |
| `qa` | Pruebas y validación | `develop` |
| `develop` | Integración del trabajo diario | ramas de trabajo |

Las ramas de trabajo salen de `develop`, se nombran `<tipo>/<scope>-<descripcion-corta>` en kebab-case y vuelven a `develop` por pull request:

```
feat/person-crud
fix/reservation-city-validation
docs/governance-best-practice
db/reservation-city-id
```

Flujo: `rama de trabajo → develop → qa → main`. Nunca se hace commit directo en `qa` ni en `main`.

## 5. Conventional Commits del proyecto

### Formato

```
<tipo>(<scope>): <descripción>

[cuerpo opcional: qué cambió y por qué]

[footer opcional: Refs: #12 | BREAKING CHANGE: ...]
```

- **Idioma:** inglés.
- **Descripción:** en minúscula, modo imperativo (`add`, `fix`, `remove`; no `added` ni `adds`), sin punto final.
- **Longitud de la primera línea:** máximo 72 caracteres.
- **Tamaño:** un commit es un cambio lógico. No se mezcla un `feat` con un `refactor`.

### Tipos

| Tipo | Cuándo |
|---|---|
| `feat` | Funcionalidad nueva para el usuario |
| `fix` | Corrección de un error |
| `db` | **(propio del proyecto)** Cambio en el esquema o en los datos iniciales de MySQL (`model-data/*.sql`) |
| `docs` | Solo documentación o diagramas |
| `style` | Formato, espacios o punto y coma, sin cambiar la lógica |
| `refactor` | Cambio de estructura sin cambiar el comportamiento |
| `test` | Agregar o corregir pruebas |
| `build` | Dependencias, `package.json`, `Dockerfile`, `docker-compose.yml` |
| `ci` | Integración continua (GitHub Actions) |
| `chore` | Mantenimiento que no entra en las anteriores (estructura de carpetas, `.gitignore`) |
| `perf` | Mejora de rendimiento |
| `revert` | Revierte un commit anterior |

### Scopes

| Grupo | Scopes |
|---|---|
| Módulo | `client`, `reservation`, `location` |
| Entidad | `person`, `user`, `reservation-type`, `state`, `city` |
| Capa | `view`, `api`, `controller`, `model` |
| Transversal | `db`, `docker`, `config`, `assets`, `governance`, `architecture` |

Se usa el scope más específico que describa el cambio. Si el cambio toca varios módulos, se omite el scope.

### Ejemplos

```
feat(person): add person list and form views
feat(reservation): validate city_id before creating a reservation
fix(user): hide password hash in get responses
db(reservation): add city_id foreign key to reservation
docs(architecture): add sequence diagram for create city
build(docker): add mysql service to docker-compose
refactor(model): map snake_case columns to camelCase fields
chore: add base folder structure with .gitkeep
```

Con cambio que rompe compatibilidad:

```
db(client)!: rename tables to lowercase snake_case

BREAKING CHANGE: Person, User and ReservationType tables are now
person, user and reservation_type. Recreate the database volume.
```

## 6. Checklist antes de hacer push

- [ ] Todos los nombres nuevos están en inglés, en singular y con la notación de la sección 2.
- [ ] No hay tildes, ñ ni espacios en nombres técnicos.
- [ ] El commit sigue el formato de la sección 5.
- [ ] Estoy en una rama de trabajo o en `develop`, no en `qa` ni en `main`.
- [ ] No subo `.env` ni credenciales.
