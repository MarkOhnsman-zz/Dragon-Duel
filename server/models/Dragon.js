import mongoose from "mongoose";

const Dragon = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imgUrl: { type: String, required: true },
    maxHp: { type: Number, required: true }
  },
  { toJSON: { virtuals: true } }
);

export default Dragon;
