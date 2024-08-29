import express from "express";
import { getCartItemFromDB } from "../controllers/cart.js"
import { updateCartItem } from "../controllers/cart.js";
import { destroyCartItem } from "../controllers/cart.js";

const router = express.Router()

router.get("/", getCartItemFromDB)

router.post("/update_cart", updateCartItem)
router.post("/destroy_cart", destroyCartItem)

export default router