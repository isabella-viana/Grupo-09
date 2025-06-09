var nome = sessionStorage.getItem("NOME");
var cpf = sessionStorage.getItem("CPF");
var username = sessionStorage.getItem("USERNAME");
var contato = sessionStorage.getItem("CONTATO");
var cargo = sessionStorage.getItem("CARGO");
var email = sessionStorage.getItem("emailUsuario");

document.getElementById("nome").value = nome;
document.getElementById("cpf").value = cpf;
document.getElementById("userName").value = username;
document.getElementById("contato").value = contato;
document.getElementById("cargo").value = cargo;
document.getElementById("email").value = email;

window.addEventListener("load", () => {
  var nome = sessionStorage.getItem("NOME");
  var cpf = sessionStorage.getItem("CPF");
  var username = sessionStorage.getItem("USERNAME");
  var contato = sessionStorage.getItem("TELEFONE");
  var cargo = sessionStorage.getItem("CARGO");
  var email = sessionStorage.getItem("emailUsuario");

  document.getElementById("nome").value = nome;
  document.getElementById("cpf").value = cpf;
  document.getElementById("userName").value = username;
  document.getElementById("contato").value = contato;
  document.getElementById("cargo").value = cargo;
  document.getElementById("email").value = email;
});
