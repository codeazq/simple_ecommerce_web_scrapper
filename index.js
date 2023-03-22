const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const config = require("./config");

(async function () {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const csvHeading = `name,price,description,image\n`;
  fs.appendFile("./products.csv", csvHeading);

  await page.goto(config.productsURL);

  // get all product urls on the page
  const productUrls = await page.$$eval(config.productUrlSelector, (aTags) => {
    return aTags.map((aTag) => aTag.href);
  });

  for (const productUrl of productUrls) {
    console.log("for (const productUrl of productUrls");
    await page.goto(productUrl, { waitUntil: "load" });

    const productTitle = await page.$eval(
      config.productTitleSelectorH1,
      (el) => el.textContent
    );

    const productPrice = await page.$eval(
      config.productPriceSelectorForBdiElement,
      (el) => el.childNodes[1].textContent.replaceAll(",", "")
    );

    const productShortDescription = await page.$eval(
      config.productShortDescSelectorDiv,
      (el) => el.textContent.replace(/[\n\r\t]/g, "")
    );

    const productImageSrc = await page.$eval(config.productImageUrl, (el) => {
      const urlObject = new URL(el.src);
      return urlObject.protocol + "//" + urlObject.host + urlObject.pathname;
    });

    fs.appendFile(
      "./products.csv",
      `${productTitle},${productPrice},${productShortDescription},${productImageSrc}\n`
    );
  }

  await browser.close();
})();
