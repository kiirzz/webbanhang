import express from "express";
import { getUserFromDB } from "../controllers/users.js";
import { updateUser, deleteUser, updateUserInformation, changePasswordUser } from "../controllers/users.js";

const router = express.Router()

router.get("/", getUserFromDB)

router.post("/update_user", updateUser)
router.post("/delete_user", deleteUser)
router.post("/update_info", updateUserInformation)
router.post("/change_pass", changePasswordUser)

export default router