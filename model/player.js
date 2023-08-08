import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: String,
  nationality: String,
  position: String,
  club: String,
  rating: Number,
  clubImg: String,
  playerImg: String,
  nationalityFlag: String,
});

const Player = mongoose.model("Player", playerSchema);

export default Player;
