user.innerHTML = sessionStorage.getItem("NOME");

function cadastrar() {
  const idempresa = sessionStorage.getItem("ID_EMPRESA");
  var nome = document.getElementById("nome").value.trim();
  var contato = document.getElementById("contato").value.trim();
  var userName = document.getElementById("userName").value.trim();
  var email = document.getElementById("email").value.trim();
  var cargo = document.getElementById("cargo").value.trim();
  var cpf = document.getElementById("cpf").value.trim();
  var senha = document.getElementById("senha").value.trim();

  if (!nome || !contato || !userName || !email || !senha || !cargo || !cpf) {
    Swal.fire({
      icon: "error",
      title: "Erro",
      text: "Por favor, preencha o campo de Apelido",
    });
    return;
  }

  var dadosUsuario = {
    nome,
    contato,
    userName,
    email,
    cargo,
    cpf,
    idempresa,
    senha,
  };

  fetch("/conta/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosUsuario),
  })
    .then((resposta) => {
      if (resposta.ok) {
        Swal.fire({
          title: "Endereço cadastrado com sucesso!",
          icon: "success",
          draggable: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload;
          }
        });
      } else {
        resposta.json().then((data) => {
          console.error("Erro do servidor:", data);
          Swal.fire({
            title: "Erro ao cadastrar usuário!",
            text: data.erro || "Erro desconhecido.",
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
      }
    })
    .catch((erro) => {
      console.error("Erro de conexão:", erro);
      Swal.fire({
        title: "Erro de conexão!",
        text: "Não foi possível conectar ao servidor.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    });
}
