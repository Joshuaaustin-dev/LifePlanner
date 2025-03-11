import express from "express";
import { retrieveSkills } from "../controllers/calendarController.js";
const router = express.Router();
//router.route("/").get().post().patch().delete();

router.post("/get-skills", retrieveSkills);

export default router;
