CREATE DATABASE Eleva;

USE Eleva;

CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    cnpj CHAR(14),
    razaoSocial VARCHAR(45),
    email VARCHAR(45),
    dtCadastro DATE
);

CREATE TABLE endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(45),
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    uf VARCHAR(45),
    cep VARCHAR(45),
    empresa_idempresa INT,
    FOREIGN KEY (empresa_idEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE colaborador (
    idColaborador INT PRIMARY KEY AUTO_INCREMENT,
    cpf CHAR(8),
    email VARCHAR(45),
    senha VARCHAR(45),
    cargo VARCHAR(45),
    colaboradorCol VARCHAR(45),
    empresa_idempresa INT,
    FOREIGN KEY (empresa_idEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE estados (
    idEstados INT PRIMARY KEY AUTO_INCREMENT,
    uf CHAR(2),
    região VARCHAR(45)
);

CREATE TABLE consumoEnergia (
    idConsumoEnergia INT PRIMARY KEY AUTO_INCREMENT,
    consumo DOUBLE,
    data DATE,
    classe VARCHAR(45),
    consumidores INT,
    estados_idEstados INT,
    FOREIGN KEY (estados_idEstados) REFERENCES estados(idEstados)
);

CREATE TABLE avisos (
    idAvisos INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(45),
    dtHoraEmissao DATE,
    consumoEnergia_idConsumoEnergia INT,
    FOREIGN KEY (consumoEnergia_idConsumoEnergia) REFERENCES consumoEnergia(idConsumoEnergia)
);


drop database eleva;