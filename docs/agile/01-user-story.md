# Historias de Usuario (`HU-xx`) - project-mvc

Catálogo de **Historias de Usuario (`HU-01` a `HU-12`)** del proyecto `project-mvc`, redactadas bajo el estándar ágil (*Como [rol], quiero [objetivo], para [beneficio]*) con sus respectivos **Criterios de Aceptación (formato Gherkin)** y trazabilidad directa hacia los Requerimientos Funcionales ([`../requirement/02-functional-requirement.md`](../requirement/02-functional-requirement.md)) y Casos de Uso ([`../architecture/04-use-case-diagram.md`](../architecture/04-use-case-diagram.md)).

---

## 1. Índice de Historias de Usuario

| ID | Título de la Historia | Rol | Módulo | RF Asociados | Prioridad (MoSCoW) | Puntos (SP) |
|---|---|---|---|---|---|---|
| **HU-01** | Gestión de departamentos (`state`) | `admin` | `location` | RF-01, RF-02, RF-03 | Must Have | 3 |
| **HU-02** | Gestión de ciudades (`city`) | `admin` | `location` | RF-04, RF-05, RF-06 | Must Have | 5 |
| **HU-03** | Registro de persona (`person`) | `user` / `admin` | `client` | RF-07 | Must Have | 3 |
| **HU-04** | Administración del directorio de personas | `admin` | `client` | RF-08, RF-09, RF-10 | Must Have | 3 |
| **HU-05** | Creación de cuenta de usuario (`user`) con contraseña segura | `user` / `admin` | `client` | RF-11, RF-22 | Must Have | 5 |
| **HU-06** | Administración de cuentas de usuario | `admin` | `client` | RF-12, RF-13 | Must Have | 3 |
| **HU-07** | Gestión del catálogo de tipos de reserva (`reservation_type`) | `admin` | `reservation` | RF-14, RF-15, RF-16 | Must Have | 3 |
| **HU-08** | Creación de una reserva (`reservation`) | `user` / `admin` | `reservation` | RF-17 | Must Have | 5 |
| **HU-09** | Consulta de mis reservas personales | `user` | `reservation` | RF-18 | Should Have | 3 |
| **HU-10** | Cancelación de reserva por el cliente | `user` | `reservation` | RF-21 | Should Have | 2 |
| **HU-11** | Administración global de reservas | `admin` | `reservation` | RF-19, RF-20, RF-21 | Must Have | 3 |
| **HU-12** | Inicio de sesión y control de acceso por rol (`admin` / `user`) | `user` / `admin` | `client` | RF-23, RF-24 | Could Have | 5 |

---

## 2. Detalle y Criterios de Aceptación

### HU-01: Gestión de departamentos (`state`)
- **Como** Administrador (`admin`),
- **Quiero** crear, listar, editar y eliminar departamentos (`state`) con código postal, nombre y descripción,
- **Para** mantener actualizado el catálogo geográfico base donde operan las ciudades del sistema.

**Criterios de Aceptación:**
1. **Creación exitosa (`201 Created`):** *Dado* que ingreso `postalCode` y `name` válidos en `StateForm`, *cuando* envío el formulario, *entonces* se crea el departamento en la tabla `state` y aparece en `StateList`.
2. **Datos incompletos (`400 Bad Request`):** *Dado* que omito `postalCode` o `name`, *cuando* intento guardar, *entonces* el sistema rechaza la petición con código `400` y muestra el mensaje de validación.
3. **Protección al eliminar (`409 Conflict`):** *Dado* un departamento que ya tiene ciudades registradas en `city`, *cuando* intento eliminarlo, *entonces* el sistema impide el borrado (`ON DELETE RESTRICT`) y retorna `409 Conflict`.

---

### HU-02: Gestión de ciudades (`city`)
- **Como** Administrador (`admin`),
- **Quiero** registrar, consultar, actualizar y eliminar ciudades asociadas a un departamento existente,
- **Para** habilitar los destinos válidos en los que los clientes podrán realizar sus reservas.

**Criterios de Aceptación:**
1. **Validación de departamento (`201 Created` / `404 Not Found`):** *Dado* que completo `postalCode`, `name` y selecciono un `stateId`, *cuando* envío el formulario a `POST /api/city`, *entonces* el controlador verifica que el `state` exista (`404` si no existe) y crea la ciudad con estado `201`.
2. **Protección ante reservas activas (`409 Conflict`):** *Dado* que una ciudad tiene registros asociados en `reservation`, *cuando* intento eliminarla, *entonces* el sistema bloquea la operación con estado `409 Conflict`.

---

### HU-03: Registro de persona (`person`)
- **Como** Cliente (`user`) o Administrador (`admin`),
- **Quiero** registrar los datos personales (`name`, `email`, `phone`) validando que el correo electrónico no esté duplicado,
- **Para** contar con una identidad única en el sistema antes de asociar una cuenta de usuario.

**Criterios de Aceptación:**
1. **Registro exitoso (`201 Created`):** *Dado* que ingreso un `name` y un `email` disponible, *cuando* envío el formulario `PersonForm`, *entonces* se inserta el registro en `person` y recibo confirmación `201 Created`.
2. **Correo duplicado (`409 Conflict`):** *Dado* que el `email` ingresado ya existe en la tabla `person`, *cuando* envío el formulario, *entonces* `PersonController` detecta el duplicado mediante `findByEmail`, retorna `409 Conflict` y la vista muestra *"El email ya está registrado"*.
3. **Campos inválidos (`400 Bad Request`):** *Dado* que el `name` está vacío o el `email` no tiene formato válido, *cuando* envío el formulario, *entonces* recibo `400 Bad Request`.

---

### HU-04: Administración del directorio de personas
- **Como** Administrador (`admin`),
- **Quiero** listar, consultar, editar y eliminar registros de personas (`person`),
- **Para** mantener depurada y actualizada la información de contacto de los clientes.

**Criterios de Aceptación:**
1. **Listado y edición (`200 OK`):** *Dado* que accedo a `/client/person`, *cuando* selecciono editar una persona existente, *entonces* puedo actualizar su `name`, `email` (si no colisiona con otro registro) y `phone`.
2. **Restricción por usuario asociado (`409 Conflict`):** *Dado* que una persona ya tiene un registro en la tabla `user`, *cuando* intento eliminarla, *entonces* el sistema bloquea el borrado y devuelve `409 Conflict`.

---

### HU-05: Creación de cuenta de usuario (`user`) con contraseña segura
- **Como** Cliente (`user`) o Administrador (`admin`),
- **Quiero** crear una cuenta de usuario (`username`, `password`) vinculada a una persona existente (`personId`),
- **Para** habilitar el acceso al sistema y la titularidad de las reservas protegiendo la contraseña mediante hash.

**Criterios de Aceptación:**
1. **Validación de persona y hash (`201 Created`):** *Dado* que ingreso un `username` único, un `password` válido y un `personId` existente, *cuando* envío `POST /api/user`, *entonces* el sistema verifica que `person` exista (`404` si no existe), aplica hash a la contraseña con `hash-password.js` y guarda el usuario retornando `201 Created` sin exponer el campo `password`.
2. **Username duplicado (`409 Conflict`):** *Dado* que el `username` ya está en uso, *cuando* intento crear la cuenta, *entonces* el sistema responde `409 Conflict`.

---

### HU-06: Administración de cuentas de usuario
- **Como** Administrador (`admin`),
- **Quiero** listar, consultar, actualizar y eliminar cuentas de usuario sin que las contraseñas queden expuestas,
- **Para** gestionar los accesos a la plataforma cumpliendo las políticas de seguridad.

**Criterios de Aceptación:**
1. **Privacidad de `password` (`200 OK`):** *Dado* que consulto `GET /api/user` o `GET /api/user/[id]`, *cuando* recibo la respuesta JSON, *entonces* cada objeto contiene `id`, `username` y `personId`, pero nunca `password`.
2. **Restricción por reservas (`409 Conflict`):** *Dado* un usuario que tiene reservas registradas en `reservation`, *cuando* intento eliminarlo, *entonces* el sistema rechaza el borrado con `409 Conflict`.

---

### HU-07: Gestión del catálogo de tipos de reserva (`reservation_type`)
- **Como** Administrador (`admin`),
- **Quiero** crear, listar, actualizar y eliminar tipos de reserva (`name`, `description`),
- **Para** definir las categorías de servicio que los clientes pueden elegir al reservar.

**Criterios de Aceptación:**
1. **Unicidad de nombre (`201 Created` / `409 Conflict`):** *Dado* que ingreso un `name` para el tipo de reserva, *cuando* lo guardo, *entonces* se crea con `201 Created`, o devuelve `409 Conflict` si el nombre ya existe (`uk_reservation_type_name`).
2. **Protección de catálogo en uso (`409 Conflict`):** *Dado* un tipo de reserva vinculado a registros en `reservation`, *cuando* intento borrarlo, *entonces* el sistema lo impide con `409 Conflict`.

---

### HU-08: Creación de una reserva (`reservation`)
- **Como** Cliente (`user`) o Administrador (`admin`),
- **Quiero** crear una reserva indicando su nombre (`name`), el usuario titular (`userId`), el tipo de reserva (`reservationTypeId`) y la ciudad (`cityId`),
- **Para** dejar registrada formalmente una solicitud de servicio en una ubicación y modalidad válidas.

**Criterios de Aceptación:**
1. **Validación triple de llaves foráneas (`201 Created` / `404 Not Found`):** *Dado* que envío `POST /api/reservation` con `{ name, userId, reservationTypeId, cityId }`, *cuando* `ReservationController` procesa la solicitud, *entonces* verifica que existan el `user`, el `reservation_type` y la `city`; si alguno no existe retorna `404 Not Found`, y si todos existen crea la reserva con `201 Created`.
2. **Datos incompletos (`400 Bad Request`):** *Dado* que falta cualquiera de los 4 campos requeridos, *cuando* envío el formulario, *entonces* recibo `400 Bad Request`.

---

### HU-09: Consulta de mis reservas personales
- **Como** Cliente (`user`),
- **Quiero** consultar el listado de las reservas que están registradas a mi nombre,
- **Para** verificar los detalles (nombre, tipo de reserva y ciudad) de mis solicitudes activas.

**Criterios de Aceptación:**
1. **Filtro por titular (`200 OK`):** *Dado* que soy un cliente con `userId` activo, *cuando* consulto mis reservas, *entonces* visualizo únicamente los registros de `reservation` cuyo `user_id` coincide con el mío.

---

### HU-10: Cancelación de reserva por el cliente
- **Como** Cliente (`user`),
- **Quiero** cancelar (eliminar) una reserva propia desde mi vista de consulta,
- **Para** liberar el servicio cuando ya no necesite utilizarlo.

**Criterios de Aceptación:**
1. **Confirmación y borrado (`200 OK`):** *Dado* que visualizo mis reservas, *cuando* pulso eliminar sobre una reserva propia y confirmo la acción, *entonces* se ejecuta `DELETE /api/reservation/[id]` y la reserva desaparece del listado.

---

### HU-11: Administración global de reservas
- **Como** Administrador (`admin`),
- **Quiero** listar, consultar, editar y eliminar cualquier reserva registrada en el sistema,
- **Para** brindar soporte operativo y corregir o depurar reservas de cualquier usuario.

**Criterios de Aceptación:**
1. **CRUD completo (`200 OK` / `404 Not Found`):** *Dado* que accedo como `admin` a `/reservation`, *cuando* consulto, edito o elimino una reserva por su `id`, *entonces* puedo administrar todos los registros del sistema recibiendo `404 Not Found` si el `id` solicitado no existe.

---

### HU-12: Inicio de sesión y control de acceso por rol (`admin` / `user`)
- **Como** Usuario del sistema (`admin` o `user`),
- **Quiero** iniciar sesión con mi `username` y `password` y que el sistema identifique mi rol,
- **Para** acceder únicamente a las vistas y operaciones autorizadas según mis responsabilidades.

**Criterios de Aceptación:**
1. **Autenticación con hash:** *Dado* que ingreso mi `username` y `password`, *cuando* inicio sesión, *entonces* el sistema compara la contraseña contra el hash almacenado en `user.password`.
2. **Autorización por rol:** *Dado* un usuario autenticado, *cuando* su rol es `admin` tiene acceso completo a los catálogos (`state`, `city`, `reservation_type`), `person`, `user` y `reservation`; *cuando* su rol es `user`, solo puede crear, consultar y cancelar sus propias reservas.
