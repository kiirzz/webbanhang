import express from "express";
import { getCategoryFromDB } from "../controllers/category.js";
import { addCategory } from "../controllers/category.js";
import { updateCategory } from "../controllers/category.js";
import { deleteCategory } from "../controllers/category.js";

const router = express.Router()

router.get("/", getCategoryFromDB)

router.post("/add_category", addCategory)
router.post("/update_category", updateCategory)
router.post("/delete_category", deleteCategory)

export default router