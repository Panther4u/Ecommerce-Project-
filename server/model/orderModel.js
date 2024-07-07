const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  orderedProducts: [{
    addedDate: { type: String },
    afterDiscount: { type: String },
    category: { type: String },
    colors: { type: Array },
    description: { type: String },
    discount: { type: Number },
    id: { type: String },
    img: { type: String },
    name: { type: String },
    otherImages: { type: Array },
    price: { type: String },
    quantity: { type: Number },
    rate: { type: Number },
    shortName: { type: String },
    sold: { type: Number },
    votes: { type: Number }
  }],
  billingInfo: {
    name: { type: String },
    streetAddress: { type: String },
    townCity: { type: String },
    apartment: { type: String },
    pincode: { type: String },
    mobileNumber: { type: String },
    saveInfo: { type: Boolean }
  },
  totalProducts: { type: Number },
  deliveryMethod: { type: String },
  totalBillAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  price: { type: Number },
  orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
