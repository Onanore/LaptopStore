// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  laptops: [{
    laptop: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop', required: true },
    quantity: { type: Number, default: 1 }
  }],
  totalPrice: { type: Number },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' }
});

// Before saving, calculate total price
orderSchema.pre('save', async function(next) {
  const Laptop = require('./Laptop');
  let total = 0;
  for (let item of this.laptops) {
    const laptop = await Laptop.findById(item.laptop);
    if (laptop) {
      total += laptop.price * item.quantity;
    }
  }
  this.totalPrice = total;
  next();
});

module.exports = mongoose.model('Order', orderSchema);
