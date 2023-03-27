const { Schema, model } = require('mongoose');

const personalSchema = new Schema(
  {
    salary: { type: Number, required: true },
    passiveIncome: { type: Number, required: true },
    savings: { type: Number, required: true },
    cost: { type: Number, required: true },
    footage: { type: Number, required: true },
    procent: { type: Number, required: true },
    years: { type: Number },
    months: { type: Number },
    image: {
      data: Buffer,
      contentType: String,
    },
    owner: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  { versionKey: false, timestamps: true }
);

const Personal = model('personal', personalSchema);

module.exports = { Personal };
