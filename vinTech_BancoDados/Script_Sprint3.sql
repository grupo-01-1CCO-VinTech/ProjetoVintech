CREATE DATABASE Vin_tech_Sprint3;
	
USE Vin_tech_Sprint3;

CREATE TABLE Empresa (
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

CREATE TABLE Funcionario (
	idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
	nomeFuncionario VARCHAR(45),
	fkChefe INT,
	FOREIGN KEY (fkChefe) REFERENCES Funcionario (idFuncionario),
	imagemUsuario TEXT,
	senhaFuncionario VARCHAR(45),
	emailFuncionario VARCHAR(60),
	fkEmpresa INT,
	FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);

CREATE TABLE Plantacao (
	idPlantacao INT PRIMARY KEY AUTO_INCREMENT,
	nomePlantacao VARCHAR(45),
	cidadePlantacao varchar(50),
	ufPlantacao char(2),
	fkEmpresa INT,
	FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa)
);

CREATE TABLE Uva (
	idUva INT PRIMARY KEY AUTO_INCREMENT,
	nomeUva VARCHAR(45),
	tempMax DECIMAL(4,2),
	tempMin DECIMAL(4,2),
	umidMax INT(2),
	umidMin INT(2)
);

CREATE TABLE Estufa (
	idEstufa INT PRIMARY KEY AUTO_INCREMENT,
	nomeEstufa VARCHAR(45),
	areaEstufa INT,
	fkPlantacao INT,
	fkUva INT,
	FOREIGN KEY (fkPlantacao) REFERENCES Plantacao (idPlantacao),
	FOREIGN KEY (fkUva) REFERENCES Uva (idUva)
);

CREATE TABLE Sensor (
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
	localSensor VARCHAR(45),
	fkEstufa INT,
	FOREIGN KEY (fkEstufa) REFERENCES Estufa (idEstufa)
);

CREATE TABLE Registro (
	idRegistro INT PRIMARY KEY AUTO_INCREMENT,
	temperaturaRegistro DECIMAL(4,2),
	umidadeRegistro DECIMAL(4,2),
	dataRegistro DATETIME,
	fkSensor INT,
	FOREIGN KEY (fkSensor) REFERENCES Sensor (idSensor)
);
			
-- select nomeEstufa, idSensor, umidadeRegistro, temperaturaRegistro, nomeUva, tempMax, tempMin, umidMax, umidMin
-- from registro, (select max(idregistro) as idRegistro
-- from registro group by fkSensor) as idRecente, sensor, estufa, plantacao, empresa, uva
-- where idRecente.idRegistro = registro.idRegistro and
-- Registro.fkSensor = idSensor and fkEstufa = idEstufa and fkPlantacao = idPlantacao and fkEmpresa = 1 and fkUva = idUva;

INSERT INTO Uva VALUES (NULL, 'Pinot Noir', 17.00, 10.00, 75, 12),                       
					   (NULL, 'Carménère', 15.80, 5.30, 43, 05),
					   (NULL, 'Syrah', 18.20, 13.85, 82, 23),                       
					   (NULL, 'Tempranillo', 15.80, 5.30, 21, 01),
					   (NULL, 'Merlot', 24.23, 12.72, 72, 34);	

-- Aqui para realizar este INSERT precisa de ter uma empresa cadastrada, cadastre pela página de cadastro
DESC Plantacao;
INSERT INTO Plantacao VALUES (NULL, 'Plantação Manaus', 'Manaus', 'AM', 1),
							 (NULL, 'Plantação Jundiaí', 'Jundaí', 'SP', 1);

-- Só de INSERT na estufa, caso queira testar e não tenha configurado na tela de DashboardConfig.html 
DESC Estufa;
INSERT INTO Estufa VALUES (NULL, 'Estufa Pinot Noir 001', 100, 1, 1),	
						  (NULL, 'Estufa Merlot 001', 155, 1, 5),
						  (NULL, 'Estufa Syrah 002', 222, 1, 3),
						  (NULL, 'Estufa Carménère 003', 155, 2, 2),
						  (NULL, 'Estufa Tempranillo 001', 456, 2, 4),
						  (NULL, 'Estufa Pinot Noir 002', 145, 2, 1); 


DESC Sensor;
INSERT INTO Sensor values (NULL,'Corredor 3', 1),
						  (NULL, 'Corredor 5', 2),
						  (NULL, 'Corredor 1', 3), 
						  (NULL, 'Corredor 12', 4),
						  (NULL, 'Corredor 2', 5),
						  (NULL, 'Corredor 6', 6);

-- Se quiser testar aqui com outros sensores, mude a fkSensor
DESC Registro; 

-- Estufa 001 Pinot Noir
INSERT INTO Registro VALUES (NULL, 14, 45, now(), 1);

-- Estufa 002 Merlot
INSERT INTO Registro VALUES (NULL, 12, 80, now(), 2);

-- Estufa 003 Syrah
INSERT INTO Registro VALUES (NULL, 29, 53, now(), 3);

-- Estufa 004 Carménère
INSERT INTO Registro VALUES (NULL, 10.55, 23, now(), 4);

-- Estufa 005 Tempranillo
INSERT INTO Registro VALUES (NULL, 23, 59, now(), 5);

-- Estufa 006 Pinot Noir
INSERT INTO Registro VALUES (NULL, 12, 57, now(), 6);

SELECT * FROM Empresa;
SELECT * FROM Funcionario;
SELECT * FROM Plantacao;
SELECT * FROM Estufa;
SELECT * FROM Uva;
SELECT * FROM Sensor;
SELECT * FROM Registro;

SELECT 
	idEstufa, nomeEstufa, nomeUva, tempMax, tempMin, umidMax, umidMin, temperaturaRegistro, umidadeRegistro, MAX(dataRegistro)
FROM 
	Estufa, Uva, Registro, empresa, 
	(SELECT idPlantacao FROM plantacao, empresa WHERE fkEmpresa = idEmpresa AND idEmpresa = 1) AS plantaEmpresa
WHERE
	fkUva = idUva AND fkSensor = idEstufa and plantaEmpresa.idPlantacao = fkPlantacao AND
	dataRegistro = (SELECT MAX(dataRegistro) FROM registro) GROUP BY idEstufa ORDER BY dataRegistro DESC;
