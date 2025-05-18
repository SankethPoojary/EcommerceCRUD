require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const scrapeProduct = require("./scraper/scraper");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/api", productRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
mongoose.connection.on("error", (err) => console.error("MongoDB Connection Error:", err));


cron.schedule("0 * * * *", async () => {
  console.log("Running Scheduled Scraper");
  const productURLs = ["https://example.com/product1", "https://example.com/product2"];
  for (const url of productURLs) {
    await scrapeProduct(url);
  }
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
