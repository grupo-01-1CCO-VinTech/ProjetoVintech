create database Sprint3;
use Sprint3;

CREATE TABLE Empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
CNPJEmpresa CHAR(18),
nomeEmpresa VARCHAR(60),
nomeFantasia VARCHAR(45),
CEPEmpresa CHAR(14),
logradouroEmpresa VARCHAR(60),
numeroEmpresa INT,
baiorroEmpresa VARCHAR(45),
cidadeEmpresa VARCHAR(50),
UFEmpresa CHAR(2),
telefoneEmpresa CHAR(14),
telefoneSecundarioEmpresa CHAR(14),
emailEmpresa VARCHAR(45)
);

CREATE TABLE Funcionario(
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
nomeFuncionario VARCHAR(45),
fkChefe INT,
FOREIGN KEY (fkChefe) REFERENCES Funcionario (idFuncionario),
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) REFERENCES Empresa (idEmpresa),
senhaFuncionario VARCHAR(45),
emailFuncionario VARCHAR(45),
loginFuncionario VARCHAR(45)
);

CREATE TABLE Plantacao(
idPlantacao INT PRIMARY KEY AUTO_INCREMENT,
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
FOREIGN KEY (fkPlantacao) REFERENCES Plantacao (idPlantacao),
fkUva INT,
FOREIGN KEY (fkUva) REFERENCES Uva (idUva)
);

CREATE TABLE TipoSensor(
idTipoSensor INT PRIMARY KEY AUTO_INCREMENT,
nomeSensor VARCHAR(10)
);

CREATE TABLE Sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,
localSensor VARCHAR(45),
fkEstufa INT,
FOREIGN KEY (fkEstufa) REFERENCES Estufa (idEstufa),
fkTipo INT,
FOREIGN KEY (fkTipo) REFERENCES TipoSensor (idTipoSensor)
);

CREATE TABLE Registro(
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
fkSensor INT,
FOREIGN KEY (fkSensor) REFERENCES Sensor (idSensor),
temperaturaRegistro DECIMAL(4,2),
umidadeRegistro DECIMAL(4,2),
dataRegistro DATETIME
);


INSERT INTO Empresa VALUES (

);
INSERT INTO Funcionario VALUES (

);
INSERT INTO Plantacao VALUES (

);
INSERT INTO Uva VALUES (

);
INSERT INTO Estufa VALUES (

);
INSERT INTO TipoSensor VALUES (

);
INSERT INTO Sensor VALUES (

);
INSERT INTO Registro VALUES (

);
