const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
const waitOn = require("wait-on");
const cron = require("node-cron"); 

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
  console.log("📸 Screenshot capturado com sucesso!");
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
    to: "victor.hsouza@sptech.school",
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

(async () => {
  try {
    console.log("🚀 Execução manual...");
    await tirarPrint();
    await enviarEmail();
  } catch (error) {
    console.error("❌ Erro durante execução:", error);
  }
})();

cron.schedule("0 20 * * *", async () => {
  try {
    console.log("⏰ Execução automática iniciada às 20h...");
    await tirarPrint();
    await enviarEmail();
  } catch (error) {
    console.error("❌ Erro na execução automática:", error);
  }
});
