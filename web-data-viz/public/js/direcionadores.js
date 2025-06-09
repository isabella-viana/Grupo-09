window.addEventListener("load", () => {
  user.innerHTML = sessionStorage.getItem("NOME");
  var cargo = sessionStorage.getItem("CARGO");

  if (cargo != "ADM") {
    document.getElementById("gerenciar").style.display = "none";
    document.getElementById("enderecos").style.display = "none";
  }
});

function sair() {
  window.location.href = "./index.html";
}
function irParaDashboard() {
  window.location.href = "./dashboard.html";
}
function irParaEnderecos() {
  window.location.href = "./gerenciar_endereco.html";
}
function irParaGerenciar() {
  window.location.href = "./gerenciamento.html";
}

function irParaConta() {
  window.location.href = "./conta.html";
}

function adicionarEndereco() {
  window.location.href = "./adicionar_endereco.html";
}

function sair() {
  window.location.href = "./index.html";
}

function adicionarConta() {
  window.location.href = "./adicionar_conta.html";
}
