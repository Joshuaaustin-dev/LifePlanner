import express from "express";
import {
  retrieveSkills,
  updateSkill,
} from "../controllers/calendarController.js";
const router = express.Router();
//router.route("/").get().post().patch().delete();

router.post("/get-skills", retrieveSkills);
router.post("/update-skill", updateSkill);

export default router;
