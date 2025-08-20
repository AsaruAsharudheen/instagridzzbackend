const { Schema, model } = require('mongoose');

// Counter Schema for auto-increment
const CounterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

const Counter = model('Counter', CounterSchema);

// Nercha Schema
const NerchaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    token: {
      type: Number,
      unique: true,
    },
  },
  { timestamps: true }
);

// Pre-save hook for auto-increment token
NerchaSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: 'nercha_token' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.token = counter.seq;
  }
  next();
});

const Nercha = model('Nercha', NerchaSchema);

// ✅ Export both
module.exports = { Nercha, Counter };
