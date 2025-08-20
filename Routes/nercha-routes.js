const express = require('express');
const {
  createNercha,
  getAllNercha,
  getNerchaByToken,
  deleteNercha,
  updateNercha,
  getNextToken, // <-- import it
} = require('../Controllers/nercha-controllers');

const router = express.Router();

// Create new entry
router.post('/', createNercha);

// Get all entries
router.get('/', getAllNercha);

// Get next token (must be before :token route!)
router.get('/next-token', getNextToken);

// Get entry by token
router.get('/:token', getNerchaByToken);

// Delete entry by ID
router.delete('/:id', deleteNercha);

// Update entry by ID
router.put('/:id', updateNercha);

module.exports = router;
