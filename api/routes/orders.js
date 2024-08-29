import express from "express";
import { getOrderFromDB } from "../controllers/orders.js";
import { createOrder } from "../controllers/orders.js";
import { getOrderGameFromDB } from "../controllers/orders.js";

const router = express.Router()

router.get("/", getOrderFromDB)
router.get("/order_game", getOrderGameFromDB)

router.post("/create_order", createOrder)

export default router