import { Router } from "express";
import { createNote, getNotes, updateNote, deleteNote } from "../controllers/note.controller.js";

const router = Router();

router.route("/").post(createNote).get(getNotes);
router.route("/:id").put(updateNote).delete(deleteNote);

export default router;