const puppeteer = require("puppeteer");
const Product = require("../models/Product");

  async function scrapeProduct(url) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const productData = await page.evaluate(() => {
      const name = document.querySelector(".product-title")?.textContent.trim() || "N/A";
      const price = document.querySelector(".price")?.textContent.trim() || "N/A";
      const description = document.querySelector(".description")?.textContent.trim() || "N/A";
      const ratings = document.querySelector(".ratings")?.textContent.trim() || "N/A";
      return { name, price, description, ratings };
    });

    productData.url = url;
    productData.scrapedAt = new Date();

    await Product.findOneAndUpdate({ url }, productData, { upsert: true, new: true });

    console.log(`Scraped: ${productData.name}`);
  } catch (err) {
    console.error(`Error scraping ${url}:`, err.message);
  } finally {
    await browser.close();
  }
}

module.exports = scrapeProduct;
