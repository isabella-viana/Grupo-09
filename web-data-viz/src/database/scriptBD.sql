CREATE DATABASE IF NOT EXISTS eleva;
use eleva;


CREATE TABLE uf (
    idUF INT PRIMARY KEY auto_increment,
    UF VARCHAR(45),
    cidade VARCHAR(45),
    endereco_idendereco INT,
    empresa_idempresa INT
);

CREATE TABLE empresa (
    idempresa INT PRIMARY KEY auto_increment,
    nome_fantasia VARCHAR(45),
    razao_social VARCHAR(45),
    cnpj CHAR(14),
    situacao VARCHAR(45)
);

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY auto_increment,
    nome VARCHAR(60), 
    cpf CHAR(11),
    telefone VARCHAR(15),
    email VARCHAR(45),
    senha VARCHAR(45),
    cargo VARCHAR(45),
    qtdAcessos INT,
    dataNascimento DATE,
    empresa_idempresa INT,
    FOREIGN KEY (empresa_idempresa) REFERENCES empresa(idempresa) on delete cascade
);

CREATE TABLE endereco (
    idendereco INT PRIMARY KEY auto_increment,
    logradouro VARCHAR(45),
    numero INT,
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    cep VARCHAR(45),
    apelido VARCHAR(45),
    gerente VARCHAR(45),
    complemento VARCHAR(45),
    empresa_idempresa INT,
    usuario_idUsuario INT,
    FOREIGN KEY (empresa_idempresa) REFERENCES empresa(idempresa) on delete cascade,
    FOREIGN KEY (usuario_idUsuario) REFERENCES Usuario(idUsuario) on delete cascade
);

CREATE TABLE leads (
    id INT PRIMARY KEY auto_increment,
    nome_fantasia VARCHAR(45),
    razao_social VARCHAR(45),
    email VARCHAR(45),
    cnpj CHAR(14),
    foiEnviado boolean
);

CREATE TABLE contrato (
    numero_contrato INT PRIMARY KEY,
    status VARCHAR(45),
    valor_total DECIMAL,
    data_criacao DATETIME,
    data_vigencia DATETIME,
    multa_recissoria DECIMAL,
    empresa_idempresa INT,
    FOREIGN KEY (empresa_idempresa) REFERENCES empresa(idempresa) on delete cascade
);

CREATE TABLE configuracao_slack (
    url VARCHAR(100) PRIMARY KEY,
    isAtivo TINYINT,
    processo_etl TINYINT,
    processo_solicitacao TINYINT,
    dataEnvio TIMESTAMP,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario) on delete cascade
);

CREATE TABLE log (
    id INT PRIMARY KEY auto_increment,
    dataHora DATETIME,
    origem VARCHAR(45),
    categoria VARCHAR(100),
    mensagem VARCHAR(450)
);

CREATE TABLE energia_historico (
    idConsumo_energia INT PRIMARY KEY auto_increment,
	dataHora DATETIME,
    classe VARCHAR(45),
	consumo DOUBLE,
    consumidores INT,
    uf VARCHAR(45),
    regiao VARCHAR(45)
);

select * from usuario;

drop database eleva;
