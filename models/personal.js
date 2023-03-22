const { Schema, model } = require("mongoose");
// const { handleSaveErrors } = require("../helpers"); ???

const personalSchema = new Schema(
  {
    salary: { type: Number, required: true },
    passiveIncome: { type: Number, required: true },
    savings: { type: Number, required: true },
    cost: { type: Number, required: true },
    footage: { type: Number, required: true },
    procent: { type: Number, required: true },
    year: { type: Number },
    month: { type: Number },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false, timestamps: true }
);

const Personal = model("personal", personalSchema);

module.exports = { Personal };
