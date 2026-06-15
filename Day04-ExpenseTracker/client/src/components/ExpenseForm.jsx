import { useState, useEffect } from "react";
import {
  createExpense,
  updateExpense,
  getExpenseById,
} from "../services/expenseService";

import { useNavigate, useParams } from "react-router-dom";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const { id } = useParams();
  const isEditMode = Boolean(id);

  const navigate = useNavigate();

  const fetchExpense = async () => {
    try {
      const res = await getExpenseById(id);

      setTitle(res.data.title);
      setAmount(res.data.amount);
      setCategory(res.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      fetchExpense();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount || !category) {
      return alert("All fields are required");
    }

    try {
      const payload = {
        title,
        amount: Number(amount),
        category,
      };

      if (isEditMode) {
        await updateExpense(id, payload);
      } else {
        await createExpense(payload);
      }

      navigate("/expenses");
    } catch (error) {
      console.log(error);
      alert(
        isEditMode
          ? "Failed to update expense"
          : "Failed to create expense"
      );
    }
  };

  return (
    <div className="container">
      <h1>
        {isEditMode
          ? "Edit Expense"
          : "Add Expense"}
      </h1>

      <form
        className="expense-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Title</label>

          <input
            type="text"
            placeholder="Enter expense title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Amount</label>

          <input
            type="number"
            min="1"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
             <option value="Other">
              Other
            </option>

            <option value="Food">
              Food
            </option>
            <option value="Travel">
              Travel
            </option>
            <option value="Shopping">
              Shopping
            </option>
           
          </select>
        </div>

        <button type="submit">
          {isEditMode
            ? "Update Expense"
            : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;