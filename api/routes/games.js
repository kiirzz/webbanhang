import express from "express";
import { getGameFromDB } from "../controllers/games.js";
import { addGame } from "../controllers/games.js";
import { updateGame } from "../controllers/games.js";
import { deleteGame } from "../controllers/games.js";

const router = express.Router()

router.get("/", getGameFromDB)

router.post("/add_game", addGame)
router.post("/update_game", updateGame)
router.post("/delete_game", deleteGame)

export default router