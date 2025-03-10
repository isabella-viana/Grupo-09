
// Obs: Esse é um comentário para os meus colegas de grupo da faculdade... Se tiverem duvidas na minha lógica, me chamem no wpp. 
function Cadastrar() {
    var container = document.getElementById("container");
    container.classList.add("troca");
    var ladoEsquerdo = document.getElementById("ladoEsquerdo");

    ladoEsquerdo.innerHTML = `
        <div class="parteCima">
            <h1 id="Eleva" style="color: black;">Eleva</h1>
             <img src="imgs/image 8.png">
        </div>

        <form class="formCadastro" onsubmit="return false">
            <h3 style="color: black;">Crie sua conta</h3>
            <label style="color: black;">Nome:</label>
            <input id="input_nome" placeholder=" Nome completo">

            <label style="color: black;">E-mail:</label>
            <input id="input_email" placeholder=" E-mail">

            <label style="color: black;">Senha:</label>
            <input type="password" id="input_senha" placeholder="  Senha">

            <label style="color: black;">Confirmar Senha:</label>
            <input type="password" id="input_confirma_senha" placeholder="  Confirme sua senha">

            <div class="links">
                <button onclick="Registrar()">Cadastrar</button>
                <button type="button" onclick="VoltarParaLogin()">Voltar</button>
            </div>
        </form>
    `;
}

function VoltarParaLogin() {
    var container = document.getElementById("container");
    container.classList.remove("troca");

    var ladoEsquerdo = document.getElementById("ladoEsquerdo");

    ladoEsquerdo.innerHTML = `
        <div class="parteCima">
            <h1 id="Eleva" style="color: black;">Eleva</h1>
             <img src="imgs/image 8.png">
        </div>

        <form class="formLogin" onsubmit="return false">
            <h3 style="color: black;">Faça o seu login aqui</h3>
            <label style="color: black;">E-mail:</label>
            <input id="input_email" placeholder="  E-mail">

            <label style="color: black;">Senha:</label>
            <input type="password" id="input_senha" placeholder="  Senha">

            <div class="links">
                <button onclick="Login()">Login</button>
                <a href="">Esqueci minha senha</a>
            </div>

            <p style="color: black; font-size: 11px; text-align: center;">
                Ainda não tem um cadastro?
                <button type="button" onclick="Cadastrar()">Cadastre-se aqui</button>
            </p>
        </form>
    `;
}

function Registrar() {
    var nome = document.getElementById("input_nome").value;
    var email = document.getElementById("input_email").value;
    var senha = document.getElementById("input_senha").value;
    var confirmaSenha = document.getElementById("input_confirma_senha").value;

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    alert("Cadastro realizado com sucesso!");
    VoltarParaLogin();
}