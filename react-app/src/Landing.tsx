import React, { useEffect, useState } from 'react'
import './Landing.scss'

import { DatabaseUser } from './supabase'

interface LandingProps {
  onStartMaturing: () => void
  onSignIn: () => void
  onSignOut: () => void
  user: DatabaseUser | null
}

const Landing: React.FC<LandingProps> = ({ onStartMaturing, onSignIn, onSignOut, user }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  
  const rotatingTexts = [
    'Earn more',
    'be more confident', 
    'be more charismatic',
    'grow up',
    'level up',
    'become unstoppable',
    'maximize potential'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 2000) // Change every 2 seconds
    
    return () => clearInterval(interval)
  }, [rotatingTexts.length])

  return (
    <div className="landing">
      <div className="landing-content">
        <div className="hero-section">
          <button className="main-cta" onClick={onStartMaturing}>
            START MATURE MAXING
          </button>
          
          <div className="subtitle">
            <span className="static-text">To </span>
            <span className="rotating-text" key={currentTextIndex}>
              {rotatingTexts[currentTextIndex]}
            </span>
          </div>
        </div>
        
        {user ? (
          <button className="signin-btn" onClick={onSignOut}>
            Sign Out ({user.email})
          </button>
        ) : (
          <button className="signin-btn" onClick={onSignIn}>
            Sign In
          </button>
        )}
      </div>
    </div>
  )
}

export default Landing 