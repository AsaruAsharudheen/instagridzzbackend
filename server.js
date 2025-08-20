require('dotenv').config(); // ✅ Load .env first

const express = require('express');
const cors = require('cors');
const path = require('path');

require('./db'); // ✅ Connect to MongoDB

const { requestInfo } = require('./middlewares');
const routes = require('./Routes');

const App = express();

// Middleware
App.use(cors());
App.use(express.static('public'));
App.use(requestInfo);
App.use(express.json());

// Routes
App.use('/api', routes);
App.use('/images', express.static(path.join(__dirname, 'public/images')));
App.use('/video', express.static(path.join(__dirname, 'public/videos')));

const PORT = 2025;

App.listen(PORT, () => {
  console.log(`✅ App is running successfully on port ${PORT}`);
});
