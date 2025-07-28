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
    // Confidence & Social Power
    'Never need external validation again',
    'Feel confident in any setting',
    'Attract emotionally healthy people naturally',
    'Command respect through consistent actions',
    'Stay calm under any pressure',
    'Never feel intimidated by anyone',
    'Lead conversations with natural charisma',
    'Handle rejection like a champion',
    'Walk into rooms with presence',
    'Make decisions without seeking approval',
    
    // Dating & Relationships
    'Read people\'s true motivations instantly',
    'Attract quality women effortlessly',
    'Set boundaries without feeling guilty',
    'End toxic relationships without drama',
    'Communicate needs clearly and directly',
    'Never get friend-zoned again',
    'Build genuine connections with anyone',
    'Handle breakups with complete dignity',
    'Choose partners based on compatibility',
    'Never chase someone who\'s uninterested',
    
    // Career & Money Success
    'Negotiate salaries and contracts confidently',
    'Build reputation through consistent excellence',
    'Focus on results not activities',
    'Handle workplace politics with wisdom',
    'Network authentically without using people',
    'Take ownership without making excuses',
    'Invest for long-term compound growth',
    'Never buy things for status',
    'Earn money through value creation',
    'Make financial decisions without emotion',
    
    // Mental Strength & Resilience
    'Never react from pure emotion',
    'Turn failures into learning opportunities',
    'Stay motivated without external pressure',
    'Handle criticism without getting defensive',
    'Sleep peacefully despite daily stress',
    'Never take things personally anymore',
    'Trust your instincts completely',
    'Embrace uncertainty without anxiety',
    'Learn from others\' mistakes quickly',
    'Adapt to change like water',
    
    // Physical & Energy Management
    'Exercise because you love yourself',
    'Maintain peak physical condition naturally',
    'Manage stress through healthy outlets',
    'Wake up energized every morning',
    'Focus completely on current task',
    'Eliminate distractions during deep work',
    'Use time like a strategic weapon',
    'Finish what you start consistently',
    'Plan for obstacles before starting',
    'Rest without guilt when needed'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 3000) // Increased to 3 seconds since the texts are longer
    
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
            Logout
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