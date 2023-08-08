import { Router } from "express";
import Player from "../model/player.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/players", async (req, res) => {
  try {
    const players = await Player.find({});
    res.json(players);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

export default router;
