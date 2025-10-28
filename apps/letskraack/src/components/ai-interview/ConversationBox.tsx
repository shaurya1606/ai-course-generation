import React, { useEffect, useRef } from 'react'

interface ConversationBoxProps {
  conversation?: Array<{
    role: string;
    content: string;
  }>;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ conversation = [] }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

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
                className={`max-w-[80%] rounded-lg p-3 text-left ${
                  message.role === 'user'
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
    </div>
  )
}

export default ConversationBox;
