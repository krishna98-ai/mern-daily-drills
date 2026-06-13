import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:3000/api/v1/expenses";

  // FETCH
  const fetchExpenses = async () => {
    const res = await axios.get(API_URL);
    setExpenses(res.data.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // VALIDATION
  const validate = () => {
    if (!title.trim()) return "Title required";
    if (!amount || Number(amount) <= 0) return "Amount must be > 0";
    return null;
  };

  // SUBMIT (CREATE / UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setError("");

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, {
          title: title.trim(),
          amount: Number(amount),
          category,
        });

        setEditingId(null);
      } else {
        await axios.post(API_URL, {
          title: title.trim(),
          amount: Number(amount),
          category,
        });
      }

      setTitle("");
      setAmount("");
      setCategory("Food");
      fetchExpenses();
    } catch (err) {
      setError("Server error");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchExpenses();
  };

  // EDIT
  const handleEdit = (exp) => {
    setEditingId(exp._id);
    setTitle(exp.title);
    setAmount(exp.amount);
    setCategory(exp.category);
  };

  // SEARCH
  const handleSearch = async (value) => {
    setSearchTerm(value);

    if (!value.trim()) {
      fetchExpenses();
      return;
    }

    const res = await axios.get(`${API_URL}?search=${value}`);
    setExpenses(res.data.data);
  };

  // TOTAL
  const total = expenses.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  return (
    <div className="app">
      <h1 className="title">Expense Tracker</h1>

      <p className="total">Total: ₹{total.toFixed(2)}</p>

      <input
        className="search"
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

        <button className="btn">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <div className="list">
        {expenses.map((exp) => (
          <div key={exp._id} className="card">
            <div>
              <h3>{exp.title}</h3>
              <p>
                ₹{exp.amount} • {exp.category}
              </p>
            </div>

            <div className="actions">
              <button
                className="edit"
                onClick={() => handleEdit(exp)}
              >
                Edit
              </button>

              <button
                className="delete"
                onClick={() => handleDelete(exp._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;