const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [{
    id: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    discount: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
  }]
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;


