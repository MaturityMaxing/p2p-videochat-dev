import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jxbzmajvakhtxdbabodo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4YnptYWp2YWtodHhkYmFib2RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1OTg0MDQsImV4cCI6MjA2OTE3NDQwNH0.m4Okij9QTB2ypLVDvCrlb4VoL8qNhIkJTZV5ZzBDEDw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserRole = 'admin' | 'member'

export interface DatabaseUser {
  id: string
  email: string
  user_role: UserRole
  created_at: string
  updated_at: string
} 