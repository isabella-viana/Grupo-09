function adicionarEndereco(event) {
  event.preventDefault();

  const cep = document.getElementById("cep").value.trim();
  const logradouro = document.getElementById("logradouro").value.trim();
  const numeroStr = document.getElementById("numero").value.trim();
  const numero = Number(numeroStr);
  const bairro = document.getElementById("bairro").value.trim();
  const cidade = document.getElementById("cidade").value.trim();
  const estado = document.getElementById("estado").value.trim();
  const cnpj = document.getElementById("cnpj").value.trim();
  const gerente = document.getElementById("gerente").value.trim();
  const complemento = document.getElementById("complemento").value.trim();
  const apelido = document.getElementById("apelido").value.trim();

  // Validação básica dos campos obrigatórios
  if (!cep || !cnpj || !gerente) {
    alert("Por favor, preencha os campos obrigatórios: CEP, CNPJ e Gerente.");
    return;
  }

  if (!logradouro || !numeroStr || !bairro || !cidade || !estado) {
    alert(
      "Por favor, preencha todos os campos do endereço (logradouro, número, bairro, cidade, estado)."
    );
    return;
  }

  if (isNaN(numero) || numero <= 0) {
    alert("Por favor, insira um número válido para o campo Número.");
    return;
  }

  const endereco = {
    cep,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    cnpj,
    gerente,
    complemento,
    apelido,
  };

  fetch("/endereco", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(endereco),
  })
    .then((resposta) => {
      if (resposta.ok) {
        alert("Endereço adicionado com sucesso!");
        window.location.reload();
      } else {
        resposta.json().then((data) => {
          console.error("Erro do servidor:", data);
          alert("Erro ao adicionar endereço: " + data.erro);
        });
      }
    })
    .catch((erro) => {
      console.error("Erro de conexão:", erro);
      alert("Erro ao conectar com o servidor.");
    });
}
