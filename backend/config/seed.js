const Crypto = require('../models/Crypto');

const seedData = [
  { name: 'Bitcoin', symbol: 'BTC', price: 67432.18, change24h: 2.34, marketCap: 1320000000000, volume24h: 28500000000 },
  { name: 'Ethereum', symbol: 'ETH', price: 3456.21, change24h: 1.87, marketCap: 415000000000, volume24h: 15200000000 },
  { name: 'Tether', symbol: 'USDT', price: 1.00, change24h: 0.01, marketCap: 95000000000, volume24h: 45000000000 },
  { name: 'BNB', symbol: 'BNB', price: 587.43, change24h: -1.23, marketCap: 87000000000, volume24h: 1200000000 },
  { name: 'Solana', symbol: 'SOL', price: 145.67, change24h: 5.67, marketCap: 64000000000, volume24h: 2800000000 },
  { name: 'XRP', symbol: 'XRP', price: 0.52, change24h: -0.45, marketCap: 28000000000, volume24h: 1500000000 },
  { name: 'USDC', symbol: 'USDC', price: 1.00, change24h: 0.00, marketCap: 32000000000, volume24h: 5500000000 },
  { name: 'Cardano', symbol: 'ADA', price: 0.45, change24h: 3.21, marketCap: 16000000000, volume24h: 450000000 },
  { name: 'Avalanche', symbol: 'AVAX', price: 35.67, change24h: -2.34, marketCap: 14000000000, volume24h: 520000000 },
  { name: 'Dogecoin', symbol: 'DOGE', price: 0.12, change24h: 4.56, marketCap: 17000000000, volume24h: 890000000 },
  { name: 'Polkadot', symbol: 'DOT', price: 7.23, change24h: 1.89, marketCap: 10000000000, volume24h: 320000000 },
  { name: 'Chainlink', symbol: 'LINK', price: 14.56, change24h: -0.78, marketCap: 8500000000, volume24h: 480000000 },
  { name: 'Polygon', symbol: 'MATIC', price: 0.89, change24h: 2.45, marketCap: 8300000000, volume24h: 390000000 },
  { name: 'Litecoin', symbol: 'LTC', price: 84.32, change24h: 0.98, marketCap: 6300000000, volume24h: 410000000 },
  { name: 'Shiba Inu', symbol: 'SHIB', price: 0.000021, change24h: 6.78, marketCap: 12000000000, volume24h: 720000000 }
];

async function seedCryptoData() {
  try {
    const count = await Crypto.countDocuments();
    if (count === 0) {
      await Crypto.insertMany(seedData);
      console.log('Sample crypto data seeded successfully');
    } else {
      console.log('Crypto data already exists, skipping seed');
    }
  } catch (err) {
    console.error('Error seeding crypto data:', err);
  }
}

module.exports = { seedCryptoData };