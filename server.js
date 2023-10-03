const express = require("express");
const puppeteer = require("puppeteer");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  const page = await browser.newPage();

  await page.goto("https://www.cnbc.com/technology/");
  const pageContent = await page.evaluate(() => {
    const arr = [];
    document.querySelectorAll(".Card-standardBreakerCard").forEach((e) => {
      const imgUrl = e.querySelector("img.Card-mediaContainerInner");
      const title = e.querySelector("a.Card-title");
      if (imgUrl && title) {
        arr.push({
          imgUrl: imgUrl.src,
          title: title.textContent,
          link: title.href,
        });
      }
    });
    return arr;
  });

  res.status(200).send(pageContent);
  browser.close();
});

const port = 10000;
app.listen(port, () => {
  console.log(`subiu com sucesso na porta ${port}`);
});
