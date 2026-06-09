import { Router } from "express";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller.js";

const router = Router();

router.route("/").get(getContacts).post(createContact);
router.route("/:id").put(updateContact).delete(deleteContact);

export default router;