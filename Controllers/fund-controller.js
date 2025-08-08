const { Category, Person, Expense } = require('../db/Models/fund-schema'); // adjust path

// --- CATEGORY CONTROLLERS ---

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new category
exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Category name required' });

    const category = new Category({ name });
    await category.save();

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- PERSON CONTROLLERS ---

// Get persons by category
exports.getPersonsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const persons = await Person.find({ category: categoryId });
    res.json(persons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add person to a category
exports.addPerson = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, amount } = req.body;
    if (!name || amount == null) return res.status(400).json({ error: 'Name and amount required' });

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    const person = new Person({ name, amount, category: categoryId });
    await person.save();

    res.status(201).json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- EXPENSE CONTROLLERS ---

// Get expenses by person
exports.getExpensesByPerson = async (req, res) => {
  try {
    const { personId } = req.params;
    const expenses = await Expense.find({ person: personId });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add expense to person
exports.addExpense = async (req, res) => {
  try {
    const { personId } = req.params;
    const { description, amount, date } = req.body;

    if (!description || amount == null) {
      return res.status(400).json({ error: 'Description and amount required' });
    }

    // Check if person exists
    const person = await Person.findById(personId);
    if (!person) return res.status(404).json({ error: 'Person not found' });

    const expense = new Expense({ person: personId, description, amount, date });
    await expense.save();

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategoriesWithDetails = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate('persons')
      .populate('expenses');

    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addExpenseToCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { description, amount, date } = req.body;

    if (!description || amount == null) {
      return res.status(400).json({ error: 'Description and amount required' });
    }

    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    const expense = new Expense({
      description,
      amount,
      date: date ? new Date(date) : new Date(),
      category: categoryId,  // You might want to add this field to expense schema
    });

    await expense.save();

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};