
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

function MostrarSenha() {
    var campoSenha = document.getElementById("input_senha");
    var ImageEye = document.getElementById("IconEye");

    if (campoSenha.type === "password") {
        campoSenha.type = "text";
        ImageEye.src = "https://media.discordapp.net/attachments/1341220564764856320/1351381520345993266/icons8-closed-eye-10_1.png?ex=67da2b9d&is=67d8da1d&hm=33cd397be8e708b4653f2afad360f7e73055d807de09dc586f3d4dcdc495ea0c&=&format=webp&quality=lossless"; 
    } else {
        campoSenha.type = "password";
        ImageEye.src = "https://media.discordapp.net/attachments/1341220564764856320/1351374252586045503/icons8-eye-10.png?ex=67da24d9&is=67d8d359&hm=b3123baa661e70ac294690e5c05f348c4f0136433facc498a8db300389288c77&=&format=webp&quality=lossless"; 
    }
}

