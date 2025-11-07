import React, { useState, useEffect } from 'react'
import { loadResults, clearResults } from '../utils/storage'
import { loadQuestions, addQuestion, saveQuestions, clearQuestions } from '../utils/questions'

export default function Admin(){
  const [results, setResults] = useState([])
  const [questions, setQuestions] = useState([])
  const [qText, setQText] = useState('')
  const [opts, setOpts] = useState([['','STEM'],['','Arts'],['','Healthcare'],['','Business']])

  useEffect(()=>{
    setResults(loadResults())
    setQuestions(loadQuestions())
  }, [])

  function handleClear(){
    clearResults()
    setResults([])
  }

  function handleAddQuestion(e){
    e.preventDefault()
    const options = opts.map(o=>({ text: o[0] || 'Option', areas: [o[1] || 'General'] }))
    const newQ = { question: qText || 'New question', options }
    const updated = addQuestion(newQ)
    setQuestions(updated)
    setQText('')
    setOpts([['','STEM'],['','Arts'],['','Healthcare'],['','Business']])
  }

  function handleClearQuestions(){
    clearQuestions()
    setQuestions([])
  }

  function updateOpt(i, field, value){
    setOpts(prev=>{
      const copy = prev.map(r=>[...r])
      copy[i][field] = value
      return copy
    })
  }

  return (
    <div>
      <h2>Admin</h2>

      <section>
        <h3>Add question</h3>
        <form onSubmit={handleAddQuestion} className="question-form">
          <div>
            <label>Question text</label>
            <input value={qText} onChange={e=>setQText(e.target.value)} placeholder="Enter question..." />
          </div>
          <div>
            <label>Options (text / area)</label>
            {opts.map((o,i)=> (
              <div key={i} style={{display:'flex',gap:'8px',marginTop:'6px'}}>
                <input value={o[0]} onChange={e=>updateOpt(i,0,e.target.value)} placeholder={`Option ${i+1}`} />
                <input value={o[1]} onChange={e=>updateOpt(i,1,e.target.value)} placeholder="Area e.g. STEM" />
              </div>
            ))}
          </div>
          <div style={{marginTop:8}}>
            <button type="submit">Add question</button>
            <button type="button" className="danger" onClick={handleClearQuestions} style={{marginLeft:8}}>Clear all questions</button>
          </div>
        </form>
      </section>

      <section style={{marginTop:20}}>
        <h3>Stored assessment results (localStorage)</h3>
        <button onClick={handleClear} className="danger">Clear all results</button>
        <div className="results-list">
          {results.length === 0 ? <p>No results yet.</p> : (
            results.map((r,i)=> (
              <div key={i} className="result-item">
                <div><strong>{r.recommendation}</strong> <em>({new Date(r.date).toLocaleString()})</em></div>
                <pre>{JSON.stringify(r.scores, null, 2)}</pre>
              </div>
            ))
          )}
        </div>
      </section>

      <section style={{marginTop:20}}>
        <h3>Available questions</h3>
        <div className="results-list">
          {questions.length === 0 ? <p>No questions.</p> : (
            questions.map((q,i)=> (
              <div key={i} className="result-item">
                <div><strong>{q.question}</strong></div>
                <div>{q.options.map((o,idx)=> <div key={idx}>{o.text} <em>({o.areas.join(',')})</em></div>)}</div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
