const puppeteer = require("puppeteer");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

async function tirarPrint() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const filePath = `file://${path.join(__dirname, "public", "dashboard.html")}`;

  await page.goto(filePath, { waitUntil: "networkidle0" });
  await page.screenshot({ path: "screenshot.png", fullPage: true });

  await browser.close();
}

async function enviarEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "viniciusgcosta0122@gmail.com",
      pass: "qgmr bkjq gyhn qdhh",
    },
  });

  const mailOptions = {
    from: "viniciusgcosta0122@gmail.com",
    to: "raffu07@gmail.com",
    subject: "Print automático do Dashboard",
    text: "Segue em anexo o print da dashboard.",
    attachments: [
      {
        filename: "screenshot.png",
        path: "./screenshot.png",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  console.log("Email enviado com sucesso!");
}

cron.schedule("0 20 * * *", async () => {
  try {
    console.log("Iniciando tarefa agendada...");
    await tirarPrint();
    await enviarEmail();
  } catch (error) {
    console.error("Erro durante a execução:", error);
  }
});

(async () => {
  await tirarPrint();
  await enviarEmail();
})();
