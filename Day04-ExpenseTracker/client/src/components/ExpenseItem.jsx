import { Link } from "react-router-dom";

const ExpenseItem = ({ expense, handleDelete }) => {
  return (
    <div className="expense-card">
      <h3 className="expense-title">{expense.title}</h3>

      <p className="expense-amount">
        ₹ {expense.amount}
      </p>

      <p className="expense-category">
        {expense.category}
      </p>

      <div className="expense-actions">
        <button
          className="delete-btn"
          onClick={() =>
            handleDelete(expense._id)
          }
        >
          Delete
        </button>

        <Link
          className="edit-btn"
          to={`/edit-expense/${expense._id}`}
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ExpenseItem;