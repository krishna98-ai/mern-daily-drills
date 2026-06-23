import {Application} from "../models/application.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const createApplication = AsyncHandler(async (req, res) => {
  const {
    companyName,
    jobRole,
    status,
    jobLink,
    location,
    salary,
    notes,
  } = req.body;

  const owner = req.user._id;

  if (!companyName?.trim() || !jobRole?.trim()) {
    throw new ApiError(
      400,
      "Company name and job role are required"
    );
  }

  const application = await Application.create({
    owner,
    companyName: companyName.trim(),
    jobRole: jobRole.trim(),
    status: status || "Applied",
    jobLink: jobLink || "",
    location: location || "",
    salary: salary || undefined,
    notes: notes || "",
  });

  if (!application) {
    throw new ApiError(
      500,
      "Failed to create application"
    );
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      application,
      "Application created successfully"
    )
  );
});

export const getAllApplications = AsyncHandler(async (req, res) => {
  const { search, status } = req.query;

  const query = {
    owner: req.user._id,
  };

  if (search?.trim()) {
    query.$or = [
      {
        companyName: {
          $regex: search.trim(),
          $options: "i",
        },
      },
      {
        jobRole: {
          $regex: search.trim(),
          $options: "i",
        },
      },
    ];
  }

  if (status?.trim()) {
    query.status = status;
  }

  const applications = await Application.find(query)
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      applications,
      applications.length
        ? "Applications fetched successfully"
        : "No applications found"
    )
  );
});

export const deleteApplication = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedApplication =
    await Application.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });

  if (!deletedApplication) {
    throw new ApiError(
      404,
      "Application not found"
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Application deleted successfully"
    )
  );
});

export const updateApplication = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    companyName,
    jobRole,
    status,
    jobLink,
    location,
    salary,
    notes,
  } = req.body;

  if (
    companyName !== undefined &&
    !companyName.trim()
  ) {
    throw new ApiError(
      400,
      "Company name cannot be empty"
    );
  }

  if (
    jobRole !== undefined &&
    !jobRole.trim()
  ) {
    throw new ApiError(
      400,
      "Job role cannot be empty"
    );
  }

  if (
    companyName === undefined &&
    jobRole === undefined &&
    status === undefined &&
    jobLink === undefined &&
    location === undefined &&
    salary === undefined &&
    notes === undefined
  ) {
    throw new ApiError(
      400,
      "At least one field is required to update"
    );
  }

  const updateData = {};

  if (companyName !== undefined) {
    updateData.companyName = companyName.trim();
  }

  if (jobRole !== undefined) {
    updateData.jobRole = jobRole.trim();
  }

  if (status !== undefined) {
    updateData.status = status;
  }

  if (jobLink !== undefined) {
    updateData.jobLink = jobLink;
  }

  if (location !== undefined) {
    updateData.location = location;
  }

  if (salary !== undefined) {
    updateData.salary = salary;
  }

  if (notes !== undefined) {
    updateData.notes = notes;
  }

  const updatedApplication =
    await Application.findOneAndUpdate(
      {
        _id: id,
        owner: req.user._id,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!updatedApplication) {
    throw new ApiError(
      404,
      "Application not found"
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      updatedApplication,
      "Application updated successfully"
    )
  );
});

export const getApplicationById = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const application = await Application.findOne({
    _id: id,
    owner: req.user._id,
  });

  if (!application) {
    throw new ApiError(
      404,
      "Application not found"
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      application,
      "Application fetched successfully"
    )
  );
});

export const getApplicationStats = AsyncHandler(async (req, res) => {
  const stats = await Application.aggregate([
    {
      $match: {
        owner: req.user._id,
      },
    },
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const result = {
    total: 0,
    applied: 0,
    oa: 0,
    interview: 0,
    rejected: 0,
    selected: 0,
  };

  stats.forEach((item) => {
    result.total += item.count;

    if (item._id === "Applied") {
      result.applied = item.count;
    }

    if (item._id === "OA") {
      result.oa = item.count;
    }

    if (item._id === "Interview") {
      result.interview = item.count;
    }

    if (item._id === "Rejected") {
      result.rejected = item.count;
    }

    if (item._id === "Selected") {
      result.selected = item.count;
    }
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      result,
      "Application stats fetched successfully"
    )
  );
});