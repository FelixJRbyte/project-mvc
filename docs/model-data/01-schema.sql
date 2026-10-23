-- =============================================================
-- project-mvc - Esquema de base de datos
-- Motor: MySQL 8.4 (InnoDB, utf8mb4)
-- Modelo: ../architecture/02-relational-model.md
-- Nombres: snake_case, minúsculas y singular (../governance/best-practice.md)
--
-- ATENCIÓN: el script borra y vuelve a crear las tablas.
-- Ejecutarlo sobre una base con datos los elimina.
--
-- Todas las llaves foráneas usan ON DELETE RESTRICT: no se puede
-- borrar un registro padre mientras tenga registros hijos.
-- =============================================================

SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS project_mvc
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE project_mvc;

-- Borrado en orden inverso a las dependencias
DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS reservation_type;
DROP TABLE IF EXISTS city;
DROP TABLE IF EXISTS state;

-- -------------------------------------------------------------
-- Módulo client
-- -------------------------------------------------------------

CREATE TABLE person (
  id    INT          NOT NULL AUTO_INCREMENT,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20)  NULL,
  CONSTRAINT pk_person PRIMARY KEY (id),
  CONSTRAINT uk_person_email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- `user` va entre comillas invertidas porque USER es palabra clave de MySQL
CREATE TABLE `user` (
  id        INT          NOT NULL AUTO_INCREMENT,
  username  VARCHAR(50)  NOT NULL,
  password  VARCHAR(255) NOT NULL COMMENT 'Hash de la contraseña, nunca texto plano',
  person_id INT          NOT NULL,
  CONSTRAINT pk_user PRIMARY KEY (id),
  CONSTRAINT uk_user_username UNIQUE (username),
  CONSTRAINT fk_user_person FOREIGN KEY (person_id)
    REFERENCES person (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- Módulo location
-- -------------------------------------------------------------

CREATE TABLE state (
  id          INT          NOT NULL AUTO_INCREMENT,
  postal_code VARCHAR(10)  NOT NULL,
  name        VARCHAR(100) NOT NULL,
  description VARCHAR(255) NULL,
  CONSTRAINT pk_state PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE city (
  id          INT          NOT NULL AUTO_INCREMENT,
  postal_code VARCHAR(10)  NOT NULL,
  name        VARCHAR(100) NOT NULL,
  description VARCHAR(255) NULL,
  state_id    INT          NOT NULL,
  CONSTRAINT pk_city PRIMARY KEY (id),
  CONSTRAINT fk_city_state FOREIGN KEY (state_id)
    REFERENCES state (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- Módulo reservation
-- -------------------------------------------------------------

CREATE TABLE reservation_type (
  id          INT          NOT NULL AUTO_INCREMENT,
  name        VARCHAR(50)  NOT NULL,
  description VARCHAR(255) NULL,
  CONSTRAINT pk_reservation_type PRIMARY KEY (id),
  CONSTRAINT uk_reservation_type_name UNIQUE (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE reservation (
  id                  INT          NOT NULL AUTO_INCREMENT,
  name                VARCHAR(100) NOT NULL,
  user_id             INT          NOT NULL,
  reservation_type_id INT          NOT NULL,
  city_id             INT          NOT NULL,
  CONSTRAINT pk_reservation PRIMARY KEY (id),
  CONSTRAINT fk_reservation_user FOREIGN KEY (user_id)
    REFERENCES `user` (id) ON DELETE RESTRICT,
  CONSTRAINT fk_reservation_reservation_type FOREIGN KEY (reservation_type_id)
    REFERENCES reservation_type (id) ON DELETE RESTRICT,
  CONSTRAINT fk_reservation_city FOREIGN KEY (city_id)
    REFERENCES city (id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
