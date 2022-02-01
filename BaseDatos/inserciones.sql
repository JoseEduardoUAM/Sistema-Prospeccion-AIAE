use bd_prospeccion_aiae;

# Crear Administradores
INSERT INTO `administrador`(`IdAdm`,`Nombre`,`Email`,`Password`) VALUES(0,"Jose Eduardo Hernandez","jeh@gmail.com",aes_encrypt("eduardo112233","key_secret_uam_aiae"));

# Retroalimentacion
INSERT INTO `retroalimentacion` (`IdRet`,`Nombre`) VALUES (0,"Retroalimentacion 1");
INSERT INTO `retroalimentacion` (`IdRet`,`Nombre`) VALUES (0,"Retroalimentacion 2");
INSERT INTO `retroalimentacion` (`IdRet`,`Nombre`) VALUES (0,"Retroalimentacion 3");
INSERT INTO `retroalimentacion` (`IdRet`,`Nombre`) VALUES (0,"Retroalimentacion 4");
INSERT INTO `retroalimentacion` (`IdRet`,`Nombre`) VALUES (0,"Retroalimentacion 5");

##############################################################################################################################################################3

# Prospectos
INSERT INTO `prospecto` (`IdPro`,`Nombre`,`Cargo`,`Telefono`,`Email`,`Observaciones`) VALUES (0,"Paloma Alondra Salinas","Director Ejecutivo",5523568912,"pas@gmail.com","La persona no decea comprar ningun producto, no se debe comunicar entre las 12:00 y 16:00");
INSERT INTO `prospecto` (`IdPro`,`Nombre`,`Cargo`,`Telefono`,`Email`,`Observaciones`) VALUES (0,"Jesus Flores","Administrador de Empresa",5558582614,"jf@gmail.com","Se debe comunicar entre las 11:00 y 13:00, los productos interesados son Vinil y Estaño");
INSERT INTO `prospecto` (`IdPro`,`Nombre`,`Cargo`,`Telefono`,`Email`,`Observaciones`) VALUES (0,"Dulce Guadalupe Macias","Directo de Comunicacion",5513134559,"dgm@gmail.com","Se debe proporcionar cantidades pequeñas de productos");
INSERT INTO `prospecto` (`IdPro`,`Nombre`,`Cargo`,`Telefono`,`Email`,`Observaciones`) VALUES (0,"Genaro Jorge Baas","Ingeniero de Obra",225636,"gjb@gmail.com","La persona esta interesada en comprar productos como acero, laton y alpaca");

# Relacion de Prospectos con retroalimentacion
INSERT INTO `relacionretro`(`IdRR`,`IdRet`,`IdPro`) VALUES (0,1,1);
INSERT INTO `relacionretro`(`IdRR`,`IdRet`,`IdPro`) VALUES (0,2,1);
INSERT INTO `relacionretro`(`IdRR`,`IdRet`,`IdPro`) VALUES (0,3,1);
INSERT INTO `relacionretro`(`IdRR`,`IdRet`,`IdPro`) VALUES (0,4,1);
INSERT INTO `relacionretro`(`IdRR`,`IdRet`,`IdPro`) VALUES (0,5,1);
INSERT INTO `relacionretro`(`IdRR`,`IdRet`,`IdPro`) VALUES (0,1,2);
INSERT INTO `relacionretro`(`IdRR`,`IdRet`,`IdPro`) VALUES (0,3,2);
INSERT INTO `relacionretro`(`IdRR`,`IdRet`,`IdPro`) VALUES (0,3,3);
INSERT INTO `relacionretro`(`IdRR`,`IdRet`,`IdPro`) VALUES (0,4,3);
INSERT INTO `relacionretro`(`IdRR`,`IdRet`,`IdPro`) VALUES (0,1,4);
INSERT INTO `relacionretro`(`IdRR`,`IdRet`,`IdPro`) VALUES (0,3,4);
INSERT INTO `relacionretro`(`IdRR`,`IdRet`,`IdPro`) VALUES (0,5,4);


# Fecha de Creacion (Relacion entre prospecto y administrador)
INSERT INTO `creacion`(`IdCre`,`Fecha`,`IdAdm`,`IdPro`) VALUES (0,"2022-01-28",1,1);
INSERT INTO `creacion`(`IdCre`,`Fecha`,`IdAdm`,`IdPro`) VALUES (0,"2022-01-29",1,2);
INSERT INTO `creacion`(`IdCre`,`Fecha`,`IdAdm`,`IdPro`) VALUES (0,"2022-01-29",1,3);
INSERT INTO `creacion`(`IdCre`,`Fecha`,`IdAdm`,`IdPro`) VALUES (0,"2022-01-30",1,4);


