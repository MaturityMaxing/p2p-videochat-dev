import React, { useEffect, useState } from 'react'
import './Landing.scss'

interface LandingProps {
  onStartMaturing: () => void
  onSignIn: () => void
}

const Landing: React.FC<LandingProps> = ({ onStartMaturing, onSignIn }) => {
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
        
        <button className="signin-btn" onClick={onSignIn}>
          Sign In
        </button>
      </div>
    </div>
  )
}

export default Landing 