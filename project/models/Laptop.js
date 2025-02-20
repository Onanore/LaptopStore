// models/Laptop.js
const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  brand: { type: String, required: true, index: true },
  model: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  specifications: {
    processor: String,
    ram: String,
    storage: String,
    graphics: String,
    display: String
  },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Laptop', laptopSchema);
