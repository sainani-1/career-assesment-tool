import React, { useState, useEffect } from 'react'
import { loadResults, clearResults } from '../utils/storage'

export default function Admin(){
  const [results, setResults] = useState([])

  useEffect(()=>{
    setResults(loadResults())
  }, [])

  function handleClear(){
    clearResults()
    setResults([])
  }

  return (
    <div>
      <h2>Admin</h2>
      <p>Stored assessment results (localStorage)</p>
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
    </div>
  )
}
