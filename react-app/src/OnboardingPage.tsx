import React from 'react'
import './OnboardingPage.scss'

interface OnboardingPageProps {
  currentStep: number
  onContinue: () => void
  onBack: () => void
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ currentStep, onContinue, onBack }) => {
  const totalPages = 5

  return (
    <div className="onboarding-page">
      <div className="onboarding-content">
        <h1 className="onboarding-title">
          Onboarding Page #{currentStep}
        </h1>
        
        <div className="onboarding-actions">
          {currentStep > 1 && (
            <button className="back-btn" onClick={onBack}>
              Back
            </button>
          )}
          
          <button className="continue-btn" onClick={onContinue}>
            {currentStep === totalPages ? 'Enter Map' : 'Continue'}
          </button>
        </div>
        
        <div className="progress-indicator">
          {currentStep} / {totalPages}
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage 