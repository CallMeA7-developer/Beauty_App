import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sorwdwhmveoqssjqeilm.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvcndkd2htdmVvcXNzanFlaWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1OTE4ODEsImV4cCI6MjA5MDE2Nzg4MX0.s3T-JlXOYEypCy9y11dog6OdocAb0SYhEVx4JlCXElg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
