const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.9 Safari/537.36"
  );
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
