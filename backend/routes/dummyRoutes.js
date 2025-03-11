import express from "express";
import {
  dummy,
  createDummy,
  deleteDummy,
} from "../controllers/dummyController.js";
const router = express.Router();

router.get("/dummy", dummy);
router.get("/create-dummy", createDummy);
router.get("/delete-dummy", deleteDummy);

export default router;
