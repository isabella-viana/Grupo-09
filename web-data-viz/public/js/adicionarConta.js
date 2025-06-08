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
    alert("Por favor, preencha todos os campos obrigatórios.");
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
        alert("Usuário cadastrado com sucesso!");
        window.location.reload();
      } else {
        resposta.json().then((data) => {
          console.error("Erro do servidor:", data);
          alert(
            "Erro ao cadastrar usuário: " + (data.erro || "Erro desconhecido.")
          );
        });
      }
    })
    .catch((erro) => {
      console.error("Erro de conexão:", erro);
      alert("Erro ao conectar com o servidor.");
    });
}
