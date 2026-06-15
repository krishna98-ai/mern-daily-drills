import { useEffect, useState } from "react";
import {
  deleteExpense,
  getExpenses,
} from "../services/expenseService";

import ExpenseList from "../components/ExpenseList";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");

  const handleDelete = async (id) => {
    await deleteExpense(id);

    setExpenses((prev) =>
      prev.filter(
        (expense) => expense._id !== id
      )
    );
  };

  const fetchExpenses = async () => {
    try {
      const res = await getExpenses(search);
      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchExpenses();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="container">
      <h1 className="page-title">
        All Expenses
      </h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search expense..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <ExpenseList
        expenses={expenses}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Expenses;