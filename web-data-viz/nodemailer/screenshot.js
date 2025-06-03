const puppeteer = require("puppeteer");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const waitOn = require("wait-on");

async function tirarPrint() {
  // ✅ Espera até o servidor estar online
  await waitOn({ resources: ["http://localhost:3000/dashboard.html"], timeout: 10000 });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto("http://localhost:3000/dashboard.html", { waitUntil: "networkidle0" });
  await page.screenshot({ path: "PrintDashboard.png", fullPage: true });

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
    to: "pedrogandincfg@hotmail.com",
    subject: "Print automático do Dashboard",
    text: "Segue em anexo o print da dashboard.",
    attachments: [
      {
        filename: "PrintDashboard.png",
        path: "./PrintDashboard.png",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  console.log("✅ Email enviado com sucesso!");
}

cron.schedule("0 20 * * *", async () => {
  try {
    console.log("🕒 Iniciando tarefa agendada...");
    await tirarPrint();
    await enviarEmail();
  } catch (error) {
    console.error("❌ Erro durante execusção agendada:", error);
  }
});

(async () => {
  try {
    await tirarPrint();
    await enviarEmail();
  } catch (error) {
    console.error("❌ Erro durante execução imediata:", error);
  }
})();
