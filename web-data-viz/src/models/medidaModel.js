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

    // Amigos, Guilherme e Gandin aqui. 
    // Esse select retorna os dados de consumo por classe em porcentagem
    // Como deve ficar o select:
    // | classe      | consumo\_total\_classe | percentual\_consumo | consumo\_total\_2024 |
    // | ----------- | ---------------------- | ------------------- | -------------------- |
    // | Residencial | 1.200.000              | 48.00               | 2.500.000            |
    // | Comercial   | 900.000                | 36.00               | 2.500.000            |
    // | Industrial  | 400.000                | 16.00               | 2.500.000            |
    
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

module.exports = {
    verificar,
    buscarClasse   
};




