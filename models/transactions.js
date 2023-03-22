const { Schema, model } = require("mongoose");

const { handleSaveErrors } = require("../helpers");

const category = ["expense", "income"];

const availableCategories = [
  "products",
  "clothing and footwear",
  "cafes and restaurants",
  "beauty and medicine",
  "health",
  "transport",
  "house",
  "other",
];

const transactionSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    sum: {
      type: String,
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
      required: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

transactionSchema.post("save", handleSaveErrors);

const Transactions = model("statistic", transactionSchema);

module.exports = { Transactions };
