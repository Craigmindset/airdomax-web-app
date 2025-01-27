"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { Send, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const searchParams = useSearchParams()
  const companyId = searchParams.get('companyId')

  useEffect(() => {
    // Simulating fetching initial messages
    if (companyId) {
      setMessages([
        { id: 1, sender: "Company", content: `Hello, how can I help you? (Company ID: ${companyId})`, timestamp: "10:00 AM" },
        { id: 2, sender: "You", content: "I have a question about your products.", timestamp: "10:05 AM" },
      ])
    } else {
      setMessages([
        { id: 1, sender: "System", content: "Welcome to the chat. How can we assist you today?", timestamp: "10:00 AM" },
      ])
    }
  }, [companyId])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg: Message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Simulating a response after 1 second
    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        sender: companyId ? "Company" : "System",
        content: companyId 
          ? "Thank you for your message. How can we assist you with our products?"
          : "Thank you for your message. How can we help you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prevMessages => [...prevMessages, response])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Chat</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {/* Add close functionality here */}}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-grow p-4 pt-2">
        {messages.map((message) => (
          <div key={message.id} className={`flex mb-4 ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
            <div className={`flex items-start ${message.sender === "You" ? "flex-row-reverse" : ""}`}>
              <Avatar className="w-8 h-8">
                <AvatarFallback>{message.sender[0]}</AvatarFallback>
              </Avatar>
              <div className={`mx-2 ${message.sender === "You" ? "text-right" : "text-left"}`}>
                <p className="text-sm text-gray-500">{message.sender}</p>
                <div className={`mt-1 p-2 rounded-lg ${message.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-100"}`}>
                  {message.content}
                </div>
                <p className="text-xs text-gray-400 mt-1">{message.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center">
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow mr-2"
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

