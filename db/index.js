const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

console.log('Loaded MONGO_URI:', MONGO_URI); // ✅ Debug check

if (!MONGO_URI || !(MONGO_URI.startsWith('mongodb://') || MONGO_URI.startsWith('mongodb+srv://'))) {
  throw new Error('❌ MONGO_URI is missing or invalid. Check your .env file.');
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = mongoose;
