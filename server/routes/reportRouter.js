import express from "express";

const router = express.Router();
import { getReports, downloadReport } from "../controllers/report.js";

router.route("/download").get(downloadReport);
router.route("/:id").get(getReports);

export default router;
