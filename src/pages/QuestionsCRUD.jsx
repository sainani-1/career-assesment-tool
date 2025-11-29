import React, { useState, useEffect } from "react";
import {
  loadQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} from "../utils/questions";

export default function QuestionsCRUD() {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    setQuestions(loadQuestions());
  }, []);

  // Add Question
  function handleAdd() {
    if (!questionText.trim()) {
      alert("Enter a question");
      return;
    }

    if (editIndex !== null) {
      const updated = updateQuestion(editIndex, {
        question: questionText,
        options: [],
      });
      setQuestions(updated);
      setEditIndex(null);
    } else {
      const updated = addQuestion({
        question: questionText,
        options: [],
      });
      setQuestions(updated);
    }

    setQuestionText("");
  }

  // Edit Question
  function handleEdit(i) {
    setQuestionText(questions[i].question);
    setEditIndex(i);
  }

  // Delete Question
  function handleDelete(i) {
    const updated = deleteQuestion(i);
    setQuestions(updated);
  }

  return (
    <div className="crud-container">
      <h2>Manage Questions (CRUD)</h2>

      <div className="crud-form">
        <input
          type="text"
          placeholder="Enter question..."
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />

        <button onClick={handleAdd}>
          {editIndex !== null ? "Update Question" : "Add Question"}
        </button>
      </div>

      <div className="crud-list">
        {questions.length === 0 && <p>No questions available.</p>}

        {questions.map((q, i) => (
          <div key={i} className="crud-item">
            <strong>{q.question}</strong>

            <div className="crud-actions">
              <button onClick={() => handleEdit(i)}>Edit</button>
              <button onClick={() => handleDelete(i)} className="danger">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
