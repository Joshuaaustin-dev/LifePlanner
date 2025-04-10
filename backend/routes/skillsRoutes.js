import express from "express";
import { deleteDay, updateContent, deleteSkill } from "../controllers/skillsController.js";
const router = express.Router();
//router.route("/").get().post().patch().delete();

router.post("/delete-day", deleteDay);
router.post("/delete-skill", deleteSkill);
router.post("/update-content", updateContent);

export default router;
