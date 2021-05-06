const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: 'Title is required',
    minlength: [ 2, 'Too short' ],
    maxlength: [ 42, 'Too long' ],
    text: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
    maxlength: 2000,
    text: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  subs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Sub',
    },
  ],
  quantity: Number,
  sold: {
    type: Number,
    default: 0,
  },
  images: Array,
  shipping: {
    type: String,
    enum: [ 'Yes', 'No' ],
  },
  color: String,
  brand: String,
  ratings: [
    {
      star: Number,
      postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
