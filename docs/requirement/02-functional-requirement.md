# Requerimientos Funcionales (RF) - project-mvc

Especificación y listado oficial de los **Requerimientos Funcionales (`RF-01` a `RF-24`)** del sistema `project-mvc`, organizados por módulo (`location`, `client`, `reservation` y autenticación/autorización), alineados con el modelo relacional ([`../architecture/02-relational-model.md`](../architecture/02-relational-model.md)), los casos de uso ([`../architecture/04-use-case-diagram.md`](../architecture/04-use-case-diagram.md)) y los diagramas de secuencia ([`../architecture/05-sequence-diagram.md`](../architecture/05-sequence-diagram.md)).

---

## 1. Resumen por Módulo

| Módulo | Rango de RF | Entidades Cubiertas | Roles Involucrados |
|---|---|---|---|
| **Módulo Location** | `RF-01` a `RF-06` | `state`, `city` | `admin` (CRUD), `user` (Lectura) |
| **Módulo Client** | `RF-07` a `RF-13` | `person`, `user` | `admin` (CRUD), `user` (Registro / Perfil) |
| **Módulo Reservation** | `RF-14` a `RF-21` | `reservation_type`, `reservation` | `admin` (CRUD total), `user` (Mis reservas) |
| **Seguridad y Roles** | `RF-22` a `RF-24` | `user` (Sesión y permisos) | `admin`, `user` |

---

## 2. Listado de Requerimientos Funcionales

### 2.1 Módulo de Ubicación (`location`)

| Código | Nombre | Descripción | Rol | Reglas de Negocio y Respuestas HTTP |
|---|---|---|---|---|
| **RF-01** | Crear departamento (`state`) | El sistema debe permitir registrar un nuevo departamento con `postalCode`, `name` y `description` opcional. | `admin` | - `postalCode` y `name` son obligatorios (`400 Bad Request` si faltan).<br>- Retorna `201 Created` con el registro creado. |
| **RF-02** | Consultar departamentos (`state`) | El sistema debe permitir listar todos los departamentos y obtener el detalle de un departamento por su `id`. | `admin`, `user` | - `GET /api/state` retorna `200 OK`.<br>- `GET /api/state/[id]` retorna `404 Not Found` si el `id` no existe. |
| **RF-03** | Actualizar y eliminar departamento (`state`) | El sistema debe permitir editar los datos de un departamento o eliminarlo por su `id`. | `admin` | - Si el departamento tiene ciudades (`city`) asociadas, impide el borrado (`ON DELETE RESTRICT`) y retorna `409 Conflict`. |
| **RF-04** | Crear ciudad (`city`) | El sistema debe permitir registrar una ciudad indicando `postalCode`, `name`, `description` opcional y `stateId`. | `admin` | - Valida que `stateId` exista en la tabla `state` antes de insertar (`404 Not Found` si no existe).<br>- Retorna `201 Created`. |
| **RF-05** | Consultar ciudades (`city`) | El sistema debe permitir listar todas las ciudades y consultar una ciudad por su `id`. | `admin`, `user` | - `GET /api/city` retorna `200 OK` (usado también en los selectores de reserva).<br>- `404 Not Found` si el `id` no existe. |
| **RF-06** | Actualizar y eliminar ciudad (`city`) | El sistema debe permitir modificar una ciudad validando su `stateId` o eliminarla si no está en uso. | `admin` | - Si la ciudad tiene reservas (`reservation`) asociadas, bloquea la eliminación y retorna `409 Conflict`. |

---

### 2.2 Módulo de Clientes (`client`)

| Código | Nombre | Descripción | Rol | Reglas de Negocio y Respuestas HTTP |
|---|---|---|---|---|
| **RF-07** | Registrar persona (`person`) | El sistema debe permitir registrar una persona con `name`, `email` y `phone` opcional. | `admin`, `user` | - `name` y `email` con formato válido son obligatorios (`400 Bad Request`).<br>- Valida que `email` no esté registrado (`409 Conflict` si se repite).<br>- Retorna `201 Created`. |
| **RF-08** | Consultar personas (`person`) | El sistema debe permitir listar las personas registradas y consultar una persona por `id`. | `admin` (`user` propio) | - `GET /api/person` y `GET /api/person/[id]` retornan `200 OK` o `404 Not Found` si no existe. |
| **RF-09** | Actualizar persona (`person`) | El sistema debe permitir actualizar `name`, `email` y `phone` de una persona existente. | `admin` (`user` propio) | - Verifica existencia del `id` (`404`) y que el nuevo `email` no pertenezca a otra persona (`409 Conflict`). |
| **RF-10** | Eliminar persona (`person`) | El sistema debe permitir eliminar el registro de una persona por su `id`. | `admin` | - Si la persona tiene una cuenta `user` asociada (`fk_user_person`), impide el borrado y retorna `409 Conflict`. |
| **RF-11** | Crear usuario (`user`) | El sistema debe permitir crear una cuenta de usuario con `username`, `password` y `personId`. | `admin`, `user` | - Valida que `personId` exista en `person` (`404 Not Found`).<br>- Valida que `username` sea único (`409 Conflict`).<br>- Aplica hash a `password` antes de guardar en BD.<br>- Retorna `201 Created` sin incluir `password`. |
| **RF-12** | Consultar usuarios (`user`) | El sistema debe permitir listar los usuarios y consultar un usuario por `id` ocultando siempre la contraseña. | `admin` (`user` propio) | - El modelo jamás devuelve la columna `password` en ninguna consulta.<br>- Retorna `200 OK` o `404 Not Found`. |
| **RF-13** | Actualizar y eliminar usuario (`user`) | El sistema debe permitir actualizar un usuario (re-hasheando `password` si cambia) o eliminarlo. | `admin` | - Si el usuario tiene reservas (`reservation`) asociadas (`fk_reservation_user`), impide el borrado y retorna `409 Conflict`. |

---

### 2.3 Módulo de Reservas (`reservation`)

| Código | Nombre | Descripción | Rol | Reglas de Negocio y Respuestas HTTP |
|---|---|---|---|---|
| **RF-14** | Crear tipo de reserva (`reservation_type`) | El sistema debe permitir crear un tipo de reserva con `name` único y `description` opcional. | `admin` | - `name` es obligatorio (`400 Bad Request`) y único (`409 Conflict` si ya existe).<br>- Retorna `201 Created`. |
| **RF-15** | Consultar tipos de reserva (`reservation_type`) | El sistema debe permitir listar todos los tipos de reserva disponibles y consultar por `id`. | `admin`, `user` | - `GET /api/reservation-type` retorna `200 OK` para poblar selectores y tablas.<br>- `404 Not Found` si el `id` no existe. |
| **RF-16** | Actualizar y eliminar tipo de reserva (`reservation_type`) | El sistema debe permitir editar o eliminar un tipo de reserva del catálogo. | `admin` | - Si existen reservas asociadas al tipo (`fk_reservation_reservation_type`), retorna `409 Conflict` al intentar eliminar. |
| **RF-17** | Crear reserva (`reservation`) | El sistema debe permitir registrar una reserva indicando `name`, `userId`, `reservationTypeId` y `cityId`. | `admin`, `user` | - Valida campos requeridos (`400 Bad Request`).<br>- Valida que existan `userId` en `user`, `reservationTypeId` en `reservation_type` y `cityId` en `city` (`404 Not Found` si alguno no existe).<br>- Retorna `201 Created`. |
| **RF-18** | Consultar mis reservas (`reservation` - Cliente) | El sistema debe permitir al cliente consultar únicamente las reservas asociadas a su propio `userId`. | `user` | - Filtra los registros de `reservation` por el usuario autenticado/seleccionado.<br>- Retorna `200 OK`. |
| **RF-19** | Consultar todas las reservas (`reservation` - Admin) | El sistema debe permitir al administrador listar todas las reservas del sistema y ver el detalle por `id`. | `admin` | - `GET /api/reservation` y `GET /api/reservation/[id]` retornan `200 OK` o `404 Not Found`. |
| **RF-20** | Actualizar reserva (`reservation`) | El sistema debe permitir modificar `name`, `userId`, `reservationTypeId` o `cityId` de una reserva existente. | `admin` (`user` propia) | - Verifica que la reserva exista (`404`) y que las 3 llaves foráneas (`userId`, `reservationTypeId`, `cityId`) sean válidas (`404`). |
| **RF-21** | Cancelar / Eliminar reserva (`reservation`) | El sistema debe permitir cancelar (eliminar) una reserva existente previa confirmación del usuario. | `admin`, `user` | - `user` puede cancelar sus propias reservas desde su consulta; `admin` puede eliminar cualquier reserva.<br>- Retorna `200 OK` (o `404 Not Found` si no existe). |

---

### 2.4 Autenticación y Control de Roles

| Código | Nombre | Descripción | Rol | Reglas de Negocio y Respuestas HTTP |
|---|---|---|---|---|
| **RF-22** | Registro integral de cliente | El sistema debe permitir a un nuevo cliente registrarse completando primero sus datos de `person` y acto seguido su cuenta `user`. | `user` | - Caso de uso *Registrarse* (`«include» Registrar persona`).<br>- Garantiza unicidad de `email` y `username`. |
| **RF-23** | Inicio de sesión (Login) | El sistema debe permitir autenticar a un usuario comparando su `username` y el hash de su `password`. | `admin`, `user` | - Verifica credenciales contra el hash almacenado en `user.password`.<br>- Rechaza credenciales inválidas con mensaje genérico seguro. |
| **RF-24** | Diferenciación de permisos por rol (`admin` vs. `user`) | El sistema debe restringir la administración de catálogos (`state`, `city`, `reservation_type`) y el padrón global de usuarios al rol `admin`, permitiendo al rol `user` gestionar sus propias reservas. | `admin`, `user` | - Cumple la matriz RBAC definida en [`01-role-responsibility.md`](01-role-responsibility.md). |
