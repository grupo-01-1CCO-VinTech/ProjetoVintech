CREATE DATABASE Vin_tech_Sprint3;

USE Vin_tech_Sprint3;

select nomeEstufa, idSensor, umidadeRegistro, temperaturaRegistro, nomeUva, tempMax, tempMin, umidMax, umidMin
from registro, (select max(idregistro) as idRegistro from registro group by fkSensor) as idRecente, sensor, estufa, plantacao, empresa, uva
where idRecente.idRegistro = registro.idRegistro and Registro.fkSensor = idSensor and fkEstufa = idEstufa and fkPlantacao = idPlantacao and fkEmpresa = 1 and fkUva = idUva;

select idEstufa, nomeEstufa, nomeUva, tempMax, tempMin, umidMax, umidMin, temperaturaRegistro, umidadeRegistro, max(dataRegistro) from Estufa, Uva, Registro, empresa, 
        (select idPlantacao from plantacao, empresa where fkEmpresa = idEmpresa and idEmpresa = 1) as plantaEmpresa
        where fkUva = idUva and fkSensor = idEstufa and plantaEmpresa.idPlantacao = fkPlantacao and 
        dataRegistro = (select max(dataRegistro) from registro) group by idEstufa order by dataRegistro desc;

CREATE TABLE Empresa(
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    CNPJEmpresa CHAR(18),
    nomeEmpresa VARCHAR(60),
    nomeFantasia VARCHAR(45),
    cepEmpresa CHAR(9),
    logradouroEmpresa VARCHAR(60),
    numeroLogradouro INT,
    bairroEmpresa VARCHAR(45),
    cidadeEmpresa VARCHAR(50),
    ufEmpresa CHAR(2),
    telefoneEmpresa CHAR(16),
    telefoneSecEmpresa CHAR(16),
    emailEmpresa VARCHAR(60)
);

CREATE TABLE Funcionario(
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nomeFuncionario VARCHAR(45),
    fkChefe INT,
    FOREIGN KEY (fkChefe) REFERENCES Funcionario (idFuncionario),
    imagemUsuario VARCHAR(600),
    senhaFuncionario VARCHAR(45),
    emailFuncionario VARCHAR(60),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);

CREATE TABLE Plantacao(
    idPlantacao INT PRIMARY KEY AUTO_INCREMENT,
    nomePlantacao VARCHAR(45),
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);

CREATE TABLE Uva(
    idUva INT PRIMARY KEY AUTO_INCREMENT,
    nomeUva VARCHAR(45),
    tempMax DECIMAL(4,2),
    tempMin DECIMAL(4,2),
    umidMax INT(2),
    umidMin INT(2)
);

CREATE TABLE Estufa(
    idEstufa INT PRIMARY KEY AUTO_INCREMENT,
    areaEstufa INT,
    fkPlantacao INT,
    fkUva INT,
    nomeEstufa varchar(45),
    FOREIGN KEY (fkPlantacao) REFERENCES Plantacao (idPlantacao),
    FOREIGN KEY (fkUva) REFERENCES Uva (idUva)
);

CREATE TABLE Sensor(
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    localSensor VARCHAR(45),
    fkEstufa INT,
    FOREIGN KEY (fkEstufa) REFERENCES Estufa (idEstufa)
);

CREATE TABLE Registro(
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    temperaturaRegistro DECIMAL(4,2),
    umidadeRegistro DECIMAL(4,2),
    dataRegistro DATETIME,
    fkSensor INT,
    FOREIGN KEY (fkSensor) REFERENCES Sensor (idSensor)
);

select *from empresa;
select *from funcionario;
select *from plantacao;
select *from estufa;
select *from uva;
select *from sensor;
select *from registro;

    
INSERT INTO Empresa VALUES (NULL, '12.092.839/0201-23', 'INHANDUVA PARTICIPACOES LTDA' , 'INHANDUVA', '91320-000', 'Rua Sete de Setembro', 601, 'Centro Histórico', 'Porto Alegre', 'RS', '(41)92326-3234', NULL, 'inhaduva@gmail.com'),
						   (NULL, '34.632.239/3241-43', 'SUVALAN SUCOS DE FRUTAS, INDUSTRIA E COMERCIO LTDA' , 'SUVALAN', '95700-010', 'Linha Leopoldina', 6, 'Vale dos Vinhedos', 'Bento Goncalves', 'RS', '(41)92326-3234', '(41)92366-4384', 'suvalan_uva@hotmail.com'),
                           (NULL, '13.435.577/5351-33', 'BERTHOUVAN COMERCIAL AGRICOLA LTDA' , 'BERTHOUVAN', '98035-210', 'Avenida Placido de Castro', 1425, 'Jardim Petrópolis', 'Cruz Alta', 'RS', '(41)94321-1653', NULL, 'berthouvan_sucos@hotmail.com'),
						   (NULL, '53.863.227/6421-27', 'DUVALE TRANSPORTES' , 'DUVALE', '98035-210', 'Rua Joao Gregorio Paniz', 687, 'Centenario', 'Caxias do Sul', 'SC', '(41)97121-4874', '(41)92231-4544', 'duvale_suco@gmail.com');

INSERT INTO Funcionario VALUES (NULL, 'Pedro Almeida', NULL, 'PedroAlmeida', 'pedro123', 'pedro_uvas@gmail.com', 1),
							   (NULL, 'Enzo Nunes', 1, 'EnzoNunes', 'enzo_ferrari', 'enzo_laferrari@gmail.com', 1),
                               (NULL, 'José Espina', 1, 'JoseEspina', 'jose_alface', 'jose_espina@hotmail.com', 1),
                               (NULL, 'Emerson Jake', 2, 'EmersonJake', 'emerson_pipoca', 'emerson_merci@outlook.com', 1),
                               (NULL, 'Gabriel Napoleão', NULL, 'Gabriel_Nap', 'gabrielparis', 'gab_alleparis@gmail.com', 2),
                               (NULL, 'Julia Romeu', 5, 'JuliaRomeu', 'juliashake', 'julinha_romeu@hotmail.com', 2),
                               (NULL, 'Vitória Aspas', 6, 'Vitoria.A', 'vitoriaaspas', 'vi_aspas@gmail.com', 2),
                               (NULL, 'Gustavo Lucas', 7, 'G.Lucaas', 'gugalucas', 'g_lucas@outlook.com', 2),
                               (NULL, 'Cristina Navarro', NULL, 'C.Navarro', 'crisnav', 'cris_navarro@gmail.com', 3),
                               (NULL, 'Bruno Paiva', 9, 'B.Paiva', 'bruna_lanches', 'bruna_paiva@hotmail.com', 3),
                               (NULL, 'Caio Almirante', 9, 'CaioAlmirante', 'caio_alma', 'c_almirante@gmail.com', 3),
                               (NULL, 'Leonardo Astro', 9, 'Leo_Astro', 'leoastro', 'leo_astro@gmail.com', 3),
                               (NULL, 'Giovana Giorno', NULL, 'G.Giorno', 'gi_bizarre', 'g_giorno@hotmail.com', 4),
                               (NULL, 'Jonathan Joestar', 13, 'JoJo', 'jhonny123', 'j_joestar@gmail.com', 4),
                               (NULL, 'Kevin Kujo', 14, 'KevinKj', 'kevin_watch', 'kevin_kj@outlook.com', 4),
                               (NULL, 'Violeta Carvalho', 14, 'VioletCarv', 'violetadasrosas', 'vi_carv@hotmail.com', 4);

INSERT INTO Plantacao VALUES (NULL, 1),
						     (NULL, 2),
							 (NULL, 2),
                             (NULL, 3),
                             (NULL, 4);

INSERT INTO Uva VALUES (NULL, 'Pinot Noir', 10.00, 17.00, 75, 12),
                       (NULL, 'Carménère', 5.30, 15.80, 43, 05),
                       (NULL, 'Syrah', 13.85, 18.20, 82, 23),
                       (NULL, 'Tempranillo', 5.30, 15.80, 21, 01),
                       (NULL, 'Merlot', 12.72, 24.23, 72, 34);						

INSERT INTO Estufa VALUES (NULL, 1100, 1, 1),
						  (NULL, 2500, 1, 2),
                          (NULL, 1700, 1, 3),
                          (NULL, 10000, 2, 4),
                          (NULL, 1500, 2, 5),
                          (NULL, 13000, 2, 1),
                          (NULL, 2300, 3, 2),
                          (NULL, 12400, 3, 3),
                          (NULL, 11230, 3, 4),
                          (NULL, 1230, 4, 5),
                          (NULL, 12105, 4, 1),
                          (NULL, 1027, 4, 2),
                          (NULL, 10300, 5, 3),
                          (NULL, 11040, 5, 4),
                          (NULL, 4500, 5, 5);

INSERT INTO TipoSensor VALUES (NULL, 'DHT-11');

INSERT INTO Sensor VALUES (NULL, 'Corredor 1', 1, 1);

INSERT INTO Sensor VALUES (NULL, 'Corredor 1', 1, 1),
						  (NULL, 'Corredor 2', 1, 1),
                          (NULL, 'Corredor 3', 1, 1),
                          (NULL, 'Corredor 1', 2, 1),
						  (NULL, 'Corredor 2', 2, 1),
                          (NULL, 'Corredor 3', 2, 1),
                          (NULL, 'Corredor 1', 3, 1),
						  (NULL, 'Corredor 2', 3, 1),
                          (NULL, 'Corredor 3', 3, 1),
						  (NULL, 'Corredor 1', 4, 1),
						  (NULL, 'Corredor 2', 4, 1),
                          (NULL, 'Corredor 3', 4, 1),
                          (NULL, 'Corredor 1', 5, 1),
						  (NULL, 'Corredor 2', 5, 1),
                          (NULL, 'Corredor 3', 5, 1),
                          (NULL, 'Corredor 1', 6, 1),
						  (NULL, 'Corredor 2', 6, 1),
                          (NULL, 'Corredor 3', 6, 1),
                          (NULL, 'Corredor 1', 7, 1),
						  (NULL, 'Corredor 2', 7, 1),
                          (NULL, 'Corredor 3', 7, 1),
                          (NULL, 'Corredor 1', 8, 1),
						  (NULL, 'Corredor 2', 8, 1),
                          (NULL, 'Corredor 3', 8, 1),
                          (NULL, 'Corredor 1', 9, 1),
						  (NULL, 'Corredor 2', 9, 1),
                          (NULL, 'Corredor 3', 9, 1),
                          (NULL, 'Corredor 1', 10, 1),
						  (NULL, 'Corredor 2', 10, 1),
                          (NULL, 'Corredor 3', 10, 1),
                          (NULL, 'Corredor 1', 11, 1),
						  (NULL, 'Corredor 2', 11, 1),
                          (NULL, 'Corredor 3', 11, 1),
                          (NULL, 'Corredor 1', 12, 1),
						  (NULL, 'Corredor 2', 12, 1),
                          (NULL, 'Corredor 3', 12, 1),
                          (NULL, 'Corredor 1', 13, 1),
						  (NULL, 'Corredor 2', 13, 1),
                          (NULL, 'Corredor 3', 13, 1),
                          (NULL, 'Corredor 1', 14, 1),
						  (NULL, 'Corredor 2', 14, 1),
                          (NULL, 'Corredor 3', 14, 1),
                          (NULL, 'Corredor 1', 15, 1),
						  (NULL, 'Corredor 2', 15, 1),
                          (NULL, 'Corredor 3', 15, 1);

INSERT INTO Registro VALUES (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 1),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 1),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 1),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 1),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 1),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 1),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 2),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 2),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 2),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 2),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 2),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 2),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 3),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 3),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 3),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 3),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 3),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 3),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 4),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 4),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 4),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 4),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 4),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 4),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 5),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 5),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 5),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 5),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 5),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 5),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 6),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 6),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 6),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 6),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 6),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 6),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 7),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 7),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 7),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 7),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 7),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 7),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 8),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 8),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 8),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 8),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 8),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 8),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 9),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 9),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 9),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 9),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 9),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 9),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 10),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 10),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 10),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 10),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 10),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 10),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 11),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 11),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 11),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 11),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 11),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 11),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 12),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 12),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 12),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 12),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 12),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 12),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 13),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 13),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 13),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 13),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 13),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 13),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 14),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 14),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 14),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 14),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 14),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 14),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 15),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 15),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 15),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 15),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 15),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 15),
							(NULL, 12.5, 43.2, '2023-05-13 17:45:56', 16),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 16),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 16),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 16),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 16),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 16),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 17),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 17),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 17),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 17),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 17),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 17),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 18),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 18),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 18),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 18),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 18),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 18),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 19),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 19),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 19),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 19),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 19),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 19),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 20),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 20),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 20),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 20),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 20),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 20),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 21),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 21),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 21),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 21),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 21),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 21),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 22),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 22),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 22),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 22),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 22),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 22),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 23),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 23),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 23),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 23),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 23),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 23),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 24),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 24),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 24),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 24),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 24),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 24),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 25),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 25),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 25),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 25),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 25),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 25),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 26),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 26),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 26),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 26),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 26),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 26),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 27),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 27),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 27),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 27),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 27),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 27),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 28),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 28),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 28),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 28),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 28),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 28),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 29),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 29),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 29),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 29),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 29),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 29),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 30),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 30),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 30),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 30),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 30),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 30),
                            (NULL, 16.8, 23.2, '2023-05-13 12:32:16', 31),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 31),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 31),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 31),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 31),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 31),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 32),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 32),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 32),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 32),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 32),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 32),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 33),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 33),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 33),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 33),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 33),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 33),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 34),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 34),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 34),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 34),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 34),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 34),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 35),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 35),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 35),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 35),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 35),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 35),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 36),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 36),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 36),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 36),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 36),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 36),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 37),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 37),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 37),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 37),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 37),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 37),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 38),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 38),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 38),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 38),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 38),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 38),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 39),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 39),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 39),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 39),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 39),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 39),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 40),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 40),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 40),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 40),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 40),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 40),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 41),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 41),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 41),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 41),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 41),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 41),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 42),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 42),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 42),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 42),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 42),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 42),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 43),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 43),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 43),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 43),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 43),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 43),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 44),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 44),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 44),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 44),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 44),
                            (NULL, 12.5, 43.2, '2023-05-13 17:45:56', 44),
							(NULL, 16.8, 23.2, '2023-05-13 12:32:16', 45),
                            (NULL, 14.7, 12.1, '2023-05-13 11:10:26', 45),
                            (NULL, 10.2, 52.7, '2023-05-13 10:32:36', 45),
                            (NULL, 16.2, 65.3, '2023-05-13 09:06:46', 45),
                            (NULL, 13.2, 48.9, '2023-05-13 08:15:09', 45),
                            (NULL, 13.2, 48.9, '2023-05-13 12:15:09', 45);