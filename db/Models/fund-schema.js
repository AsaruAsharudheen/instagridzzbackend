const mongoose = require('mongoose');

// Expense Schema - linked to Category, NOT Person
const expenseSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});
const Expense = mongoose.model('Expense', expenseSchema);

// Person Schema - linked to Category
const personSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

// Virtual to get persons for a category (if needed)
personSchema.set('toObject', { virtuals: true });
personSchema.set('toJSON', { virtuals: true });

const Person = mongoose.model('Person', personSchema);

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Virtual to get persons of category
categorySchema.virtual('persons', {
  ref: 'Person',
  localField: '_id',
  foreignField: 'category',
});

// Virtual to get expenses of category
categorySchema.virtual('expenses', {
  ref: 'Expense',
  localField: '_id',
  foreignField: 'category',
});

categorySchema.set('toObject', { virtuals: true });
categorySchema.set('toJSON', { virtuals: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = {
  Category,
  Person,
  Expense,
};
