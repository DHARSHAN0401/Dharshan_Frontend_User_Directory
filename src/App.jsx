import React, { useState, useEffect, useMemo } from 'react'
import './App.css'
import UserCard from './components/Usercard'

export default function App() {
  const [users, setUsers] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await res.json()
        if (mounted) setUsers(data)
      } catch (e) {
        console.error('fetch error', e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => (mounted = false)
  }, [])

  function onChange(e) { setQ(e.target.value) }

  const filtered = useMemo(() => {
    return users
      .filter(u => u.name.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [users, q])

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <h1>My User List</h1>
          <p className="subtitle">Clean, professional user directory</p>
        </div>

        <div className="header-controls">
          <div className="search-box">
            <input
              type="search"
              placeholder="Search Here"
              value={q}
              onChange={onChange}
              className="search-input"
            />
          </div>
        </div>
      </header>

      <div className="user-grid">
        {loading && <div className="loading">Loading users…</div>}
        {!loading && filtered.length === 0 && <div className="no-results">No users found</div>}
        {!loading && filtered.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <footer className="footer">Data from jsonplaceholder</footer>
    </div>
  )
}
