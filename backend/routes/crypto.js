const express = require('express');
const Crypto = require('../models/Crypto');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ name: 1 });
    res.json(cryptos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cryptos', error: err.message });
  }
});

router.get('/gainers', async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ change24h: -1 }).limit(10);
    res.json(cryptos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching gainers', error: err.message });
  }
});

router.get('/new', async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 }).limit(10);
    res.json(cryptos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching new listings', error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { name, symbol, price, change24h, marketCap, volume24h } = req.body;
    const crypto = new Crypto({ name, symbol, price, change24h, marketCap, volume24h });
    await crypto.save();
    res.status(201).json(crypto);
  } catch (err) {
    res.status(500).json({ message: 'Error adding crypto', error: err.message });
  }
});

module.exports = router;