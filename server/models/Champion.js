import mongoose from "mongoose";

const _attack = new mongoose.Schema({
  name: { type: String, required: true },
  damage: { type: String, required: true }
});

const Champion = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imgUrl: { type: String, required: true },
    race: { type: String, required: true },
    class: { type: String, required: true },
    maxHp: { type: Number, required: true },
    attacks: [_attack]
  },
  { toJSON: { virtuals: true } }
);

export default Champion;
