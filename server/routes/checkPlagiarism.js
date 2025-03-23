import express from "express";

const router = express.Router();
import {
  checkplagiarism
} from "../controllers/checkPlagiarism.js";

router.route("/").post(checkplagiarism).get(checkplagiarism);

export default router;
