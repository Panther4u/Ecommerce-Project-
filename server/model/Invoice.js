const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the invoice
const invoiceSchema = new Schema({
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
  }
});

// Create the Invoice model using the schema
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
