import { Feedback } from "../models/feedback.model.js";

export const createFeedbackController = async (req, res) => {
  try {
    const { name, text } = req.body;

    if (!name || !text) {
      return res.status(400).json({
        success: false,
        message: "name ya text nahi aaya",
      });
    }

    const feedback = await Feedback.create({
      name,
      text,
    });

    return res.status(201).json({
      success: true,
      message: "feedback save ho gaya",
      data: feedback,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getFeedbackController = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};