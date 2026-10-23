# Documentación - project-mvc

## governance/

| Documento | Contenido |
|---|---|
| [best-practice.md](governance/best-practice.md) | Idioma, notaciones (`kebab-case`, `snake_case`, `camelCase`, `PascalCase`) por capa, ramas y Conventional Commits del proyecto |

## prototype/

| Documento | Contenido |
|---|---|
| [01-design-thinking.md](prototype/01-design-thinking.md) | Proceso de Design Thinking (Empatizar, Definir, Idear, Prototipar y Evaluar) con wireframes de las vistas MVC |

## requirement/

| Documento | Contenido |
|---|---|
| [01-role-responsibility.md](requirement/01-role-responsibility.md) | Definición y matriz de responsabilidades de los roles Administrador (`admin`) y Cliente (`user`) |
| [02-functional-requirement.md](requirement/02-functional-requirement.md) | Especificación y listado de Requerimientos Funcionales (`RF-01` a `RF-24`) por módulo |
| [03-non-functional-requirement.md](requirement/03-non-functional-requirement.md) | Especificación y listado de Requerimientos No Funcionales (`RNF-01` a `RNF-14`) |

## agile/

| Documento | Contenido |
|---|---|
| [01-user-story.md](agile/01-user-story.md) | Catálogo de Historias de Usuario (`HU-01` a `HU-12`) con criterios de aceptación |
| [02-dor-dod.md](agile/02-dor-dod.md) | Criterios de calidad *Definition of Ready* (`DoR`) y *Definition of Done* (`DoD`) por capa MVC |
| [03-moscow.md](agile/03-moscow.md) | Matriz de priorización *MoSCoW* (*Must*, *Should*, *Could*, *Won't*) vinculada con `HU`, `RF` y `RNF` |

## architecture/

| Documento | Diagramas |
|---|---|
| [01-architecture.md](architecture/01-architecture.md) | Arquitectura de alto nivel y contenedores |
| [02-relational-model.md](architecture/02-relational-model.md) | Modelo relacional (MR) |
| [03-class-diagram.md](architecture/03-class-diagram.md) | Clases del dominio, capas MVC, controladores y modelos |
| [04-use-case-diagram.md](architecture/04-use-case-diagram.md) | Casos de uso del Cliente y del Administrador |
| [05-sequence-diagram.md](architecture/05-sequence-diagram.md) | Registrar persona, crear usuario, crear reserva, crear ciudad |

Las fuentes de los diagramas están en `architecture/diagrams/*.puml` (PlantUML) y cada una tiene su `.svg` generado al lado. `style.puml` define el estilo común.

Para regenerar los SVG después de editar un `.puml` (requiere Java y el [jar de PlantUML](https://github.com/plantuml/plantuml/releases)):

```bash
cd docs/architecture/diagrams
java -jar plantuml.jar -tsvg -charset UTF-8 [0-9]*.puml
```

## model-data/

| Script | Contenido |
|---|---|
| [01-schema.sql](model-data/01-schema.sql) | Crea la base `project_mvc` y las 6 tablas con PK, FK y UNIQUE (MySQL 8.4) |

Ejecutarlo contra MySQL:

```bash
mysql -u root -p < docs/model-data/01-schema.sql
```

El script borra y vuelve a crear las tablas: no se debe ejecutar sobre una base que ya tenga datos.
