const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  streetAddress: { type: String, required: true },
  townCity: { type: String, required: true },
  apartment: { type: String },
  pincode: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  addressList: [{ address: String, pincode: String }]
}, { timestamps: true });

const Billing = mongoose.model('Billing', billingSchema);

module.exports = Billing;
