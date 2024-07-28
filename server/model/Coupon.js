const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discountPercent: {
    type: Number,
    required: true
  },
  valid: {
    type: String,
    required: true,
    enum: ['ALL_TIME_APPLY', 'SPECIFIC_DATE', 'LIMITED_USE'] // Example of possible values
  },
  usedBy: [{
    type: String // Assuming you use userId as a string
  }]
});

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
