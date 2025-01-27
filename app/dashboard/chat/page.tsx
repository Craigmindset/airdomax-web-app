import { Suspense } from 'react'
import ChatInterface from "@/components/dashboard/chat/chat-interface"

export default function ChatPage() {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ChatInterface />
      </Suspense>
    </div>
  )
}

