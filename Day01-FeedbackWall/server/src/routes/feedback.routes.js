import { Router } from "express";
import {
  createFeedbackController,
  getFeedbackController,
} from "../controllers/feedback.controller.js";

const router = Router();

router.post("/create", createFeedbackController);
router.get("/get", getFeedbackController);

export default router;