const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());

async function enviarEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "viniciusgcosta0122@gmail.com",
      pass: "qgmr bkjq gyhn qdhh",
    },
  });

  const textoEmail = `
Um novo lead enviou solicitação para receber suas credenciais de acesso:

Nome: Empresa Exemplo Ltda
Email: contato@exemplo.com
Telefone: 11999999999
`;

  const mailOptions = {
    from: "viniciusgcosta0122@gmail.com",
    to: "pedrogandincfg@hotmail.com",
    subject: "Novo lead - Solicitação de credenciais",
    text: textoEmail,
  };

  await transporter.sendMail(mailOptions);
  console.log("Email enviado!");
}

// Testar só o envio sem servidor:
enviarEmail().catch(console.error);

/*
// Depois que terminar o backend, descomente isso pra rodar o servidor:

app.post("/cadastro", async (req, res) => {
  try {
    await enviarEmail();
    res.status(200).send("Email enviado com sucesso!");
  } catch (err) {
    console.error("Erro ao enviar email:", err);
    res.status(500).send("Erro ao enviar email.");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
*/
