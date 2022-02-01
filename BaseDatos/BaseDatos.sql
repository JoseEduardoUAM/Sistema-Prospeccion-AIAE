-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bd_prospeccion_aiae
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bd_prospeccion_aiae
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd_prospeccion_aiae` DEFAULT CHARACTER SET utf8 ;
USE `bd_prospeccion_aiae` ;

-- -----------------------------------------------------
-- Table `bd_prospeccion_aiae`.`Retroalimentacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_prospeccion_aiae`.`Retroalimentacion` (
  `IdRet` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`IdRet`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_prospeccion_aiae`.`Prospecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_prospeccion_aiae`.`Prospecto` (
  `IdPro` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NULL,
  `Cargo` VARCHAR(45) NULL,
  `Telefono` DECIMAL(14) NULL,
  `Email` VARCHAR(100) NULL,
  `Observaciones` VARCHAR(300) NULL,
  PRIMARY KEY (`IdPro`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_prospeccion_aiae`.`RelacionRetro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_prospeccion_aiae`.`RelacionRetro` (
  `IdRR` INT NOT NULL AUTO_INCREMENT,
  `IdRet` INT NOT NULL,
  `IdPro` INT NOT NULL,
  PRIMARY KEY (`IdRR`, `IdRet`, `IdPro`),
  INDEX `fk_RelacionRetro_Retroalimentacion_idx` (`IdRet` ASC) VISIBLE,
  INDEX `fk_RelacionRetro_Prospecto1_idx` (`IdPro` ASC) VISIBLE,
  CONSTRAINT `fk_RelacionRetro_Retroalimentacion`
    FOREIGN KEY (`IdRet`)
    REFERENCES `bd_prospeccion_aiae`.`Retroalimentacion` (`IdRet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RelacionRetro_Prospecto1`
    FOREIGN KEY (`IdPro`)
    REFERENCES `bd_prospeccion_aiae`.`Prospecto` (`IdPro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_prospeccion_aiae`.`Administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_prospeccion_aiae`.`Administrador` (
  `IdAdm` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(50) NULL,
  `Email` VARCHAR(100) NULL,
  `Password` BLOB NULL,
  PRIMARY KEY (`IdAdm`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_prospeccion_aiae`.`Creacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_prospeccion_aiae`.`Creacion` (
  `IdCre` INT NOT NULL AUTO_INCREMENT,
  `Fecha` DATE NULL,
  `IdAdm` INT NOT NULL,
  `IdPro` INT NOT NULL,
  PRIMARY KEY (`IdCre`, `IdAdm`, `IdPro`),
  INDEX `fk_Creacion_Administrador1_idx` (`IdAdm` ASC) VISIBLE,
  INDEX `fk_Creacion_Prospecto1_idx` (`IdPro` ASC) VISIBLE,
  CONSTRAINT `fk_Creacion_Administrador1`
    FOREIGN KEY (`IdAdm`)
    REFERENCES `bd_prospeccion_aiae`.`Administrador` (`IdAdm`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Creacion_Prospecto1`
    FOREIGN KEY (`IdPro`)
    REFERENCES `bd_prospeccion_aiae`.`Prospecto` (`IdPro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
