import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";

import {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getApplicationStats
} from "../controllers/application.controller.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/")
  .post(createApplication)
  .get(getAllApplications);
  
  router
    .route("/stats")
    .get(getApplicationStats);
router
  .route("/:id")
  .get(getApplicationById)
  .put(updateApplication)
  .delete(deleteApplication);
  
export default router;