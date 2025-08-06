const express = require('express');

const { signup, login, getAdmin } = require('../Controllers/admin-controller');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', getAdmin);

module.exports = router;
