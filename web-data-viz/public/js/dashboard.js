function adicionarUsuario() {
    window.location.href = "./gerenciamento.html"
}
function irAtividade() {
    window.location.href = "./atividades.html"
}
function sair() {
    window.location.href = "./index.html"
}
function irParaDashboard() {
    window.location.href = "./dashboard.html"
}

window.onload = function () {
    var todas = "todas";
    atualizarGraficos(todas);
    coresGrafico();
    numerosAleatorios()
    checkBox(todas);
};

function numerosAleatorios() {
    var numeroAleatorio = Math.random() * 9 - 4;
    var numeroAleatorio2 = Math.random() * 109;

    if (numeroAleatorio > 0) {

        kpiDado.style.color = "green"

        kpiDado.innerHTML = `+ ${numeroAleatorio.toFixed(2)}<span>%</span> <i class="bi bi-arrow-up-short"></i>`

    } else {

        kpiDado.style.color = "red"

        kpiDado.innerHTML = `${numeroAleatorio.toFixed(2)} <span>%</span> <i class="bi bi-arrow-down-short"></i>`
    }


    if (numeroAleatorio2 > 0) {

        comparacaoCPC.innerHTML = `${numeroAleatorio2.toFixed(1)} <span>MWh</span> <i class="bi bi-lightning-charge-fill"></i>`

    } else {

        comparacaoCPC.innerHTML = `${numeroAleatorio2.toFixed(1)} <span>MWh</span> <i class="bi bi-lightning-charge-fill"></i>`
    }
}


function selecionarUnico(estadoClicado) {
    const checkboxes = document.querySelectorAll('.input_checkbox');

    //Amigos de grupo, aqui estou perguntando se o estado que foi clicado é diferente do estado que esta agora.
    checkboxes.forEach(i => {
        if (i !== estadoClicado) {
            i.checked = false;
        }
    });

    if (estadoClicado.checked) {
        atualizarGraficos(estadoClicado.value);
    }
    verificar(estadoClicado.value)
}
function verificar(estado) {
    console.log("Entrei no verificar(estado)");

    fetch("/usuarios/verificar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            estadoServer: estado
        })

    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO verificar()!");

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log("Dados completos:", json);
                console.log("Em formato JSON:", JSON.stringify(json));

                
                const ANOS = json.map(item => item.ano);
                const CONSUMIDORES = json.map(item => Number(item.consumidores_dezembro)); // converte string para número

               
                sessionStorage.setItem("ANOS", JSON.stringify(ANOS));
                sessionStorage.setItem("CONSUMIDORES", JSON.stringify(CONSUMIDORES));

    
                console.log("Anos:", ANOS);
                console.log("Consumidores:", CONSUMIDORES);
                criarGraficoConsumidores(ANOS, CONSUMIDORES);
            });
        } else {
            console.log("Erro ao puxar os dados do back-end.");
        }
    }).catch(function (erro) {
        console.log("Erro na requisição:", erro);
    });

    return false;
}

const anos = JSON.parse(sessionStorage.getItem("ANOS"));
const consumidores = JSON.parse(sessionStorage.getItem("CONSUMIDORES"));

var graficoConsumidores = []

function criarGraficoConsumidores(anos, consumidores) {

console.log("Estou tentando criar os gráficos")
 console.log("Anos:", anos);
 console.log("Consumidores:", consumidores);

    Highcharts.chart('meuGrafico', {
        chart: {
            type: 'column'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: [
                anos[0], anos[1], anos[2], anos[3], anos[4],
                anos[5], anos[6], anos[7], anos[8], anos[9]
            ],
            title: {
                text: null
            },
            lineWidth: 0,
            tickWidth: 0,
            gridLineWidth: 0
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            },
            allowDecimals: true,
            lineWidth: 0,
            tickWidth: 0,
            gridLineWidth: 0,
            labels: {
                enabled: false
            }
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Consumidores',
            data: [consumidores[0], consumidores[1], consumidores[2], consumidores[3], consumidores[4],
            consumidores[5], consumidores[6], consumidores[7], consumidores[8], consumidores[9]]
        }]
    });
}
function atualizarGraficos(estado) {
    var id = estado.id
    if (estado == "todas") {
        criarGraficoConsumidores(anos, consumidores)
        Highcharts.chart('qtdConsumidores', {
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            xAxis: {
                categories: [
                    'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'
                ],
                title: {
                    text: null
                }
            },
            yAxis: {
                visible: false
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        inside: false,
                        y: -10,
                        format: '{y}%',
                        style: {
                            fontWeight: 'bold',
                            color: 'black'
                        }
                    },
                    borderWidth: 0
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Consumo de Energia',
                data: [15.7, 14.1, 13.0, 12.0, 11.2]
            }]
        });

    } else {
        Highcharts.chart('qtdConsumidores', {
            chart: {
                type: 'column'
            },
            title: {
                text: null
            },
            xAxis: {
                categories: [
                    '2015', '2016', '2017', '2018', '2019',
                    '2020', '2021', '2022', '2023', '2024', '2025'
                ],
                title: {
                    text: null
                },
                lineWidth: 0,
                tickWidth: 0,
                gridLineWidth: 0
            },
            yAxis: {
                min: 0,
                title: {
                    text: null
                },
                allowDecimals: true,
                lineWidth: 0,
                tickWidth: 0,
                gridLineWidth: 0,
                labels: {
                    enabled: false
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'Consumidores',
                data: [1500, 1600, 1750, 1900, 2050, 2200, 2350, 2500, 2650, 2800, 2950]
            }]
        });
        Highcharts.chart('meuGrafico', {
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            xAxis: {
                categories: [
                    'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'
                ],
                title: {
                    text: null
                }
            },
            yAxis: {
                visible: false
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true,
                        inside: false,
                        y: -10,
                        format: '{y}%',
                        style: {
                            fontWeight: 'bold',
                            color: 'black'
                        }
                    },
                    borderWidth: 0
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Consumo de Energia',
                data: [15.7, 14.1, 13.0, 12.0, 11.2]
            }]
        });

    }

    // Aqui estamos colocando números aleatórios para gerar os gráficos
    numerosAleatorios();





    // Gráfico de Pizza

    Highcharts.chart('energiasMaisConsumidas', {
        chart: {
            type: 'pie'
        },
        credits: {
            enabled: false
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        tooltip: {
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false,
                    format: '{point.name}: {point.percentage:.1f}%'
                },
                showInLegend: true
            }
        },
        legend: {
            enabled: true,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'middle',
            itemMarginBottom: 8,
            symbolRadius: 6,
            symbolHeight: 10,
            symbolWidth: 10,
            navigation: {
                enabled: false
            }
        },
        series: [{
            name: 'Valor',
            data: [
                { name: 'Hidrelétrica', y: 120 },
                { name: 'Eólica', y: 95 },
                { name: 'Nuclear', y: 78 },
                { name: 'Gás Natural', y: 133 },
                { name: 'Outros', y: 22 }
            ]
        }]
    });




}

function checkBox() {
    const estadosNorte = ["AC", "AP", "AM", "PA", "RO", "RR", "TO"];
    const estadosNordeste = ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"];
    const estadosCentroOeste = ["DF", "GO", "MT", "MS"];
    const estadosSudeste = ["ES", "MG", "RJ", "SP"];
    const estadosSul = ["PR", "RS", "SC"];

    const estados = {
        Norte: estadosNorte,
        Nordeste: estadosNordeste,
        CentroOeste: estadosCentroOeste,
        Sudeste: estadosSudeste,
        Sul: estadosSul
    };

    const regioes = Object.keys(estados);
    const valores = Object.values(estados);

    for (let i = 0; i < regioes.length; i++) {
        const regiao = regioes[i];
        const listaEstados = valores[i];

        const container = document.getElementById(`input${regiao}`);
        container.innerHTML = ""; // limpa o conteúdo antes

        for (let j = 0; j < listaEstados.length; j++) {
            const estado = listaEstados[j];

            container.innerHTML += `
                <div class="div_checkbox">
                    <input type="checkbox" class="input_checkbox" id="input_checkbox_${regiao}_${j}" value="${estado}" onclick="selecionarUnico(this)">
                    ${estado}
                </div>
            `;
        }
        inputNorte.style.display = 'none'
        inputNordeste.style.display = 'none'
        inputCentroOeste.style.display = 'none'
        inputSudeste.style.display = 'none'
        inputSul.style.display = 'none'
    }
}




function selecaoRegioes(nome) {
    var icone = document.getElementById(`icone_${nome}`)
    inputNorte.style.display = 'none'
    inputNordeste.style.display = 'none'
    inputCentroOeste.style.display = 'none'
    inputSudeste.style.display = 'none'
    inputSul.style.display = 'none'

    if (nome == "norte") {

        inputNorte.style.display = 'block'
        return
    } else if (nome == "nordeste") {
        inputNordeste.style.display = 'block'
        return
    } else if (nome == "centroOeste") {
        inputCentroOeste.style.display = 'block'
        return
    } else if (nome == "sudeste") {
        inputSudeste.style.display = 'block'
        return
    } else {


        inputSul.style.display = 'block'
    }


}

function coresGrafico() {
    var estados = [];
    var numerosAleatorios = [
        1, // Acre
        3, // Alagoas
        1, // Amapá
        3, // Amazonas
        5, // Bahia
        4, // Ceará
        6, // Distrito Federal
        5, // Espírito Santo
        5, // Goiás
        3, // Maranhão
        5, // Mato Grosso
        4, // Mato Grosso do Sul
        7, // Minas Gerais
        3, // Pará
        2, // Paraíba
        6, // Paraná
        5, // Pernambuco
        3, // Piauí
        7, // Rio de Janeiro
        3, // Rio Grande do Norte
        6, // Rio Grande do Sul
        2, // Rondônia
        1, // Roraima
        5, // Santa Catarina
        7, // São Paulo
        2, // Sergipe
        2  // Tocantins
    ];



    var nomesEstados = [
        'BR-AC', 'BR-AL', 'BR-AP', 'BR-AM', 'BR-BA',

        'BR-CE', 'BR-DF', 'BR-ES', 'BR-GO', 'BR-MA',

        'BR-MT', 'BR-MS', 'BR-MG', 'BR-PA', 'BR-PB',

        'BR-PR', 'BR-PE', 'BR-PI', 'BR-RJ', 'BR-RN',

        'BR-RS', 'BR-RO', 'BR-RR', 'BR-SC', 'BR-SP',

        'BR-SE', 'BR-TO'
    ];

    for (var i = 0; i < nomesEstados.length; i++) {
        var estadoAtual = document.getElementById(nomesEstados[i]);
        estados.push(estadoAtual);
    }

    for (var i = 0; i < estados.length; i++) {
        if (numerosAleatorios[i] == 1) {
            estados[i].style.fill = '#8ee89e';
        } else if (numerosAleatorios[i] == 2) {
            estados[i].style.fill = '#d6f26a';
        } else if (numerosAleatorios[i] == 3) {
            estados[i].style.fill = '#fff05e';
        } else if (numerosAleatorios[i] == 4) {
            estados[i].style.fill = '#ffc145';
        } else if (numerosAleatorios[i] == 5) {
            estados[i].style.fill = '#ff914d';
        } else if (numerosAleatorios[i] == 6) {
            estados[i].style.fill = '#ff5e5e';
        } else if (numerosAleatorios[i] == 7) {
            estados[i].style.fill = '#d94343';
        }

    }

}

