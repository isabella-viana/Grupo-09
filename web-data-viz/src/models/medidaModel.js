const { verificarDados } = require("../controllers/medidaController");
var database = require("../database/config");

function verificar(estado) {
    var anos = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
    console.log(estado);

    console.log("ACESSEI O USUARIO MODEL \n\n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n\t\t >> verifique suas credenciais de acesso ao banco\n\t\t >> e se o servidor de seu BD está rodando corretamente. ", estado);


if(estado !="todas"){
     var instrucaoSql = `
SELECT
    YEAR(dataHora) AS ano,
    SUM(consumo) AS consumo,
    SUM(consumidores) AS consumidores
FROM energia_historico
WHERE
    MONTH(dataHora) = 12
    AND YEAR(dataHora) IN (${anos.join(",")})
    AND uf = '${estado}'
GROUP BY YEAR(dataHora)
ORDER BY ano DESC;
`;

}else{
    console.log("entrei no else");
      var instrucaoSql = `
SELECT
    YEAR(dataHora) AS ano,
    SUM(consumo) AS consumo,
    SUM(CASE WHEN MONTH(dataHora) = 12 THEN consumidores ELSE 0 END) AS consumidores
FROM energia_historico
WHERE
    YEAR(dataHora) IN (${anos.join(",")})
GROUP BY YEAR(dataHora)
ORDER BY ano DESC;

`;
}
 
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    
}

function buscarClasse(){

    console.log("entrei na função buscarClasse do model");

    var instrucaoSql = `

SELECT
    classe,
    SUM(consumo) AS consumo_total_classe,
    ROUND(
        (SUM(consumo) / SUM(SUM(consumo)) OVER ()) * 100, 2
    ) AS percentual_consumo,
    SUM(SUM(consumo)) OVER () AS consumo_total_2024
FROM energia_historico
WHERE YEAR(dataHora) = 2024
GROUP BY classe;

    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMapaCalor() {
    console.log("entrei na função buscarMapaCalor do model");

    var instrucaoSql = `SELECT
    uf,
    ROUND(SUM(consumo), 2) AS consumo_total_2024
FROM energia_historico
WHERE YEAR(dataHora) = 2024
GROUP BY uf
ORDER BY uf ASC;
`;

    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarConsumoTodas(){
    console.log("Entrei no model do verificarConsumoTodas");

    var instrucaoSql = ` SELECT
    regiao,
    SUM(consumo) AS consumo_total,
    ROUND(SUM(consumo) * 100.0 / (SELECT SUM(consumo) FROM energia_historico WHERE YEAR(dataHora) = 2024), 2) AS percentual_consumo
    FROM energia_historico
    WHERE YEAR(dataHora) = 2024
    GROUP BY regiao
    ORDER BY percentual_consumo DESC; 
`;

console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

module.exports = {
    verificar,
    buscarClasse,
    buscarMapaCalor,
    verificarConsumoTodas
};




