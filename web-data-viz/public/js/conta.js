// const nome = sessionStorage.NOME_USUARIO;
// const email = sessionStorage.EMAIL_USUARIO;
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

function cadastrar() {
  var nome = document.getElementById("nome").value.trim();
  var contato = document.getElementById("contato").value.trim();
  var userName = document.getElementById("userName").value.trim();
  var email = document.getElementById("email").value.trim();
  var cargo = document.getElementById("cargo").value.trim();
  var cnpj = document.getElementById("cnpj").value.trim();
  var senha = document.getElementById("senha").value.trim();

  if (!nome || !contato || !userName || !email || !senha || !cnpj || !cargo) {
     Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Por favor, preencha todos os campos obrigatórios.",

              });
    return;
  }

  var dadosUsuario = {
    nome,
    contato,
    userName,
    email,
    cargo,
    cnpj,
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
                title: "Usuário cadastrado com sucesso!",
                icon: "success",
                draggable: true
              });

        window.location.reload();
      } else {
        resposta.json().then((data) => {
          console.error("Erro do servidor:", data);
           Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Erro ao cadastrar usuário:.",

              });
          alert(
             (data.erro || "Erro desconhecido.")
          );
        });
      }
    })
    .catch((erro) => {
      console.error("Erro de conexão:", erro);
       Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Erro ao conectar com o servidor.",

              });
    });
}
