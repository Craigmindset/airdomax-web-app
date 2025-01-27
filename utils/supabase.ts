import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log("Supabase initialization:")
console.log("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl)
console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY set?", !!supabaseAnonKey)

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

try {
  new URL(supabaseUrl)
} catch (error) {
  console.error("Invalid Supabase URL:", supabaseUrl)
  throw error
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log("Supabase client created successfully")

