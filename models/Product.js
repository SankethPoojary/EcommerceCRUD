const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String },
ratings: { type: String },
  url: { type: String, required: true, unique: true },
  scrapedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
