const mongoose = require('mongoose');

const { Schema } = mongoose;

const subSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
    minlength: [ 2, 'Too short' ],
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
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Sub', subSchema);
