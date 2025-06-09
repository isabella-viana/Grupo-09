user.innerHTML = sessionStorage.getItem("NOME");

function adicionarUsuario() {
  window.location.href = "./gerenciamento.html";
}
function irAtividade() {
  window.location.href = "./atividades.html";
}
function sair() {
  window.location.href = "./index.html";
}
function irParaDashboard() {
  window.location.href = "./dashboard.html";
}

window.onload = function () {
  var todas = "todas";
  buscarClasses();
  buscarMapaCalor();
  checkBox(todas);

  const checkboxTodas = document.querySelector(
    'input[type="checkbox"][value="todas"]'
  );
  if (checkboxTodas) {
    checkboxTodas.checked = true;
    selecionarUnico(checkboxTodas);
  }
};

function atualizarKPIs(anos, consumo, consumidores) {
  var variacaoEnergia = ((consumo[0] - consumo[1]) / consumo[1]) * 100;
  var consumoMedioPorConsumidor = consumo[0] / consumidores[0];
  console.log(consumo[0], anos[0]);
  console.log(consumoMedioPorConsumidor);

  if (variacaoEnergia > 0) {
    kpiDado.style.color = "green";

    kpiDado.innerHTML = `+ ${variacaoEnergia.toFixed(
      2
    )}<span>%</span> <i class="bi bi-arrow-up-short"></i>`;
  } else {
    kpiDado.style.color = "red";

    kpiDado.innerHTML = `${variacaoEnergia.toFixed(
      2
    )} <span>%</span> <i class="bi bi-arrow-down-short"></i>`;
  }

  if (consumoMedioPorConsumidor > 0) {
    comparacaoCPC.innerHTML = `${consumoMedioPorConsumidor.toFixed(
      1
    )} <span>MWh</span> <i class="bi bi-lightning-charge-fill"></i>`;
  } else {
    comparacaoCPC.innerHTML = `${consumoMedioPorConsumidor.toFixed(
      1
    )} <span>MWh</span> <i class="bi bi-lightning-charge-fill"></i>`;
  }
}

function selecionarUnico(estadoClicado) {
  const checkboxes = document.querySelectorAll(".input_checkbox");

  //Amigos de grupo, aqui estou perguntando se o estado que foi clicado é diferente do estado que esta agora.
  checkboxes.forEach((i) => {
    if (i !== estadoClicado) {
      i.checked = false;
    }
  });

  verificar(estadoClicado.value);
}

function buscarMapaCalor() {
  console.log("Estou no buscarMapaCalor()");

  fetch("/medidas/buscarMapaCalor", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (resposta) {
      console.log("ESTOU NO THEN DO buscarMapaCalor()!");

      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then((json) => {
          console.log("Dados completos:", json);
          console.log("Em formato JSON:", JSON.stringify(json));

          const UFMAPACALOR = json.map((item) => item.uf);
          const CONSUMOTOTALMAPACALOR = json.map((item) =>
            Number(item.consumo_total_2024)
          );

          sessionStorage.setItem("UFMAPACALOR", JSON.stringify(UFMAPACALOR));
          sessionStorage.setItem(
            "CONSUMOTOTALMAPACALOR",
            JSON.stringify(CONSUMOTOTALMAPACALOR)
          );

          console.log("UF do mapa de calor", UFMAPACALOR);
          console.log("Consumo do mapa de calor", CONSUMOTOTALMAPACALOR);
          console.log("Estou chamando a função coresMapa()");
          console.log(UFMAPACALOR, CONSUMOTOTALMAPACALOR);
          coresMapa(UFMAPACALOR, CONSUMOTOTALMAPACALOR);
        });
      } else {
        console.log("Erro ao puxar os dados do back-end.");
      }
    })
    .catch(function (erro) {
      console.log("Erro na requisição:", erro);
    });

  return false;
}

function buscarClasses() {
  console.log("Entrei no buscarClasse()");

  fetch("/medidas/buscarClasse", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (resposta) {
      console.log("ESTOU NO THEN DO buscarClasses()!");

      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then((json) => {
          console.log("Dados completos:", json);
          console.log("Em formato JSON:", JSON.stringify(json));

          const CLASSE = json.map((item) => item.classe);
          const CONSUMO_CLASSE = json.map((item) =>
            Number(item.consumo_total_classe)
          );
          const PORCENTAGEM_CONSUMO_CLASSE = json.map(
            (item) => item.percentual_consumo
          );
          const CONSUMOTOTAL = json.map((item) =>
            Number(item.consumo_total_2024)
          );

          sessionStorage.setItem("CLASSSE", JSON.stringify(CLASSE));
          sessionStorage.setItem(
            "CONSUMO_CLASSE",
            JSON.stringify(CONSUMO_CLASSE)
          );
          sessionStorage.setItem(
            "PORCENTAGEM_CONSUMO_CLASSE",
            JSON.stringify(PORCENTAGEM_CONSUMO_CLASSE)
          );
          sessionStorage.setItem("CONSUMOTOTAL", JSON.stringify(CONSUMOTOTAL));

          console.log("Classe:", CLASSE);
          console.log("Consumo da Classe", CONSUMO_CLASSE);
          console.log("Porcentagem do consumo:", PORCENTAGEM_CONSUMO_CLASSE);
          console.log("Porcentagem Total do Ultimo Ano", CONSUMOTOTAL);

          criarGraficoClasse(
            CLASSE,
            CONSUMO_CLASSE,
            PORCENTAGEM_CONSUMO_CLASSE,
            CONSUMOTOTAL
          );
        });
      } else {
        console.log("Erro ao puxar os dados do back-end.");
      }
    })
    .catch(function (erro) {
      console.log("Erro na requisição:", erro);
    });

  return false;
}
function verificar(estado) {
  console.log("Entrei no verificar(estado)");

  fetch("/medidas/verificar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      estadoServer: estado,
    }),
  })
    .then(function (resposta) {
      console.log("ESTOU NO THEN DO verificar()!");

      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then((json) => {
          console.log("Dados completos:", json);
          console.log("Em formato JSON:", JSON.stringify(json));

          const ANOS = json.map((item) => item.ano);
          const CONSUMIDORES = json.map((item) => Number(item.consumidores));
          const CONSUMO = json.map((item) => Number(item.consumo));

          sessionStorage.setItem("ANOS", JSON.stringify(ANOS));
          sessionStorage.setItem("CONSUMIDORES", JSON.stringify(CONSUMIDORES));
          sessionStorage.setItem("CONSUMO", JSON.stringify(CONSUMO));

          console.log("Consumo:", CONSUMO);
          console.log("Anos:", ANOS);
          console.log("Consumidores:", CONSUMIDORES);

          criarGraficoConsumidores(ANOS, CONSUMIDORES, estado);
          criarGraficoConsumo(ANOS, CONSUMO, estado);
          atualizarKPIs(ANOS, CONSUMO, CONSUMIDORES, estado);
        });
      } else {
        console.log("Erro ao puxar os dados do back-end.");
      }
    })
    .catch(function (erro) {
      console.log("Erro na requisição:", erro);
    });

  return false;
}

const anos = JSON.parse(sessionStorage.getItem("ANOS"));
const consumidores = JSON.parse(sessionStorage.getItem("CONSUMIDORES"));

var graficoConsumidores = [];

function criarGraficoClasse(
  classe,
  consumoClasse,
  porcentagemClasse,
  consumoTotal
) {
  if (
    classe == null ||
    consumoClasse == null ||
    porcentagemClasse == null ||
    consumoTotal == null
  ) {
    return null;
  }

  console.log("Estou tentando criar o gráfico de classes");
  Highcharts.chart("energiasMaisConsumidas", {
    chart: {
      type: "pie",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    tooltip: {
      pointFormat: "{point.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
          format: "{point.name}: {point.percentage:.1f}%",
        },
        showInLegend: true,
      },
    },
    legend: {
      enabled: true,
      layout: "vertical",
      align: "left",
      verticalAlign: "middle",
      itemMarginBottom: 8,
      symbolRadius: 6,
      symbolHeight: 10,
      symbolWidth: 10,
      navigation: {
        enabled: false,
      },
    },
    series: [
      {
        name: "Valor",
        data: [
          { name: `${classe[0]}`, y: porcentagemClasse[0] },
          { name: `${classe[1]}`, y: porcentagemClasse[1] },
          { name: `${classe[2]}`, y: porcentagemClasse[2] },
        ],
      },
    ],
  });
}
function criarGraficoConsumidores(anos, consumidores, estado) {
  if (anos == null || consumidores == null) {
    return;
  }
  console.log("Estou tentando criar os gráficos");
  console.log("Anos:", anos);
  console.log("Consumidores:", consumidores);
  console.log("Estado:", estado);

  if (estado != "todas") {
    tituloGrande.innerHTML = `Quantidade de consumo total do estado`;
    quantidadeConsumidores.innerHTML = `Quantidade de consumidores totais`;

    Highcharts.chart("qtdConsumo", {
      chart: {
        type: "column",
      },
      title: {
        text: null,
      },
      xAxis: {
        categories: [anos[4], anos[3], anos[2], anos[1], anos[0]],
        title: {
          text: null,
        },
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0,
      },
      yAxis: {
        min: 0,
        title: {
          text: null,
        },
        allowDecimals: true,
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0,
        labels: {
          enabled: false,
        },
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: "Consumidores",
          data: [
            consumidores[4],
            consumidores[3],
            consumidores[2],
            consumidores[1],
            consumidores[0],
          ],
        },
      ],
    });
  } else {
    tituloGrande.innerHTML = `Quantidade de consumidores totais do país`;
    quantidadeConsumidores.innerHTML = `Participação do consumo de energia por região`;

    Highcharts.chart("meuGrafico", {
      chart: {
        type: "column",
      },
      title: {
        text: null,
      },
      xAxis: {
        categories: [
          anos[9],
          anos[8],
          anos[7],
          anos[6],
          anos[5],
          anos[4],
          anos[3],
          anos[2],
          anos[1],
          anos[0],
        ],
        title: {
          text: null,
        },
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0,
      },
      yAxis: {
        min: 0,
        title: {
          text: null,
        },
        allowDecimals: true,
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0,
        labels: {
          enabled: false,
        },
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            style: {
              fontSize: "8.5px",
            },
          },
        },
      },
      series: [
        {
          name: "Consumidores",
          data: [
            consumidores[9],
            consumidores[8],
            consumidores[7],
            consumidores[6],
            consumidores[5],
            consumidores[4],
            consumidores[3],
            consumidores[2],
            consumidores[1],
            consumidores[0],
          ],
        },
      ],
    });
  }
}

function criarGraficoConsumo(anos, consumo, estado) {
  if (anos == null || consumo == null) {
    return;
  }
  console.log(estado);

  if (estado != "todas") {
    Highcharts.chart("meuGrafico", {
      chart: {
        type: "column",
      },
      title: {
        text: null,
      },
      xAxis: {
        categories: [
          anos[9],
          anos[8],
          anos[7],
          anos[6],
          anos[5],
          anos[4],
          anos[3],
          anos[2],
          anos[1],
          anos[0],
        ],
        title: {
          text: null,
        },
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0,
      },
      yAxis: {
        min: 0,
        title: {
          text: null,
        },
        allowDecimals: true,
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0,
        labels: {
          enabled: false,
        },
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: "Consumo",
          data: [
            consumo[9],
            consumo[8],
            consumo[7],
            consumo[6],
            consumo[5],
            consumo[4],
            consumo[3],
            consumo[2],
            consumo[1],
            consumo[0],
          ],
        },
      ],
    });
  } else {
    Highcharts.chart("qtdConsumo", {
      chart: {
        type: "column",
      },
      title: {
        text: null,
      },
      xAxis: {
        categories: ["N", "NE", "CO", "SE", "S"],

        title: {
          text: null,
        },
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0,
      },
      yAxis: {
        min: 0,
        title: {
          text: null,
        },
        allowDecimals: true,
        lineWidth: 0,
        tickWidth: 0,
        gridLineWidth: 0,
        labels: {
          enabled: false,
        },
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            style: {
              fontSize: "8.5px",
            },
          },
        },
      },
      series: [
        {
          name: "Consumo",
          data: [consumo[4], consumo[3], consumo[2], consumo[1], consumo[0]],
        },
      ],
    });
  }
}

function checkBox() {
  const todas = ["todas"];
  const estadosNorte = ["AC", "AP", "AM", "PA", "RO", "RR", "TO"];
  const estadosNordeste = [
    "AL",
    "BA",
    "CE",
    "MA",
    "PB",
    "PE",
    "PI",
    "RN",
    "SE",
  ];
  const estadosCentroOeste = ["DF", "GO", "MT", "MS"];
  const estadosSudeste = ["ES", "MG", "RJ", "SP"];
  const estadosSul = ["PR", "RS", "SC"];

  const estados = {
    Todas: todas,
    Norte: estadosNorte,
    Nordeste: estadosNordeste,
    CentroOeste: estadosCentroOeste,
    Sudeste: estadosSudeste,
    Sul: estadosSul,
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

      if (estado == "todas") {
        inputTodas.innerHTML += `
               
                    <input type="checkbox" class="input_checkbox" id="input_checkbox_${regiao}_${j}" value="${estado}" onclick="selecionarUnico(this)">
            `;
      } else {
        container.innerHTML += `
                <div class="div_checkbox">
                    <input type="checkbox" class="input_checkbox" id="input_checkbox_${regiao}_${j}" value="${estado}" onclick="selecionarUnico(this)">
                    ${estado}
                </div>
            `;
      }
    }
    inputNorte.style.display = "none";
    inputNordeste.style.display = "none";
    inputCentroOeste.style.display = "none";
    inputSudeste.style.display = "none";
    inputSul.style.display = "none";
  }
}

function selecaoRegioes(nome) {
  var iconeAtual = document.getElementById("icone_" + nome);

  inputNorte.style.display = "none";
  inputNordeste.style.display = "none";
  inputCentroOeste.style.display = "none";
  inputSudeste.style.display = "none";
  inputSul.style.display = "none";

  if (nome == "norte") {
    if (iconeAtual.classList.contains("bi-caret-down-fill")) {
      inputNorte.style.display = "block";
      iconeAtual.classList.remove("bi-caret-down-fill");
      iconeAtual.classList.add("bi-caret-up-fill");
    } else {
      inputNorte.style.display = "none";
      iconeAtual.classList.remove("bi-caret-up-fill");
      iconeAtual.classList.add("bi-caret-down-fill");
    }
    return;
  } else if (nome == "nordeste") {
    if (iconeAtual.classList.contains("bi-caret-down-fill")) {
      inputNordeste.style.display = "block";
      iconeAtual.classList.remove("bi-caret-down-fill");
      iconeAtual.classList.add("bi-caret-up-fill");
    } else {
      inputNordeste.style.display = "none";
      iconeAtual.classList.remove("bi-caret-up-fill");
      iconeAtual.classList.add("bi-caret-down-fill");
    }
    return;
  } else if (nome == "centroOeste") {
    if (iconeAtual.classList.contains("bi-caret-down-fill")) {
      inputCentroOeste.style.display = "block";
      iconeAtual.classList.remove("bi-caret-down-fill");
      iconeAtual.classList.add("bi-caret-up-fill");
    } else {
      inputCentroOeste.style.display = "none";
      iconeAtual.classList.remove("bi-caret-up-fill");
      iconeAtual.classList.add("bi-caret-down-fill");
    }
    return;
  } else if (nome == "sudeste") {
    if (iconeAtual.classList.contains("bi-caret-down-fill")) {
      inputSudeste.style.display = "block";
      iconeAtual.classList.remove("bi-caret-down-fill");
      iconeAtual.classList.add("bi-caret-up-fill");
    } else {
      inputSudeste.style.display = "none";
      iconeAtual.classList.remove("bi-caret-up-fill");
      iconeAtual.classList.add("bi-caret-down-fill");
    }
    return;
  } else {
    if (iconeAtual.classList.contains("bi-caret-down-fill")) {
      inputSul.style.display = "block";
      iconeAtual.classList.remove("bi-caret-down-fill");
      iconeAtual.classList.add("bi-caret-up-fill");
    } else {
      inputSul.style.display = "none";
      iconeAtual.classList.remove("bi-caret-up-fill");
      iconeAtual.classList.add("bi-caret-down-fill");
    }
  }
}

function coresMapa(UFs, Consumo) {
  console.log(UFs);
  console.log(Consumo);

  var UfComMaisConsumo = UFs[0];
  var ConsumoDoEstadoComMaisConsumo = Consumo[0];
  var UfComMenosConsumo = UFs[0];
  var ConsumoDoEstadoComMenosConsumo = Consumo[0];
  var ConsumoTotal = 0;

  for (let i = 0; i < UFs.length; i++) {
    if (Consumo[i] > ConsumoDoEstadoComMaisConsumo) {
      ConsumoDoEstadoComMaisConsumo = Consumo[i];
      UfComMaisConsumo = UFs[i];
    }
    if (ConsumoDoEstadoComMaisConsumo > Consumo[i]) {
      ConsumoDoEstadoComMenosConsumo = Consumo[i];
      UfComMenosConsumo = UFs[i];
    }

    ConsumoTotal += Consumo[i];
  }
  spanConsumoTotal.innerHTML = `${ConsumoTotal}`;
  spanEstadoMaior.innerHTML = `${UfComMaisConsumo}`;
  spanConsumoMaiorEstado.innerHTML = `${ConsumoDoEstadoComMaisConsumo}`;
  spanEstadoMenor.innerHTML = `${UfComMenosConsumo}`;
  spanConsumoMenorEstado.innerHTML = `${ConsumoDoEstadoComMenosConsumo}`;

  for (var i = 0; i < UFs.length; i++) {
    var porcentagemEstado = (Consumo[i] / ConsumoTotal) * 100;
    const estado = document.getElementById("BR-" + UFs[i]);

    if (porcentagemEstado <= 2) {
      estado.style.fill = "#8ee89e";
    } else if (porcentagemEstado <= 3) {
      estado.style.fill = "#d6f26a";
    } else if (porcentagemEstado <= 4) {
      estado.style.fill = "#fff05e";
    } else if (porcentagemEstado <= 5) {
      estado.style.fill = "#ffc145";
    } else if (porcentagemEstado <= 10) {
      estado.style.fill = "#ff914d";
    } else if (porcentagemEstado <= 20) {
      estado.style.fill = "#ff5e5e";
    } else {
      estado.style.fill = "#d94343";
    }
  }
}
