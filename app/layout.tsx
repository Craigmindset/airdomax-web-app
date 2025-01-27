"use client"

import { ThemeProvider } from "@/contexts/ThemeContext"
import { ErrorBoundary } from "react-error-boundary"
import { useEffect } from "react"

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-900">
      <div>
        <h2 className="text-lg font-semibold">Oops! Something went wrong:</h2>
        <pre className="mt-2 text-sm">{error.message}</pre>
      </div>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    console.log("RootLayout mounted")
  }, [])

  return (
    <html lang="en">
      <body>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ThemeProvider>{children}</ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}



import './globals.css'