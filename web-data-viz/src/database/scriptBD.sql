CREATE DATABASE eleva;
use eleva;

CREATE TABLE uf (
    idUF INT PRIMARY KEY,
    UF VARCHAR(45),
    cidade VARCHAR(45),
    endereco_idendereco INT,
    empresa_idempresa INT
);

CREATE TABLE empresa (
    idempresa INT PRIMARY KEY,
    razao_social VARCHAR(45),
    nome_fantasia VARCHAR(45),
    senha VARCHAR(45),
    cnpj CHAR(14),
    email VARCHAR(45),
    situacao VARCHAR(45)
);

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY,
    cpf CHAR(11),
    email VARCHAR(45),
    senha VARCHAR(45),
    cargo VARCHAR(45),
    dataNascimento DATE,
    empresa_idempresa INT,
    FOREIGN KEY (empresa_idempresa) REFERENCES empresa(idempresa)
);

CREATE TABLE endereco (
    idendereco INT PRIMARY KEY,
    logradouro VARCHAR(45),
    numero INT,
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    cep VARCHAR(45),
    apelido VARCHAR(45),
    empresa_idempresa INT,
    usuario_idUsuario INT,
    FOREIGN KEY (empresa_idempresa) REFERENCES empresa(idempresa),
    FOREIGN KEY (usuario_idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE leads (
    id INT PRIMARY KEY,
    nome_solicitante VARCHAR(45),
    razao_social VARCHAR(45),
    email VARCHAR(45)
);

CREATE TABLE contrato (
    numero_contrato INT PRIMARY KEY,
    status VARCHAR(45),
    valor_total DECIMAL,
    data_criacao DATETIME,
    data_vigencia DATETIME,
    multa_recissoria DECIMAL,
    empresa_idempresa INT,
    FOREIGN KEY (empresa_idempresa) REFERENCES empresa(idempresa)
);

CREATE TABLE configuracao_slack (
    url VARCHAR(100) PRIMARY KEY,
    isAtivo TINYINT,
    mensagem VARCHAR(100),
    dataEnvio DATETIME
);

CREATE TABLE log (
    id INT PRIMARY KEY,
    dataHora DATETIME,
    categoria VARCHAR(45),
    origem VARCHAR(100),
    mensagem VARCHAR(45)
);

CREATE TABLE energia_historico (
    idConsumo_energia INT PRIMARY KEY,
	classe VARCHAR(45),
    dataHora DATE,
	consumo DOUBLE,
    consumidores INT,
    uf VARCHAR(45),
    regiao VARCHAR(45)
);

drop database eleva;
