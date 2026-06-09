import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      match: [/^[a-zA-Z\s\p{Emoji}]+$/u, "Name can only contain alphabets, spaces, and emojis"]
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique:true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);