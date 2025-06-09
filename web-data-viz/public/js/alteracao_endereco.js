window.addEventListener("load", () => {
  const idempresa = sessionStorage.getItem("ID_EMPRESA");
  user.innerHTML = sessionStorage.getItem("NOME");

  if (!idempresa) {
    console.error("ID_ENDERECO não encontrado no sessionStorage");
    return;
  }

  fetch(`/endereco/buscarCnpj/${idempresa}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erro ao buscar informações.");
      }
      return res.json();
    })
    .then((dados) => {
      document.getElementById("cnpj").value = dados.cnpj;
    })
    .catch((erro) => {
      console.error("#ERRO ao carregar dados:", erro);
    });
});

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
      text: "Por favor, preencha o campo de Número",
    });
    return false;
  }

  if (!bairro) {
    Swal.fire({
      icon: "error",
      title: "Erro",
      text: "Por favor, preencha o campo de Bairro",
    });
    return false;
  }

  if (!cidade) {
    Swal.fire({
      icon: "error",
      title: "Erro",
      text: "Por favor, preencha o campo de Cidade",
    });
    return false;
  }

  if (!estado) {
    Swal.fire({
      icon: "error",
      title: "Erro",
      text: "Por favor, preencha o campo de Estado",
    });
    return false;
  }

  if (!gerente) {
    Swal.fire({
      icon: "error",
      title: "Erro",
      text: "Por favor, preencha o campo de Gerente",
    });
    return false;
  }

  if (!complemento) {
    Swal.fire({
      icon: "error",
      title: "Erro",
      text: "Por favor, preencha o campo de Complemento",
    });
    return false;
  }

  if (!apelido) {
    Swal.fire({
      icon: "error",
      title: "Erro",
      text: "Por favor, preencha o campo de Apelido",
    });
    return false;
  }

  if (isNaN(numero) || numero <= 0) {
    Swal.fire({
      icon: "error",
      title: "Erro",
      text: "Por favor, Insira um valor válido para o número",
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
        Swal.fire({
          title: "Endereço cadastrado com sucesso!",
          icon: "success",
          draggable: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "./adicionar_endereco.html";
          }
        });
      } else {
        return res.json().then((data) => {
          throw new Error(data.mensagem || "Erro ao cadastrar endereço.");
        });
      }
    })
    .catch((erro) => {
      console.error("#ERRO:", erro);
      Swal.fire({
        title: "Erro ao cadastrar endereço!",
        text: erro.message || "Erro desconhecido.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    });

  return false;
}
