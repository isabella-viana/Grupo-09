        async function CriarTabela() {
  console.log("Entrei na função Criar Tabela");

  const email = sessionStorage.getItem('emailUsuario');
  console.log(email);

  try {
    // Passa o email na query string para a rota
    const resposta = await fetch(`/gerenciamento/listarEnderecos?email=${encodeURIComponent(email)}`);
    const enderecos = await resposta.json();

    const tabela = document.getElementById("tabelaUsuarios").getElementsByTagName("tbody")[0];
    tabela.innerHTML = ""; // Limpa antes de preencher

    enderecos.forEach(endereco => {
      const linha = tabela.insertRow();

      linha.insertCell(0).textContent = endereco.idendereco;
      linha.insertCell(1).textContent = endereco.cep;

      const enderecoCompleto = `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade}`;
      linha.insertCell(2).textContent = enderecoCompleto;

      linha.insertCell(3).textContent = `${endereco.email} (${endereco.cargo})`;

      linha.insertCell(4).textContent = endereco.nome_fantasia ?? "Sem cadastro";


       const celulaAcoes = linha.insertCell(5);
  celulaAcoes.classList.add("col-acoes");
  celulaAcoes.style.display = "none";
  celulaAcoes.innerHTML = `<i class="bi bi-trash" style="color:red; cursor:pointer; font-size: 30px;" onclick="removerLinha(this)"></i>`;
    });



  } catch (erro) {
    console.error("Erro ao buscar dados:", erro);
  } 
}
window.onload = CriarTabela;


let modoRemoverAtivo = false;

function removerEndereco() {
  const colunasAcoes = document.querySelectorAll(".col-acoes");
  modoRemoverAtivo = !modoRemoverAtivo;

  colunasAcoes.forEach(col => {
    col.style.display = modoRemoverAtivo ? "table-cell" : "none";
  });
}

async function removerLinha(iconElement) {
  // Pega a linha (tr) que contém o ícone clicado
  const linha = iconElement.closest('tr');

  // Pega o ID do endereço na primeira célula da linha
  const idEndereco = linha.cells[0].textContent;

  // Confirma se o usuário quer mesmo remover
  const confirma = confirm(`Deseja realmente remover o endereço ID ${idEndereco}?`);
  if (!confirma) return;

  try {
    // Faz requisição DELETE para a API do backend
    const resposta = await fetch(`/gerenciamento/removerEndereco/${idEndereco}`, {
      method: 'DELETE'
    });

    if (resposta.ok) {
      // Remove a linha da tabela se deu certo
      linha.remove();
      alert('Endereço removido com sucesso!');
    } else {
      // Caso dê erro, mostra mensagem
      alert('Erro ao remover endereço.');
      console.error('Erro na resposta do servidor:', resposta.statusText);
    }
  } catch (erro) {
    alert('Erro na comunicação com o servidor.');
    console.error(erro);
  }
}



