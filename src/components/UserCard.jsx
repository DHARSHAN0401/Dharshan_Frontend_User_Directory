import React from 'react';
import './UserCard.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <div className="avatar">
          {user.name.charAt(0)}
        </div>
        <h2>{user.name}</h2>
      </div>
      <div className="user-card-content">
        <div className="info-row">
          <span className="info-label">Email</span>
          <a href={`mailto:${user.email}`} className="info-value">{user.email}</a>
        </div>
        <div className="info-row">
          <span className="info-label">Phone</span>
          <span className="info-value">{user.phone}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Website</span>
          <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="info-value">
            {user.website}
          </a>
        </div>
        <div className="info-row">
          <span className="info-label">Company</span>
          <span className="info-value">{user.company.name}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Address</span>
          <address className="info-value">
            {user.address.street}, {user.address.suite}<br />
            {user.address.city}, {user.address.zipcode}
          </address>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
