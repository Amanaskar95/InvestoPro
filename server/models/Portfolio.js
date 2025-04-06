const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  stockSymbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  avgBuyPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
