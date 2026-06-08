import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Content cannot be empty"],
        },
    },
    { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);