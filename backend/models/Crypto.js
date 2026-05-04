const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true
  },
  price: {
    type: Number,
    required: true
  },
  change24h: {
    type: Number,
    default: 0
  },
  marketCap: {
    type: Number,
    default: 0
  },
  volume24h: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Crypto', cryptoSchema);