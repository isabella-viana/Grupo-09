
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
            <div class="senha">
                    <input type="password" id="input_senha" placeholder="  Senha">
                    <i id="iconeOlho" class="bi-eye-slash" onclick="MostrarSenha()"></i>
                </div>

            <label style="color: black;">Confirmar Senha:</label>
             <div class="senha">
                    <input type="password" id="input_confirma_senha" placeholder=" Confirmar Senha">
                    <i id="iconeOlhoo" class="bi-eye-slash" onclick="MostrarConfirmacaoSenha()"></i>
            </div>
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
          <a href="../public/index.html" class="home"><img src="../public/imgs/home icon.png"></a>
            <h1 id="Eleva" style="color: black;">Eleva</h1>
             <img src="imgs/image 8.png">
        </div>

        <form class="formLogin" onsubmit="return false">
            <h3 style="color: black;">Faça o seu login aqui</h3>
            <label style="color: black;">E-mail:</label>
            <input id="input_email" placeholder="  E-mail">

            <label style="color: black;">Senha:</label>
             <div class="senha">
                    <input type="password" id="input_senha" placeholder="  Senha">
                    <i id="iconeOlho" class="bi-eye-slash" onclick="MostrarSenha()"></i>
            </div>

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

function MostrarSenha() {
    var campoSenha = document.getElementById("input_senha");
    var iconeOlho = document.getElementById("iconeOlho");

    if (campoSenha.type === "password") {
        campoSenha.type = "text";
        iconeOlho.classList.remove('bi-eye-slash');
        iconeOlho.classList.add('bi-eye');
    } else {
        campoSenha.type = "password";
        iconeOlho.classList.remove('bi-eye');
        iconeOlho.classList.add('bi-eye-slash');
    }
}
function MostrarConfirmacaoSenha(){
    var campoSenha = document.getElementById("input_confirma_senha");
    var iconeOlho = document.getElementById("iconeOlhoo");

    if (campoSenha.type === "password") {
        campoSenha.type = "text";
        iconeOlho.classList.remove('bi-eye-slash');
        iconeOlho.classList.add('bi-eye');
    } else {
        campoSenha.type = "password";
        iconeOlho.classList.remove('bi-eye');
        iconeOlho.classList.add('bi-eye-slash');
    }
   }

