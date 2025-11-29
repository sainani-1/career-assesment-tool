import React, { useState, useEffect } from "react";
import {
  loadResults,
  clearResults
} from "../utils/storage";

import {
  loadQuestions,
  addQuestion,
  clearQuestions,
  updateQuestion,
  deleteQuestion
} from "../utils/questions";

import {
  loadAllUsers,
  deleteUser,
  isAdmin
} from "../utils/auth";

export default function Admin() {
  if (!isAdmin()) return <h3>Access Denied — Admin Only</h3>;

  // STATES
  const [results, setResults] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);

  const [qText, setQText] = useState("");
  const [opts, setOpts] = useState([
    ["", "STEM"],
    ["", "Arts"],
    ["", "Healthcare"],
    ["", "Business"]
  ]);

  const [editIndex, setEditIndex] = useState(null);

  // LOAD ALL DATA ON PAGE OPEN
  useEffect(() => {
    setResults(loadResults());
    setQuestions(loadQuestions());
    setUsers(loadAllUsers());
  }, []);

  // ADD OR UPDATE QUESTION
  function handleAddOrUpdate(e) {
    e.preventDefault();

    const options = opts.map(o => ({
      text: o[0] || "Option",
      areas: [o[1] || "General"]
    }));

    const newQ = { question: qText || "New Question", options };

    let updated;

    if (editIndex !== null) {
      updated = updateQuestion(editIndex, newQ);
      setEditIndex(null);
    } else {
      updated = addQuestion(newQ);
    }

    setQuestions(updated);
    resetForm();
  }

  // DELETE QUESTION
  function handleDeleteQuestion(i) {
    const updated = deleteQuestion(i);
    setQuestions(updated);
  }

  // EDIT QUESTION
  function handleEdit(i) {
    const q = questions[i];
    setQText(q.question);
    setOpts(q.options.map(o => [o.text, o.areas[0]]));
    setEditIndex(i);
  }

  // DELETE USER
  function handleUserDelete(i) {
    deleteUser(i);
    setUsers(loadAllUsers());
  }

  // FORM RESET
  function resetForm() {
    setQText("");
    setOpts([
      ["", "STEM"],
      ["", "Arts"],
      ["", "Healthcare"],
      ["", "Business"]
    ]);
  }

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      {/* ---------- ADD / EDIT QUESTIONS ---------- */}
      <section>
        <h3>{editIndex !== null ? "Edit Question" : "Add Question"}</h3>

        <form onSubmit={handleAddOrUpdate}>
          <label>Question</label>
          <input
            value={qText}
            onChange={e => setQText(e.target.value)}
            placeholder="Enter question..."
          />

          <label>Options</label>

          {opts.map((o, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
              <input
                value={o[0]}
                onChange={(e) => {
                  const updated = [...opts];
                  updated[i][0] = e.target.value;
                  setOpts(updated);
                }}
                placeholder={`Option ${i + 1}`}
              />

              <input
                value={o[1]}
                onChange={(e) => {
                  const updated = [...opts];
                  updated[i][1] = e.target.value;
                  setOpts(updated);
                }}
                placeholder="Area (STEM, Arts...)"
              />
            </div>
          ))}

          <button type="submit">
            {editIndex !== null ? "Update Question" : "Add Question"}
          </button>

          <button
            type="button"
            className="danger"
            style={{ marginLeft: 10 }}
            onClick={() => {
              clearQuestions();
              setQuestions([]);
            }}
          >
            Clear All Questions
          </button>
        </form>
      </section>

      {/* ---------- QUESTION LIST ---------- */}
      <section>
        <h3>All Questions</h3>

        {questions.length === 0 ? (
          <p>No questions added.</p>
        ) : (
          questions.map((q, i) => (
            <div key={i} className="crud-item">
              <div>
                <strong>{q.question}</strong>
                <br />
                {q.options.map((o, idx) => (
                  <small key={idx}>
                    - {o.text} ({o.areas})
                    <br />
                  </small>
                ))}
              </div>

              <div>
                <button onClick={() => handleEdit(i)}>Edit</button>
                <button
                  className="danger"
                  onClick={() => handleDeleteQuestion(i)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* ---------- USER LIST ---------- */}
      <section>
        <h3>Registered Users</h3>

        {users.length === 0 ? (
          <p>No users registered.</p>
        ) : (
          users.map((u, i) => (
            <div key={i} className="crud-item">
              <div>
                <strong>{u.email}</strong> — {u.role}
              </div>

              <button
                className="danger"
                onClick={() => handleUserDelete(i)}
              >
                Delete User
              </button>
            </div>
          ))
        )}
      </section>

      {/* ---------- RESULTS ---------- */}
      <section>
        <h3>Assessment Results</h3>

        <button
          className="danger"
          onClick={() => {
            clearResults();
            setResults([]);
          }}
        >
          Clear All Results
        </button>

        {results.length === 0 ? (
          <p>No results yet.</p>
        ) : (
          results.map((r, i) => (
            <div key={i} className="card">
              <strong>{r.recommendation}</strong>
              — {new Date(r.date).toLocaleString()}
              <pre>{JSON.stringify(r.scores, null, 2)}</pre>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
