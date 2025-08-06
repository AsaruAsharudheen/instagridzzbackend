const { Schema, model } = require('mongoose');

const adminSchema = new Schema(
  {
    email: { type: String, unique: true, required: true, trim: true },
    username: { type: String, required: true },
    phonenumber: { type: Number },
    password: { type: String, required: true },
    role: { type: String, default: 'ADMIN', immutable: true },
  },
  { timestamps: true }
);

module.exports = model('admins', adminSchema);
