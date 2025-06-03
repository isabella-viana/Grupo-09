const nodemailer = require("nodemailer");

async function enviarCredenciaisParaEmpresa() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "viniciusgcosta0122@gmail.com",
      pass: "qgmr bkjq gyhn qdhh",
    },
  });

  // aqui gera uma senha aleatoria de até 8 digitos.
  function gerarSenhaAleatoria() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let senha = "";
    for (let i = 0; i < 8; i++) {
      senha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return senha;
  }

  const senhaInicial = gerarSenhaAleatoria();

  const textoEmail = `
Olá!

Temos o prazer de informar que a empresa Eleva tem o prazer de aceitar sua empresa como nosso novo cliente.

Aqui estão suas credenciais para o primeiro acesso ao nosso sistema:

- Usuário: ${"nome_da_empresa_ou_email"} 
- Senha provisória: ${senhaInicial}

Por favor, ao acessar pela primeira vez, altere sua senha para garantir a segurança da sua conta.

Se precisar de ajuda, estamos à disposição!

Atenciosamente,
Equipe Eleva
`;

  const mailOptions = {
    from: "viniciusgcosta0122@gmail.com",
    to: "pedrogandincfg@hotmail.com", // aqui a gente bota o e-mail da empresa 
    subject: "Seja bem-vindo à Eleva! Suas credenciais de acesso",
    text: textoEmail,
  };

  await transporter.sendMail(mailOptions);
  console.log("Email de credenciais enviado!");
}

enviarCredenciaisParaEmpresa().catch(console.error);
