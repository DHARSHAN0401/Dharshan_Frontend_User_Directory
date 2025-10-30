import React, { useState } from 'react'
import './UserCard.css'

function UserCard({ user }) {
  const [showDetails, setShowDetails] = useState(false)

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const colors = ['4F46E5', '7C3AED', 'E11D48', '2563EB', '059669']
  const bgColor = colors[user.id % colors.length]
  const avatarUrl = `https://ui-avatars.com/api/?name=${user.name}&background=${bgColor}&color=fff&size=64`

  return (
    <div className="user-card" onMouseMove={handleMouseMove}>
      <div className="card-header">
        <img src={avatarUrl} alt={user.name} className="avatar" />
        <div className="user-info">
          <h3 className="name">{user.name}</h3>
          <a href={`mailto:${user.email}`} className="email">
            {user.email}
          </a>
        </div>
      </div>

      <div className="basic-info">
        <p className="company">{user.company.name}</p>
        <p className="phone">{user.phone}</p>
        <p className="website">
          <a href={`http://${user.website}`} target="_blank" rel="noopener">
            {user.website}
          </a>
        </p>
      </div>

      <button 
        className="details-button"
        onClick={() => setShowDetails(!showDetails)}
        aria-expanded={showDetails}
      >
        {showDetails ? (
          <>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
            Hide Details
          </>
        ) : (
          <>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            View Details
          </>
        )}
      </button>

      {showDetails && (
        <div className="extra-details">
          <div className="address">
            <h4>Address</h4>
            <p>{user.address.street}, {user.address.suite}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
          </div>
          
          <div className="company-details">
            <h4>Company</h4>
            <p>{user.company.catchPhrase}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserCard