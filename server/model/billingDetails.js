const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billingSchema = new Schema({
  name: { type: String, required: true },
  streetAddress: { type: String, required: true },
  townCity: { type: String, required: true },
  apartment: { type: String },
  pincode: { type: String, required: true },
  mobileNumber: { type: String, required: true },
});

const BillingDetails = mongoose.model('BillingDetails', billingSchema);

module.exports = BillingDetails;
