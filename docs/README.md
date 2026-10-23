# Documentación - project-mvc

## governance/

| Documento | Contenido |
|---|---|
| [best-practice.md](governance/best-practice.md) | Idioma, notaciones (kebab-case, snake_case, camelCase, PascalCase) por capa, ramas y Conventional Commits del proyecto |

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
