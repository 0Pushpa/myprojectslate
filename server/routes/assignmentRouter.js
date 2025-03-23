import express from "express";

const router = express.Router();
import {
  postAssignment,
  getAssignments,
  getUserAssignments,
  postUserAssignment,
  getAssignmentDetails,
  downloadFile,
} from "../controllers/assignment.js";
router.route("/download").get(downloadFile);
router.route("/").post(postAssignment);
router.route("/:id").get(getAssignments);
router.route("/details/:id").get(getAssignmentDetails);
router.route("/user").post(postUserAssignment).get(getUserAssignments);

export default router;
