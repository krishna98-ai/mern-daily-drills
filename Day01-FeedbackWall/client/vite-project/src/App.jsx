import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/feedback/get"
      );
      setFeedbacks(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/api/v1/feedback/create",
        {
          name,
          text,
        }
      );

      setName("");
      setText("");
      fetchFeedbacks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form className="feedback-form" onSubmit={submitHandler}>
        <h2>Feedback Form</h2>

        <label>Name</label>
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />

        <label>Feedback</label>
        <textarea
          value={text}
          placeholder="Write your feedback..."
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <div className="feedback-list">
        <h2>All Feedbacks</h2>

        {feedbacks.map((f) => (
          <div className="feedback-card" key={f._id}>
            <h4>{f.name}</h4>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;