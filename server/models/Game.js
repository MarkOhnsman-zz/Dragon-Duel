import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

let Game = new mongoose.Schema(
  {
    dragon: { type: ObjectId, ref: "Dragon", required: true },
    champion: { type: ObjectId, ref: "Champion", required: true },
    dragonHp: { type: Number, required: true },
    championHp: { type: Number, required: true },
    gameOver: { type: Boolean, required: true, default: false },
    history: [{ type: String }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Game;
