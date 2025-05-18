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
    // checkBox();





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
}
function atualizarGraficos(estado) {
    if (estado == "todas") {
        compracaoConsumo.innerHTML = `Comparação do consumo com o ano anterior`;
        compracaoConsumoPorConsumidor.innerHTML = `Consumo médio por consumidor`;
        tituloGrande.innerHTML = `TOP 10 - Porcentagem de Participação por Estado `;
        quantidadeConsumidores.innerHTML = `Quantidade de consumidores`;
        tiposEnergia.innerHTML = `Tipos de Energia mais consumidas`
        numerosAleatorios();

        // gráfico principal

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

        Highcharts.chart('meuGrafico', {
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

        return;
    }


    //!TESTE FUTURO - NÃO MEXER! isso fará uma mudança de cor de acordo com o estado selecionado

    // const estadoSelecionado = [];
    // if (estadoSelecionado.length == 0) {
    //     estadoSelecionado.push(estado);
    // } else {
    //     estadoSelecionado[0].style.stroke = ("black");
    //     estadoSelecionado.splice(0);
    //     estadoSelecionado.push(estado);
    // }
    // estadoSelecionado[0].style.stroke = ("white")


    tituloGrande.innerHTML = `Quantidade de energia consumida`;
    quantidadeConsumidores.innerHTML = `Quantidade de consumidores`;



    // Aqui estamos colocando números aleatórios para gerar os gráficos
    numerosAleatorios();

    Highcharts.chart('meuGrafico', {
        chart: {
            type: 'line'
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
                '2015', '2016', '2017', '2018', '2019',
                '2020', '2021', '2022', '2023', '2024', '2025'
            ],

        },
        yAxis: {
            min: 0,
            title: {
                text: '(MWh)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Energia Consumida',
            data: [420, 450, 470, 500, 530, 480, 520, 550, 590, 620, 640]
        }]
    });

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
            allowDecimals: false,
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
var menuAberto = null;
function selecaoRegioes(conteudo) {
    // Fecha todos os outros .inputs (limpa o conteúdo)
    const todasAsInputs = document.querySelectorAll('.inputs');

    //Amigos, estou criando uma função fantasma que vai limpar o conteúdo de todos os inputs
    // e depois colocar o conteúdo do input que foi clicado
    todasAsInputs.forEach(div => div.innerHTML = '');

    const divInputs = conteudo.querySelector('.inputs');
    menuAberto = divInputs;
    const idSelecionado = conteudo.id;

    const estadosNorte = ["AC", "AP", "AM", "PA", "RO", "RR", "TO"];
    const estadosNordeste = ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"];
    const estadosCentroOeste = ["DF", "GO", "MT", "MS"];
    const estadosSudeste = ["ES", "MG", "RJ", "SP"];
    const estadosSul = ["PR", "RS", "SC"];

    if (menuAberto.innerHTML !== '') {
        fecharOutrosMenusESelecionarTodos();
    }
    var estados = [];

    if (idSelecionado === "norte") {
        estados = estadosNorte;
    } else if (idSelecionado === "nordeste") {
        estados = estadosNordeste;
    } else if (idSelecionado === "centroOeste") {
        estados = estadosCentroOeste;
    } else if (idSelecionado === "sudeste") {
        estados = estadosSudeste;
    } else if (idSelecionado === "sul") {
        estados = estadosSul;
    }

    for (let i = 0; i < estados.length; i++) {

        divInputs.innerHTML += `
        <div class="div_checkbox">
            <input type="checkbox" class="input_checkbox" id="input_checkbox${i}" value="${estados[i]}" onclick="selecionarUnico(this)">
            ${estados[i]}
        </div>`;
    }
}


function fecharOutrosMenusESelecionarTodos(todas) {
    //Mesma logica do anterior
    const todasAsInputs = document.querySelectorAll('.inputs');
    todasAsInputs.forEach(div => div.innerHTML = '');
    var Geral = "todas"
    atualizarGraficos(Geral)


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