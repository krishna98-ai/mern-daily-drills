import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minlength: [2, "Company name must be at least 2 characters"],
      maxlength: [100, "Company name too long"],
    },

    jobRole: {
      type: String,
      required: [true, "Job role is required"],
      trim: true,
      minlength: [2, "Job role must be at least 2 characters"],
      maxlength: [100, "Job role too long"],
    },

    status: {
      type: String,
      enum: {
        values: ["Applied", "OA", "Interview", "Rejected", "Selected"],
        message: "Invalid status value",
      },
      default: "Applied",
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    jobLink: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true; // optional field
          return /^(https?:\/\/)[^\s$.?#].[^\s]*$/i.test(v);
        },
        message: "Invalid URL format",
      },
    },

    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location too long"],
    },

    salary: {
      type: Number,
      min: [0, "Salary cannot be negative"],
      max: [100000000, "Salary too large"],
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Application = mongoose.model("Application", applicationSchema);