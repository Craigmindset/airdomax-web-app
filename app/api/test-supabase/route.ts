import { NextResponse } from "next/server"
import { supabase } from "@/utils/supabase"

export async function GET() {
  console.log("API Route: NEXT_PUBLIC_SUPABASE_URL =", process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log("API Route: NEXT_PUBLIC_SUPABASE_ANON_KEY set?", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  try {
    // Attempt to fetch a row from a public table
    const { data, error } = await supabase.from("your_table_name").select("*").limit(1)

    if (error) {
      console.error("Supabase query error:", error)
      throw error
    }

    return NextResponse.json({ success: true, message: "Connected to Supabase successfully", data })
  } catch (error) {
    console.error("Supabase connection error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to Supabase",
        error: error.message || "Unknown error occurred",
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      },
      { status: 500 },
    )
  }
}

