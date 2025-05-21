CREATE database eleva;
USE eleva;

CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(45),
    cnpj CHAR(14),
    senha VARCHAR(20),    
    dtCadastro DATE
);

CREATE TABLE endereco (
    idendereco INT PRIMARY KEY,
    rua VARCHAR(45),
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    uf VARCHAR(45),
    cep VARCHAR(45),
    empresa_idempresa INT,
    FOREIGN KEY (empresa_idempresa) REFERENCES empresa(idempresa)
);

CREATE TABLE colaborador (
    idcolaborador INT PRIMARY KEY,
    cpf CHAR(8),
    email VARCHAR(45),
    senha VARCHAR(45),
    cargo VARCHAR(45),
    colaboradorcol VARCHAR(45),
    empresa_idempresa INT,
    FOREIGN KEY (empresa_idempresa) REFERENCES empresa(idempresa)
);

CREATE TABLE consumo_energia (
    idconsumo_energia INT PRIMARY KEY auto_increment,
    data DATE,
    classe varchar(45),
    consumo DOUBLE,
    consumidores INT,
    uf VARCHAR(45),
    regiao VARCHAR(45)
);

CREATE TABLE avisos (
    idavisos INT PRIMARY KEY,
    descricao VARCHAR(45),
    dtHoraEmissao DATE
);

CREATE TABLE logs_service (
    idregistroLogs INT PRIMARY KEY auto_increment,
    nomeArquivo VARCHAR(100),
    inicio DATETIME,
    fim DATETIME,
    logs_registrados INT,
    erros INT,
    sucesso VARCHAR(45),
    mensagem VARCHAR(45)
);

drop database eleva;



