const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: String,  // Assuming you're using UUIDs as strings
    required: true
  },
  products: [{
    id: String,
    img: String,
    name: String,
    shortName: String,
    afterDiscount: String,
    quantity: Number
  }]
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
