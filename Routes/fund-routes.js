const express = require('express');
const router = express.Router();

const {
  getCategories,
  addCategory,
  getPersonsByCategory,
  addPerson,
  getExpensesByPerson,
  addExpense,
  getCategoriesWithDetails,
  addExpenseToCategory,
} = require('../Controllers/fund-controller'); // adjust path

// --- CATEGORY ROUTES ---

// Get all categories
router.get('/categories', getCategories);

// Add new category
router.post('/categories', addCategory);

// --- PERSON ROUTES ---

// Get persons in a category
router.get('/categories/:categoryId/persons', getPersonsByCategory);

// Add person to a category
router.post('/categories/:categoryId/persons', addPerson);

// --- EXPENSE ROUTES ---

// Get expenses for a person
router.get('/persons/:personId/expenses', getExpensesByPerson);

// Add expense for a person
router.post('/persons/:personId/expenses', addExpense);

module.exports = router;
// Add this route before module.exports
router.get('/categories/details', getCategoriesWithDetails);
// In routes/fund-routes.js or similar
router.post('/categories/:categoryId/expenses', addExpenseToCategory);
