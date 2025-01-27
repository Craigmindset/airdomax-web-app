import { NextResponse } from "next/server"

export async function GET() {
  const envVariables = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? "Set (not shown for security)"
      : "Not set",
    NODE_ENV: process.env.NODE_ENV || "Not set",
    VERCEL_ENV: process.env.VERCEL_ENV || "Not set",
    VERCEL_URL: process.env.VERCEL_URL || "Not set",
  }

  console.log("Environment Variables:", envVariables)

  return NextResponse.json({
    message: "Environment check",
    environment: envVariables,
    timestamp: new Date().toISOString(),
  })
}

