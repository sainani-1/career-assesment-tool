import React, { useState, useEffect } from "react";
import { loadQuestions } from "../utils/questions";
import { saveResult } from "../utils/storage";
import ScoreSummary from "../components/ScoreSummary";

export default function Assessment() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setQuestions(loadQuestions());
  }, []);

  const q = questions[index];

  function selectOption(o) {
    const newAns = [...answers];
    newAns[index] = o;
    setAnswers(newAns);

    if (index + 1 < questions.length) setIndex(index + 1);
    else finish([...answers, o]);
  }

  function finish(ans) {
    const scores = {};

    ans.forEach((a) =>
      a.areas.forEach((ar) => (scores[ar] = (scores[ar] || 0) + 1))
    );

    const rec = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0];

    const res = {
      scores,
      recommendation: rec,
      date: new Date().toISOString(),
    };

    saveResult(res);
    setResult(res);
    setDone(true);
  }

  if (done) return <ScoreSummary result={result} />;

  if (!q) return <p>No questions added by admin yet.</p>;

  return (
    <div className="container question-card">
      <h3>Question {index + 1}</h3>
      <p>{q.question}</p>

      <div className="options">
        {q.options.map((o, i) => (
          <button key={i} onClick={() => selectOption(o)}>
            {o.text}
          </button>
        ))}
      </div>
    </div>
  );
}
