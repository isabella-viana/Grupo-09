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
    alert("Por favor, preencha o campo de CEP");
    return false;
  }

  if (!logradouro) {
    alert("Por favor, preencha o campo de Logradouro");
    return false;
  }

  if (!numeroStr) {
    alert("Por favor, preencha o campo de número");
    return false;
  }

  if (!bairro) {
    alert("Por favor, preencha o campo de bairro");
    return false;
  }

  if (!cidade) {
    alert("Por favor, preencha o campo de cidade");
    return false;
  }

  if (!estado) {
    alert("Por favor, preencha o campo de estado");
    return false;
  }

  if (!gerente) {
    alert("Por favor, preencha o campo de gerente");
    return false;
  }

  if (!complemento) {
    alert("Por favor, preencha o campo de complemento");
    return false;
  }

  if (!apelido) {
    alert("Por favor, preencha o campo de apelido");
    return false;
  }

  if (isNaN(numero) || numero <= 0) {
    alert("Por favor, insira um número válido para o campo Número.");
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
