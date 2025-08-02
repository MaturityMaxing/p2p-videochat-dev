import React from 'react'
import { DatabaseUser } from './supabase'
import './MembersPage.scss'

interface MembersPageProps {
  user: DatabaseUser
  onBackToLanding: () => void
}

const MembersPage: React.FC<MembersPageProps> = ({ user, onBackToLanding }) => {
  return (
    <div className="members-page">
      <div className="members-content">
        <div className="back-btn" onClick={onBackToLanding}>
          ← Back to Landing
        </div>
        
        <div className="welcome-section">
          <h1>Welcome to Mature Maxing Zone 1</h1>
          <p className="user-email">Logged in as: {user.email}</p>
        </div>
      </div>
    </div>
  )
}

export default MembersPage 