const nodemailer = require("nodemailer");

async function enviarCredenciaisParaEmpresa(req, res) {
  try {
    const email = req.body.emailRepresentante;
    const senha = req.body.senha;
    console.log(email)

    if (!email) {
      return res.status(400).json({ mensagem: "E-mail do representante não fornecido." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "eleva9980@gmail.com",
        pass: "mvkh idwb ntdf dlhz", 
      },
    });

    const htmlEmail = `
<!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Bem-vindo à Eleva</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 30px; text-align: center; background-color: #77AECB; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
              <h1 style="margin: 0;">Bem-vindo à Eleva!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px; color: #333333;">Olá!</p>
              <p style="font-size: 16px; color: #333333;">
                Temos o prazer de informar que a <strong>Eleva</strong> aceitou sua empresa como nosso novo cliente.
              </p>
              <p style="font-size: 16px; color: #333333;">
                Aqui estão suas credenciais para o primeiro acesso ao nosso sistema:
              </p>

              <div style="background-color: #f0f4ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0; font-size: 16px;"><strong>Usuário:</strong> ${email}</p>
                <p style="margin: 0; font-size: 16px;"><strong>Senha provisória:</strong> ${senha}</p>
              </div>

              <p style="font-size: 16px; color: #333333;">
                Por favor, ao acessar pela primeira vez, <strong>alterar sua senha</strong> para garantir a segurança da sua conta.
              </p>

              <p style="font-size: 16px; color: #333333;">Se precisar de ajuda, estamos à disposição!</p>

              <p style="font-size: 16px; color: #333333;">
                Atenciosamente,<br />
                <strong>Equipe Eleva</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center; background-color: #f0f0f0; font-size: 12px; color: #888888; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
              © 2025 Eleva. Todos os direitos reservados.
            </td>
          </tr>
        </table>
      </body>
    </html>
`;

    const mailOptions = {
      from: "eleva9980@gmail.com",
      to: email, 
      subject: "Seja bem-vindo à Eleva! Suas credenciais de acesso",
      html: htmlEmail,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email de credenciais enviado!");

    return res.status(200).json({ mensagem: "Email de credenciais enviado com sucesso!" });

  } catch (erro) {
    console.error("Erro ao enviar e-mail:", erro);
    return res.status(500).json({ mensagem: "Erro ao enviar e-mail", erro: erro.message });
  }
}

module.exports = {
  enviarCredenciaisParaEmpresa,
};