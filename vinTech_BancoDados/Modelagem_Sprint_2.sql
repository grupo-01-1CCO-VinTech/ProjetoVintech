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
nomeEmpresa VARCHAR(60)
);
select * from Empresa;
-- Alterando tabela para cumprir com a estrutura do CNPJ
-- alter table Empresa modify column CNPJ char(18);
CREATE TABLE Funcionario (
idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
fkChefe INT,
FOREIGN KEY (fkChefe) references Funcionario (idFuncionario),
nomeFuncionario VARCHAR(45),
senhaFuncionario VARCHAR(45),
email VARCHAR(45),
FkEmpresa INT,
FOREIGN KEY (FkEmpresa) REFERENCES Empresa (idEmpresa) 
);

CREATE TABLE Plantacao (
idPlantacao INT PRIMARY KEY AUTO_INCREMENT,
areaPlantacao INT CHECK (areaPlantacao > 0),
fkEmpresa_plantacao INT, 
fkUva INT,
FOREIGN KEY (fkEmpresa_plantacao) REFERENCES Uva (idUva),
FOREIGN KEY (fkUva) REFERENCES Empresa (idEmpresa)
);

CREATE TABLE TipoSensor (
idTipoSensor INT PRIMARY KEY AUTO_INCREMENT,
nomeSensor CHAR(10)
);

CREATE TABLE Sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
Local VARCHAR (45),
FkPlantacao_sensor INT,
FkTipo INT,
FOREIGN KEY (FkPlantacao_sensor) REFERENCES Plantacao (idPlantacao),
FOREIGN KEY (FkTipo) REFERENCES TipoSensor(idTipoSensor)
);

CREATE TABLE Registro (
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
data_registro DATETIME,
fkSensor_registro INT,
FOREIGN KEY (fkSensor_registro) REFERENCES Sensor (idSensor)
);
-- Tabelas criadas 

select * from Empresa;
select * from Funcionario,Empresa,Uva,Plantacao,Sensor,TipoSensor,Registro;

insert into Empresa values (null,'69.682.151/0001-33', 'Ambev S.A.'),
                           (null, '33.534.423/0001-28', 'Petrobras S.A.');
-- delete from Empresa where idEmpresa = 2;
-- select * from Funcionario;                      
insert into Funcionario values (null, null,'João Silva', '123456','joao.silva@ambev.com',1);
                               (null, 1, 'Ana Souza','567890', 'ana.souza@ambev.com',1);
                               (null,null,'Maria Oliveira', 'senha123', 'maria.oliveira@petrobas.com',3);
                               (null,7,'Lucas Costa', 'senha456', 'lucas.costa@petrobas.com',3);

select * from Uva;
insert into Uva values( null, 'Pinot Noir','24','18','48','41'),
                      ( null, 'Malbec' , '25','17','64','48'),
                      ( null, 'Syrah', '20','12', '58','51'),
                      ( null, 'Merlot','28','16','68','60'),
                      ( null, 'Carménère','26','14','76','62');
select * from Plantacao;
-- truncate table Plantacao;
insert into Plantacao values( null, '100',1,1),
                            ( null, '100',3,1),
                            ( null, '150',1,3),
                            ( null, '260',3,1),
                            ( null, '260',3,3);
-- select * from Empresa join Plantacao on idEmpresa = FkEmpresa_plantacao;
-- delete from Plantacao where idPlantacao =10;
-- select * from Uva join Plantacao on idUva = FkUva;
insert into TipoSensor values( null, 'DHT11');
-- select * from TipoSensor;
select * from Sensor;
insert into Sensor values (null,'Centro', 1, 1),
                          (null,'Sul', 2, 1),
                          (null,'Oeste', 5, 1),
                          (null,'Leste', 11, 1),
                          (null,'Norte', 13, 1);
-- delete from Sensor where idSensor >= 3; Tinha copiado o valor do segundo select para todos.alter
select * from Registro;
insert into Registro values( null,'2023-06-08 14:00:00',1),
                           ( null,'2023-07-21 16:30:00',2),
                           ( null,'2023-08-12 17:20:00',6),
                           ( null,'2023-09-11 13:30:00',7),
                           ( null,'2023-10-02 18:50:00',8);
                           
                           
UPDATE Empresa SET nomeEmpresa = "Gallo" WHERE idEmpresa = 1 
UPDATE Empresa SET nomeEmpresa = "Casillero Del Diablo" WHERE idEmpresa = 2
