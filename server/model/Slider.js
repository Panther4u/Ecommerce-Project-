
const mongoose = require('mongoose');

// Slider Schema and Model
const sliderSchema = new mongoose.Schema({
  productName: String,
  productImg: String,
  logoImg: String,
  discountText: String,
  id: String,
});



const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;