const { Schema, model } = require('mongoose');

const DataSchema = new Schema(
  {
    title: { type: String },
    content: { type: String, required: true },
    category: { type: String },
    images: { type: [String], default: [] },
    video: { type: String },
     likes: { type: Number, default: 0 } ,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model('datas', DataSchema);
