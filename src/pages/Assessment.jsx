import React, { useState } from 'react'
import questions from '../data/questions.json'
import { saveResult } from '../utils/storage'

function ScoreSummary({ result }){
  return (
    <div className="result">
      <h3>Assessment Result</h3>
      <p><strong>Recommended career area:</strong> {result.recommendation}</p>
      <p><strong>Scores:</strong></p>
      <ul>
        {Object.entries(result.scores).map(([k,v])=> <li key={k}>{k}: {v}</li>)}
      </ul>
    </div>
  )
}

export default function Assessment(){
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [done, setDone] = useState(false)
  const [result, setResult] = useState(null)

  const q = questions[index]

  function selectOption(option){
    setAnswers(a=>{ const next=[...a]; next[index]=option; return next })
    if(index + 1 < questions.length) setIndex(i=>i+1)
    else finish([...answers, option])
  }

  function finish(allAnswers){
    // simple scoring: each option has a 'area' tag; count frequencies
    const scores = {}
    allAnswers.forEach(ans=>{
      if(!ans) return
      ans.areas.forEach(ar=> scores[ar] = (scores[ar] || 0) + 1)
    })
    const recommendation = Object.keys(scores).sort((a,b)=>scores[b]-scores[a])[0] || 'General'
    const res = { scores, recommendation, date: new Date().toISOString() }
    saveResult(res)
    setResult(res)
    setDone(true)
  }

  if(done) return <ScoreSummary result={result} />

  return (
    <div>
      <h2>Assessment</h2>
      <p>Question {index+1} of {questions.length}</p>
      <div className="question-card">
        <h3>{q.question}</h3>
        <div className="options">
          {q.options.map((opt, i)=>(
            <button key={i} className="option" onClick={()=>selectOption(opt)}>{opt.text}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
