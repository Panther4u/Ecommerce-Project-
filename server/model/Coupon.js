// models/Coupon.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const couponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  discountPercent: { type: Number, required: true },
  validUntil: { type: Date, required: true },
  usedBy: { type: String, required: true },
  usedAt: { type: Date }
});

module.exports = mongoose.model('Coupon', couponSchema);
