const { Schema, model } = require('mongoose');

const { handleSaveErrors } = require('../helpers');

const category = ['expense', 'income'];

const availableCategories = [
  'products',
  'clothing and footwear',
  'cafes and restaurants',
  'beauty and medicine',
  'health',
  'transport',
  'house',
  'other',
  'продукти',
  'одяг та взуття',
  'кафе та ресторани',
  'краса та медицина',
  'здоров`я',
  'транспорт',
  'будинок',
  'інші',
];

const transactionSchema = new Schema(
  {
    date: {
      type: String,
      required: false,
    },
    comment: {
      type: String,
      required: false,
    },
    sum: {
      type: Number,
      required: true,
    },
    categoryType: {
      type: String,
      enum: category,
      required: true,
    },
    category: {
      type: String,
      enum: availableCategories,
      default: 'other',
      required: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

transactionSchema.post('save', handleSaveErrors);

const Transaction = model('transaction', transactionSchema);

module.exports = { Transaction };
