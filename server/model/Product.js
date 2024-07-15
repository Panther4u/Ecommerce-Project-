const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  shortName: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  description: { type: String, required: true },
  addedDate: { type: Date, default: Date.now },
  img: { type: String, required: true }, // Main image URL
  otherImages: [String], // Additional image URLs
  colors: [{
    name: { type: String, required: true },
    color: { type: String, required: true },
  }],
  rate: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  sold: { type: Number, default: 0 },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
