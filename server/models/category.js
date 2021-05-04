const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
    minlength: [ 3, 'Too short' ],
    maxlength: [ 42, 'Too long' ],
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    lowercase: true,
    index: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
