import React, { useState } from 'react'
import { supabase } from './supabase'
import './SignInModal.scss' // Reusing the same styles

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
  onSignUpSuccess: () => void
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSignUpSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Normalize email (trim and lowercase)
    const normalizedEmail = email.trim().toLowerCase()

    // Enhanced email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(normalizedEmail)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      console.log('🔍 [SIGNUP DEBUG] Attempting signup with email:', normalizedEmail)
      
      // Sign up the user with normalized email
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
      })

      console.log('🔍 [SIGNUP DEBUG] Auth result:', { 
        hasUser: !!authData.user,
        userEmail: authData.user?.email,
        error: authError 
      })

      if (authError) {
        console.error('🔍 [SIGNUP DEBUG] Auth error:', authError)
        
        // Better error messages for common Supabase Auth errors
        if (authError.message.includes('email') && authError.message.includes('invalid')) {
          setError('Email format is invalid. Please use a standard email format.')
        } else if (authError.message.includes('User already registered')) {
          setError('An account with this email already exists. Please sign in instead.')
        } else {
          setError(authError.message)
        }
        setLoading(false)
        return
      }

      if (authData.user) {
        console.log('🔍 [SIGNUP DEBUG] Auth successful, checking database...')
        
        // First check if user already exists in database
        const { data: existingUser, error: checkError } = await supabase
          .from('users')
          .select('*')
          .eq('email', normalizedEmail)
          .single()

        if (checkError && checkError.code !== 'PGRST116') {
          // PGRST116 is "not found" error, which is expected for new users
          console.error('Error checking existing user:', checkError)
          setError('Error checking user status')
          setLoading(false)
          return
        }

        if (!existingUser) {
          console.log('🔍 [SIGNUP DEBUG] User not in database, inserting...')
          
          // User doesn't exist in database, try to insert
          const { error: dbError } = await supabase
            .from('users')
            .insert([
              {
                id: authData.user.id,
                email: normalizedEmail,
                user_role: 'member',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
            ])

          if (dbError) {
            console.error('Database insert error:', dbError)
            console.error('Full error details:', JSON.stringify(dbError, null, 2))
            
            // More specific error messages
            if (dbError.code === '42501') {
              setError('Permission denied. Please contact support.')
            } else if (dbError.code === '23505') {
              setError('User already exists in database.')
            } else {
              setError(`Database error: ${dbError.message || 'Unknown error'}`)
            }
            setLoading(false)
            return
          }
          
          console.log('🔍 [SIGNUP DEBUG] Database insert successful!')
        } else {
          console.log('🔍 [SIGNUP DEBUG] User already exists in database')
        }

        // Success - call the callback
        console.log('🔍 [SIGNUP DEBUG] Signup complete, redirecting to members page')
        onSignUpSuccess()
        onClose()
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="signin-modal-overlay" onClick={handleOverlayClick}>
      <div className="signin-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-header">
          <h2>Create Account</h2>
          <p className="create-account-note">
            Join Mature Maxing and unlock exclusive member features.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="signin-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <input
              type="email"
              id="signup-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => setEmail(e.target.value.trim().toLowerCase())}
              required
              disabled={loading}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <input
              type="password"
              id="signup-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <input
              type="password"
              id="signup-confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            className="signin-submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUpModal 