import express from "express";
import { getPublisherFromDB } from "../controllers/publishers.js";
import { addPublisher } from "../controllers/publishers.js";
import { updatePublisher } from "../controllers/publishers.js";
import { deletePublisher } from "../controllers/publishers.js";

const router = express.Router()

router.get("/", getPublisherFromDB)

router.post("/add_publisher", addPublisher)
router.post("/update_publisher", updatePublisher)
router.post("/delete_publisher", deletePublisher)

export default router