import express from "express";
import { deleteDay, updateContent } from "../controllers/skillsController.js";
const router = express.Router();
//router.route("/").get().post().patch().delete();

router.post("/delete-day", deleteDay);
router.post("/update-content", updateContent);

export default router;
