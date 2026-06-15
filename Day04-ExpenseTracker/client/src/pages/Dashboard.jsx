import { useEffect, useState } from "react";
import { getExpenses } from "../services/expenseService";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  const totalExpenses = expenses.length;

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="container">
      <h1 className="page-title">
        Dashboard
      </h1>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Expenses</h3>
          <p>{totalExpenses}</p>
        </div>

        <div className="card">
          <h3>Total Amount Spent</h3>
          <p>₹ {totalAmount}</p>
        </div>
      </div>

      <div className="recent-expenses">
        <h2>Recent Expenses</h2>

        {recentExpenses.length === 0 ? (
          <p className="empty-state">
            No expenses found
          </p>
        ) : (
          recentExpenses.map(
            (expense) => (
              <div
                key={expense._id}
                className="expense-row"
              >
                <span>
                  {expense.title}
                </span>

                <span>
                  {expense.category}
                </span>

                <span>
                  ₹ {expense.amount}
                </span>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;