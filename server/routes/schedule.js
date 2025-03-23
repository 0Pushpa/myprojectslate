import express from "express";

const router = express.Router();
import {
  createSchedule,
  deleteGroup,
  getSchedule,
  updateGroup,
} from "../controllers/schedule.js";

router.route("/").post(createSchedule).get(getSchedule);

// router.route("/:id").get(getGroup).delete(deleteGroup).patch(updateGroup);

export default router;
