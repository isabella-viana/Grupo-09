    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


function adicionarEndereco() {
  var cep = document.getElementById("cep").value.trim();
  var logradouro = document.getElementById("logradouro").value.trim();
  var numeroStr = document.getElementById("numero").value.trim();
  var numero = Number(numeroStr);
  var bairro = document.getElementById("bairro").value.trim();
  var cidade = document.getElementById("cidade").value.trim();
  var estado = document.getElementById("estado").value.trim();
  var cnpj = document.getElementById("cnpj").value.trim();
  var gerente = document.getElementById("gerente").value.trim();
  var complemento = document.getElementById("complemento").value.trim();
  var apelido = document.getElementById("apelido").value.trim();

  if (!cep) {
     Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Por favor, preencha o campo de CEP",

              });
    return false;
  }

  if (!logradouro) {
     Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Por favor, preencha o campo de Logradouro",

              });
    return false;
  }

  if (!numeroStr) {
     Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Por favor, preencha o campo de numero",

              });
  
    return false;
  }

  if (!bairro) {
     Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Por favor, preencha o campo de bairro",

              });
    return false;
  }

  if (!cidade) {
  Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Por favor, preencha todo o campo de cidade",

              });
    return false;
  }

  if (!estado) {
   Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Por favor, preencha todo o campo estado",

              });
    return false;
  }

  if (!cnpj) {
   Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Por favor, preencha todo o campo CNPJ",

              });
    return false;
  }

  if (!gerente) {
   Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Por favor, preencha todo o campo gerente",

              });
    return false;
  }

  if (!complemento) {
     Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Por favor, preencha todo o campo complemento",

              });
    return false;
  }

  if (!apelido) {
  Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Por favor, preencha todos os campo apelido",

              });
    return false;
  }

  if (isNaN(numero) || numero <= 0) {
     Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Por favor, insira um número válido para o campo Número",

              });
    return;
  }

  fetch("/endereco/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cep: cep,
      logradouro: logradouro,
      numeroStr: numeroStr,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      cnpj: cnpj,
      gerente: gerente,
      complemento: complemento,
      apelido: apelido,
    }),
  })
    .then((res) => {
      if (res.ok) {
        alert("Endereço cadastrado com sucesso!");
         Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Endereço cadastrado com sucesso!",

              });
        window.location.reload();
      } else {
        return res.json().then((data) => {
          throw new Error(data.mensagem || "Erro ao cadastrar endereço.");
        });
      }
    })

    .catch((erro) => {
      console.error("#ERRO:", erro);
    });

  return false;
}

function editarEndereco() {
  var cep = document.getElementById("cep").value.trim();
  var logradouro = document.getElementById("logradouro").value.trim();
  var numeroStr = document.getElementById("numero").value.trim();
  var numero = Number(numeroStr);
  var bairro = document.getElementById("bairro").value.trim();
  var cidade = document.getElementById("cidade").value.trim();
  var estado = document.getElementById("estado").value.trim();
  var cnpj = document.getElementById("cnpj").value.trim();
  var gerente = document.getElementById("gerente").value.trim();
  var complemento = document.getElementById("complemento").value.trim();
  var apelido = document.getElementById("apelido").value.trim();

  if (
    (!cep,
    !logradouro,
    !numeroStr,
    !bairro,
    !cidade,
    !estado,
    !cnpj,
    !gerente,
    !complemento,
    !apelido)
  ) {
     Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Para atualização do endereço é preciso passar todas as informações",

              });
    return false;
  }

  fetch("/endereco/atualizar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cep: cep,
      logradouro: logradouro,
      numeroStr: numeroStr,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      cnpj: cnpj,
      gerente: gerente,
      complemento: complemento,
      apelido: apelido,
    }),
  })
    .then((res) => {
      if (res.ok) {
         Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Endereço atualizado com sucesso!",

              });

        window.location.reload();
      } else {
        return res.json().then((data) => {
          throw new Error(data.mensagem || "Erro ao atualizar endereço.");
        });
      }
    })

    .catch((erro) => {
      console.error("#ERRO:", erro);
    });

  return false;
}
