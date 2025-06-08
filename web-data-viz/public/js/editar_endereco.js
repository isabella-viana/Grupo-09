window.addEventListener("load", () => {
  const idEndereco = sessionStorage.getItem("ID_ENDERECO");

  if (!idEndereco) {
    console.error("ID_ENDERECO não encontrado no sessionStorage");
    return;
  }

  fetch(`/endereco/buscarInformacoes/${idEndereco}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erro ao buscar informações.");
      }
      return res.json();
    })
    .then((dados) => {
      document.getElementById("cep").value = dados.cep;
      document.getElementById("estado").value = dados.estado;
      document.getElementById("cidade").value = dados.cidade;
      document.getElementById("bairro").value = dados.bairro;
      document.getElementById("logradouro").value = dados.logradouro;
      document.getElementById("numero").value = dados.numero;
      document.getElementById("complemento").value = dados.complemento;
      document.getElementById("cnpj").value = dados.cnpj;
      document.getElementById("apelido").value = dados.apelido;
      document.getElementById("gerente").value = dados.gerente;
    })
    .catch((erro) => {
      console.error("#ERRO ao carregar dados:", erro);
    });
});

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
    alert(
      "Para atualização do endereço é preciso passar todas as informações."
    );
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
        alert("Endereço atualizado com sucesso!");
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
