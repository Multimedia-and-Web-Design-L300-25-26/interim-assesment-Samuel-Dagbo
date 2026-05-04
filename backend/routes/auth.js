const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Crypto = require('../models/Crypto');
const auth = require('../middleware/auth');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'coinbase-secret-key';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ 
      name, 
      email, 
      password,
      balance: 10000,
      holdings: [],
      transactions: []
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        balance: user.balance,
        holdings: user.holdings,
        transactions: user.transactions
      } 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        balance: user.balance,
        holdings: user.holdings,
        transactions: user.transactions
      } 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

router.get('/profile', auth, async (req, res) => {
  res.json({ 
    user: { 
      id: req.user._id, 
      name: req.user.name, 
      email: req.user.email,
      balance: req.user.balance,
      holdings: req.user.holdings,
      transactions: req.user.transactions
    } 
  });
});

router.post('/buy', auth, async (req, res) => {
  try {
    const { symbol, amount } = req.body;
    
    const crypto = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (!crypto) {
      return res.status(404).json({ message: 'Cryptocurrency not found' });
    }

    const totalCost = crypto.price * amount;
    if (totalCost > req.user.balance) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const existingHolding = req.user.holdings.find(h => h.symbol === symbol.toUpperCase());
    
    if (existingHolding) {
      const newAmount = existingHolding.amount + amount;
      existingHolding.avgBuyPrice = ((existingHolding.avgBuyPrice * existingHolding.amount) + totalCost) / newAmount;
      existingHolding.amount = newAmount;
    } else {
      req.user.holdings.push({
        cryptoId: crypto._id,
        symbol: crypto.symbol,
        name: crypto.name,
        amount: amount,
        avgBuyPrice: crypto.price
      });
    }

    req.user.balance -= totalCost;
    req.user.transactions.unshift({
      type: 'buy',
      symbol: crypto.symbol,
      name: crypto.name,
      amount: amount,
      price: crypto.price,
      total: totalCost
    });

    await req.user.save();
    
    res.json({
      message: 'Purchase successful',
      balance: req.user.balance,
      holdings: req.user.holdings,
      transaction: req.user.transactions[0]
    });
  } catch (err) {
    res.status(500).json({ message: 'Error buying crypto', error: err.message });
  }
});

router.post('/sell', auth, async (req, res) => {
  try {
    const { symbol, amount } = req.body;
    
    const existingHolding = req.user.holdings.find(h => h.symbol === symbol.toUpperCase());
    if (!existingHolding || existingHolding.amount < amount) {
      return res.status(400).json({ message: 'Insufficient holdings' });
    }

    const crypto = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (!crypto) {
      return res.status(404).json({ message: 'Cryptocurrency not found' });
    }

    const totalSale = crypto.price * amount;
    existingHolding.amount -= amount;

    if (existingHolding.amount === 0) {
      req.user.holdings = req.user.holdings.filter(h => h.symbol !== symbol.toUpperCase());
    }

    req.user.balance += totalSale;
    req.user.transactions.unshift({
      type: 'sell',
      symbol: crypto.symbol,
      name: crypto.name,
      amount: amount,
      price: crypto.price,
      total: totalSale
    });

    await req.user.save();
    
    res.json({
      message: 'Sale successful',
      balance: req.user.balance,
      holdings: req.user.holdings,
      transaction: req.user.transactions[0]
    });
  } catch (err) {
    res.status(500).json({ message: 'Error selling crypto', error: err.message });
  }
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;