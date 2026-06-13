import Expense from '../models/expense.model.js';
import AsyncHandler from '../utils/AsyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
// Create a new expense
export const createExpense = AsyncHandler(async (req, res) => {
  let { title, amount, category } = req.body;

  title = title?.trim();

  if (!title || amount === undefined || !category) {
    throw new ApiError(
      400,
      "Title, amount, and category are required"
    );
  }

  if (amount <= 0) {
    throw new ApiError(
      400,
      "Amount must be greater than 0"
    );
  }

  const expense = await Expense.create({
    title,
    amount,
    category,
  });

  return res.status(201).json({
    success: true,
    data: expense,
    message: "Expense created successfully",
  });
});
// Get all expenses
export const getAllExpenses = AsyncHandler(async (req, res) => {
  const { search, category } = req.query;

  let query = {};

  if (search?.trim()) {
    query.title = {
      $regex: search.trim(),
      $options: "i",
    };
  }

  if (category) {
    query.category = category;
  }

  const expenses = await Expense.find(query)
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    data: expenses,
    message: expenses.length
      ? "Expenses fetched successfully"
      : "No expenses found",
  });
});

// Delete an expense
export const deleteExpense = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedExpense = await Expense.findByIdAndDelete(id);

  if (!deletedExpense) {
    throw new ApiError(404, "Expense not found");
  }

  return res.status(200).json({
    success: true,
    data: deletedExpense,
    message: "Expense deleted successfully",
  });
});

// Update an expense
export const updateExpense = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  let { title, amount, category } = req.body;

  title = title?.trim();

  const updateFields = {};

  if (title) {
    updateFields.title = title;
  }

  if (amount !== undefined) {
    if (amount <= 0) {
      throw new ApiError(
        400,
        "Amount must be greater than 0"
      );
    }

    updateFields.amount = amount;
  }

  if (category) {
    updateFields.category = category;
  }

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(
      400,
      "At least one field is required for update"
    );
  }

  const updatedExpense = await Expense.findByIdAndUpdate(
    id,
    updateFields,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedExpense) {
    throw new ApiError(404, "Expense not found");
  }

  return res.status(200).json({
    success: true,
    data: updatedExpense,
    message: "Expense updated successfully",
  });
});