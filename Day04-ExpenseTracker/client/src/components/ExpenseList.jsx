import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({
  expenses,
  handleDelete,
}) => {
  if (expenses.length === 0) {
    return (
      <h2 className="empty-state">
        No Expenses Found
      </h2>
    );
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense._id}
          expense={expense}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ExpenseList;