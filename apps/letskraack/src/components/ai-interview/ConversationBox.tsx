import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { SendHorizonal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useConversation } from '@/context/ConversationContext'

interface ConversationBoxProps {
  onSendMessage?: (message: string) => void
  onMessageChange?: (message: string) => void
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ onSendMessage, onMessageChange }) => {

  const { conversation } = useConversation()

  const [message, setMessage] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);
    // Update live transcript as user types
  if (onMessageChange) {
      onMessageChange(value);
    }
  };

  const onSend = () => {
    if (!message.trim()) return;
    
  console.log('Sending message:', message)
    
    // Call parent handler to send message to AI
    if (onSendMessage) {
      onSendMessage(message)
    }
    
    // Clear input field
    setMessage('')
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  };

  return (
    <div className='border border-neutral-700/50 rounded-xl p-5 bg-secondary flex flex-col h-[60vh] relative'>
      <h2 className='text-lg font-semibold mb-4'>Conversation</h2>

      <div className='flex-1 overflow-y-auto space-y-3 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-neutral-900/50 [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-blue-400 [&::-webkit-scrollbar-thumb]:via-blue-500 [&::-webkit-scrollbar-thumb]:to-blue-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:from-blue-300'>
        {conversation.length === 0 ? (
          <div className='flex items-center justify-center h-full text-neutral-400'>
            <p className='text-sm'>Waiting for conversation to start...</p>
          </div>
        ) : (
          conversation.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} `}
            >
              <p className='text-xs font-semibold mb-1 opacity-70 px-1'>
                {message.role === 'user' ? 'You' : 'AI Interviewer'}
              </p>
              <div
                className={`max-w-[80%] rounded-lg p-3 text-left ${message.role === 'user'
                    ? 'bg-blue-400 text-white'
                    : 'bg-neutral-700 text-neutral-100'
                  }`}
              >
                <p className='text-sm whitespace-pre-wrap text-left'>{message.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />

      </div>
      <div className='mt-4 flex items-center justify-between gap-2'>
        <Input 
          type='text' 
          placeholder='Type your message...' 
          value={message} 
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={onSend} disabled={!message.trim()}>
          <SendHorizonal />
        </Button>
      </div>
    </div>
  )
}

export default ConversationBox;
