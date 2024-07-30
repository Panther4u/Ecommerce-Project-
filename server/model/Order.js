// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   orderedProducts: [{
//     addedDate: { type: String },
//     afterDiscount: { type: String },
//     category: { type: String },
//     colors: { type: Array },
//     description: { type: String },
//     discount: { type: Number },
//     id: { type: String },
//     img: { type: String },
//     name: { type: String },
//     otherImages: { type: Array },
//     price: { type: String },
//     quantity: { type: Number },
//     rate: { type: Number },
//     shortName: { type: String },
//     sold: { type: Number },
//     votes: { type: Number }
//   }],
//   billingInfo: {
//     firstName: { type: String },
//     streetAddress: { type: String },
//     townCity: { type: String },
//     apartment: { type: String },
//     pincode: { type: String },
//     mobileNumber: { type: String },
//     saveInfo: { type: Boolean }
//   },
//   totalProducts: { type: Number },
//   deliveryMethod: { type: String },
//   totalBillAmount: { type: Number, required: true },
//   paymentMethod: { type: String },
//   transactionId: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   price: { type: Number }, // Assuming this is related to individual product price, not directly used in the schema
//   orderDate: { type: Date, default: Date.now },
  // status: {
  //   type: String,
  //   enum: ['Pending', 'Shipped', 'Delivered'],
  //   default: 'Pending'
  // }
// });

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  billingInfo: {
    firstName: {
      type: String,
      required: true
    },
    streetAddress: {
      type: String,
      required: true
    },
    townCity: {
      type: String,
      required: true
    },
    apartment: {
      type: String,
      required: false
    },
    pincode: {
      type: String,
      required: true
    },
    mobileNumber: {
      type: String,
      required: true
    }
  },
  invoiceId: {
    type: String,
    unique: true,
    required: true
  },
  cartProducts: [{
    id: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    discount: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
