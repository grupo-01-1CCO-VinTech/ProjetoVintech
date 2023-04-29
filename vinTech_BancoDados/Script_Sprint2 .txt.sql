CREATE DATABASE Tech_Noir_Vin_Tech;

USE Tech_Noir_Vin_Tech;

CREATE TABLE Uva (
idUva INT PRIMARY KEY AUTO_INCREMENT,
nomeUva VARCHAR(45),
TempMax DECIMAL,
TempMin DECIMAL,
UmidMax DECIMAL,
UmidMin DECIMAL CHECK (UmidMin > 0)
);

CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
CNPJ CHAR(18),
nomeEmpresa VARCHAR(60),
nomeFantasia VARCHAR(45),
cepEmpresa CHAR(9),
logradouroEmpresa VARCHAR(45),
numeroEmpresa INT,
bairroEmpresa VARCHAR(45),
cidadeEmpresa VARCHAR (45),
ufEmpresa CHAR(2),
telefoneEmpresa CHAR(14),
telefoneSecunadarioEmpresa CHAR(14),
emailEmpresa VARCHAR(45)
);

CREATE TABLE Funcionario (
idFuncionario INT,
fkChefe INT,
FOREIGN KEY (fkChefe) REFERENCES Funcionario (idFuncionario),
nomeFuncionario VARCHAR(45),
loginFuncionario VARCHAR(45),
email VARCHAR(45),
senhaFuncionario VARCHAR(45),
FkEmpresa INT,
FOREIGN KEY (FkEmpresa) REFERENCES Empresa (idEmpresa),
PRIMARY KEY (idFuncionario, fkEmpresa) 
);

CREATE TABLE Estufa (
idEstufa INT,
areaEstufa INT CHECK (areaEstufa > 0),
fkEmpresa_estufa INT, 
fkUva INT,
FOREIGN KEY (fkUva) REFERENCES Uva (idUva),
FOREIGN KEY (fkEmpresa_estufa) REFERENCES Empresa (idEmpresa),
PRIMARY KEY (idEstufa, fkEmpresa_estufa)
);

CREATE TABLE TipoSensor (
idTipoSensor INT PRIMARY KEY AUTO_INCREMENT,
nomeSensor CHAR(10)
);

CREATE TABLE Sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
LocalSensor VARCHAR (45),
FkEstufa_sensor INT,
FkTipo INT,
FOREIGN KEY (FkEstufa_sensor) REFERENCES Estufa (idEstufa),
FOREIGN KEY (FkTipo) REFERENCES TipoSensor(idTipoSensor)
);

CREATE TABLE Registro (
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
temperatura_registro DECIMAL(4,2),
umidade_registro DECIMAL (4,2),
data_registro DATETIME,
fkSensor_registro INT,
FOREIGN KEY (fkSensor_registro) REFERENCES Sensor (idSensor)
);
-- Tabelas criadas 

DESC Empresa;

INSERT INTO Empresa VALUES (NULL,'69.682.151/0001-33', 'Casillero Del Diablo', 'Viña Concha y Toro', '42346-119', 'Valle del Maipo', 129, 'Almaviva', 'Santiago', 'ST', '(11)7322-89223',NULL, 'casillerodeltoro@outlook.com'),
                           (NULL,'33.534.423/0001-28', 'Gallo', 'E & J Gallo Winery', '76532-336', 'Modesto', 140, 'Thundebird', 'California', 'CT', '(21)4002-89222', '(41)1234-9672', 'gallowinery@hotmail.com');

SELECT * FROM Empresa;
                           
DESC Funcionario;  
                    
INSERT INTO Funcionario VALUES (1, NULL,'João Silva','02231149','joao.silva@casillerodd.com','senha##', 1),
							   (2, 1, 'Ana Souza','02567892', 'ana.souza@casillerodd.com', '567890', 1),
							   (3, NULL,'Maria Oliveira','0236511', 'maria.oliveira@gallo.com', 'senha123', 2),
							   (4, 3 ,'Lucas Costa','00975139', 'lucas.costa@gallo.com', 'senha456', 2);
SELECT * FROM Funcionario;

DESC Uva;

INSERT INTO Uva VALUES( NULL, 'Pinot Noir','24','18','48','41'),
                      ( NULL, 'Malbec' , '25','17','64','48'),
                      ( NULL, 'Syrah', '20','12', '58','51'),
                      ( NULL, 'Merlot','28','16','68','60'),
                      ( NULL, 'Carménère','26','14','76','62');

SELECT * FROM Uva;

DESC Estufa;

INSERT INTO Estufa VALUES( 1, 2104, 1, 1),
						 ( 2, 2302, 2, 2),
						 ( 3, 121, 1, 3),
						 ( 4, 211, 2, 4),
						 ( 5, 345, 1, 5);

SELECT * FROM Estufa;

DESC TipoSensor;

insert into TipoSensor values( NULL, 'DHT11');

SELECT * FROM TipoSensor;

DESC Sensor;

INSERT INTO Sensor VALUES (NULL,'Corredor 1 - Norte', 1, 1),
                          (NULL,'Corredor 1 - Sul', 2, 1),
                          (NULL,'Corredor 1 - Leste', 3, 1),
                          (NULL,'Corredor 1 - Oeste', 4, 1),
                          (NULL,'Corredor 1 - Centro', 5, 1);

SELECT * FROM Sensor;

DESC Registro;

INSERT INTO Registro VALUES( NULL, 25.5, 30.1, '2023-06-08 14:00:00',1),
                           ( NULL,27.4, 32.4 , '2023-07-21 16:30:00',2),
                           ( NULL,26.2, 20.2, '2023-08-12 17:20:00',3),
                           ( NULL,21.3, 45.2, '2023-09-11 13:30:00',4),
                           ( NULL,19.1, 20.1, '2023-10-02 18:50:00',5);

SELECT * FROM Registro;

-- Tabela Uva selecionar nomeUva
-- Tabela Empresa selecionar nomeEmpresa
-- Tabela Funcionario selecionar nomeFuncionario, fkEmpresa, fkChefe
-- Tabela Estufa selecionar fkEmpresa_estufa e fkUva
-- Tabela TipoSensor selecionar nomeSensor
-- Tabela Sensor selecionar LocalSensor, fkEstufa_sensor, fkTipo
-- Tabela Registro selecionar temperatura_registro, umidade_registro, data_registro, fkSensor_registro 

SELECT emp.nomeEmpresa,
       func.nomeFuncionario,
       func.fkEmpresa, 
	   func.fkChefe,
       est.idEstufa
	   FROM
       Empresa AS emp
	   JOIN Funcionario AS func ON fkEmpresa = idEmpresa
	   LEFT JOIN Funcionario AS Chefe ON func.fkChefe = Chefe.idFuncionario
	   JOIN Estufa AS est ON est.fkEmpresa_estufa = emp.idEmpresa order by idEstufa;
       
 SELECT emp.nomeEmpresa,
       func.nomeFuncionario,
       chefe.nomeFuncionario as 'nomeChefe'
	   FROM
       Empresa AS emp
	   JOIN Funcionario AS func ON fkEmpresa = idEmpresa
	   LEFT JOIN Funcionario AS Chefe ON func.fkChefe = Chefe.idFuncionario
	   JOIN Estufa AS est ON est.fkEmpresa_estufa = emp.idEmpresa order by idEstufa;  
       
       
							 
                           
DROP DATABASE Tech_Noir_Vin_Tech;