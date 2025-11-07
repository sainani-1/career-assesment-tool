import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Assessment from './pages/Assessment'
import Admin from './pages/Admin'

export default function App(){
  return (
    <div className="app">
      <header className="topbar">
        <h1>Career Assessment Tool</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/assessment">Take Assessment</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/assessment" element={<Assessment/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </main>

      <footer className="footer">Built for FEDF-PS30 — simple local demo</footer>
    </div>
  )
}
