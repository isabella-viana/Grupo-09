const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
const waitOn = require("wait-on");
const cron = require("node-cron");
const fetch = require("node-fetch");

async function tirarPrint() {
  await waitOn({
    resources: ["http://localhost:3333/dashboard.html"],
    timeout: 5000
  });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto("http://localhost:3333/dashboard.html", {
    waitUntil: "networkidle0",
  });

  await new Promise(resolve => setTimeout(resolve, 3000));

  await page.screenshot({ path: "PrintDashboard.png", fullPage: true });

  await browser.close();
  console.log("Screenshot capturado com sucesso!");
}

async function enviarEmail(emails , nomes) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "eleva9980@gmail.com",
      pass: "mvkh idwb ntdf dlhz",
    },
  });
  var htmls =[]
for (let i = 0; i < nomes.length; i++) {
  const htmlEmail =`
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
          <p style="font-size: 16px; color: #333333;">Olá! ${nomes[i]}</p>
          <p style="font-size: 16px; color: #333333;">
            Este é um recurso da <strong>Eleva</strong> que realiza o envio automático do print da dashboard para todos os administradores, todos os dias às 20h.
          </p>
          <p style="font-size: 16px; color: #333333;">Se precisar de ajuda, estamos à disposição!</p>

          <p style="font-size: 16px; color: #333333;">
            Atenciosamente,<br />
            <strong>Equipe Eleva</strong>
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 30px; text-align: center;">
         <img src="cid:dashboard" alt="Imagem do print da dashboard" style="max-width: 100%; height: auto; border-radius: 8px;" />
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

console.log("nome agora"+ nomes[i])
  htmls.push(htmlEmail);
}
 



  for (let i = 0; i < emails.length; i++) {
    const mailOptions = {
      from: "eleva9980@gmail.com",
      to: emails[i],
      subject: "Print automático do Dashboard",
      html: htmls[i],
      attachments: [
        {
          filename: "PrintDashboard.png",
          path: "./PrintDashboard.png",
          cid: "dashboard"
        }
      ]
    };
    await transporter.sendMail(mailOptions);
  }
  htmls=[]
}

cron.schedule("0 20 * * *", async () => {
  try {
    console.log("Execução automática iniciada às 20hrs...");
    fetch("http://localhost:3333/screenshot/buscarEmails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

    }).then(function (resposta) {
      console.log("ESTOU NO THEN DO BuscarEmails!");

      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then(json => {
          console.log("emails", json);
          console.log("Em formato JSON:", JSON.stringify(json));

          const EMAIL = json.map(item => item.email);
          const NOME = json.map(item => item.nome);
          console.log("nomes", NOME);


          console.log("Emails encontrados:", EMAIL);
          tirarPrint().then(() => {
            console.log("Print tirado com sucesso!");
            enviarEmail(EMAIL,NOME);
          }).catch(err => {
            console.error("Erro ao tirar print:", err);
          });

        });
      } else {
        console.log("Erro ao puxar os dados do back-end.");
      }
    }).catch(function (erro) {
      console.log("Erro na requisição:", erro);
    });


  } catch (error) {
    console.error("Erro na execução automática:", error);
  }
});

