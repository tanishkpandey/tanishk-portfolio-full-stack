"use client"

import React, { useState, useEffect, useRef } from "react"
import { sendMessageToDialogflow } from "../services/dialogflowService"
import {
  PaperAirplaneIcon,
  ChatBubbleLeftEllipsisIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid"

interface Message {
  text: string
  sender: "bot" | "user"
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey there! 👋 Ask me anything about my skills.", sender: "bot" },
  ])
  const [userInput, setUserInput] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false) // Chatbot default closed
  const [isTyping, setIsTyping] = useState<boolean>(false) // Typing animation
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Auto-scroll to the bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!userInput.trim()) return

    const newMessages: Message[] = [
      ...messages,
      { text: userInput, sender: "user" as const },
    ]
    setMessages(newMessages)
    setUserInput("")
    setIsTyping(true) // Show typing animation

    const botResponse = await sendMessageToDialogflow(userInput)

    setTimeout(() => {
      setMessages([
        ...newMessages,
        { text: botResponse, sender: "bot" as const },
      ])
      setIsTyping(false) // Remove typing animation
    }, 1200) // Simulate delay for a more natural experience
  }

  // Handle Enter key press to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end">
      {/* Floating Button to Open Chatbot */}
      {!isOpen && (
        <button
          className="bg-[#1f2937] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
          onClick={() => setIsOpen(true)}
          style={{ marginBottom: "-360px" }}
        >
          <ChatBubbleLeftEllipsisIcon className="w-7 h-7" />
        </button>
      )}

      {/* Chatbot UI (Hidden when closed) */}
      <div
        className={`w-80 bg-white shadow-lg border border-gray-300 rounded-lg flex flex-col transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        {/* Chat Header with Close Button */}
        <div className="bg-[#1f2937] text-white text-lg font-semibold p-3 rounded-t-lg flex justify-between items-center">
          Chat with Me
          <button
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-300"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="h-64 overflow-y-auto p-3 space-y-2 flex flex-col">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`text-sm p-2 rounded-lg max-w-[80%] ${
                msg.sender === "bot"
                  ? "bg-muted text-gray-900 self-start"
                  : "bg-[#1f2937] text-white self-end"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* Typing Animation */}
          {isTyping && (
            <div className="text-sm p-2 bg-muted text-gray-900 self-start rounded-lg max-w-[80%] flex items-center">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </div>
          )}

          {/* Auto-scroll to latest message */}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="flex items-center border-t border-gray-300 p-2">
          <input
            type="text"
            className="text-sm flex-1 border-none outline-none px-3 py-2 text-gray-700"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress} // Handle Enter key press
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-[#1f2937] text-white rounded-full hover:bg-gray-800 transition"
          >
            <PaperAirplaneIcon className="w-5 h-5 rotate-90" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
