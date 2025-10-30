import { useState, useEffect } from 'react'
import './App.css'
import UserCard from './components/UserCard'

function App() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUsers()
  }, [])

  async function getUsers() {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error('Error getting users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleSearchChange(event) {
    setSearch(event.target.value)
  }

  const showUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">
      <header className="app-header">
        <h1>My User List</h1>
        <p className="subtitle">Responsive single-page app</p>
      </header>

      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users by name..."
            value={search}
            onChange={handleSearchChange}
            aria-label="Search Here"
          />
        </div>
        <div className="count">
          {!isLoading && <span>{showUsers.length} result{showUsers.length !== 1 ? 's' : ''}</span>}
        </div>
      </div>

      <main className="user-grid">
        {isLoading ? (
          <div className="loading">Loading users</div>
        ) : showUsers.length === 0 ? (
          <div className="no-results">No users found.</div>
        ) : (
          showUsers.map(user => <UserCard key={user.id} user={user} />)
        )}
      </main>

      <footer className="footer">Data from jsonplaceholder</footer>
    </div>
  )
}

export default App
