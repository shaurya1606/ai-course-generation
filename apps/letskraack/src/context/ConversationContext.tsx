import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import type { ConversationMessage } from '@/types/types'

export type ConversationContextState = {
  conversation: ConversationMessage[]
  liveTranscript: string
  isAiSpeaking: boolean
  addUserMessage: (content: string) => void
  addAssistantMessage: (content: string) => void
  setLiveTranscript: (transcript: string) => void
  clearLiveTranscript: () => void
  resetConversation: () => void
  setAiSpeaking: (isSpeaking: boolean) => void
}

const ConversationContext = createContext<ConversationContextState | undefined>(undefined)

const initialSystemMessages: ConversationMessage[] = [
  {
    role: 'assistant',
    content:
      'Hello! I am here to help you with your interview practice. Feel free to start speaking or typing whenever you are ready.',
  },
]

export const ConversationProvider = ({ children }: PropsWithChildren) => {
  const [conversation, setConversation] = useState<ConversationMessage[]>(initialSystemMessages)
  const [liveTranscript, updateLiveTranscript] = useState('')
  const [isAiSpeaking, setIsAiSpeaking] = useState(false)

  const addUserMessage = useCallback((content: string) => {
    setConversation((prev) => [...prev, { role: 'user', content }])
  }, [])

  const addAssistantMessage = useCallback((content: string) => {
    setConversation((prev) => [...prev, { role: 'assistant', content }])
  }, [])

  const setLiveTranscript = useCallback((transcript: string) => {
    updateLiveTranscript(transcript)
  }, [])

  const clearLiveTranscript = useCallback(() => {
    updateLiveTranscript('')
  }, [])

  const resetConversation = useCallback(() => {
    setConversation(initialSystemMessages)
    updateLiveTranscript('')
    setIsAiSpeaking(false)
  }, [])

  const setAiSpeaking = useCallback((isSpeaking: boolean) => {
    setIsAiSpeaking(isSpeaking)
  }, [])

  const value = useMemo(
    () => ({
      conversation,
      liveTranscript,
      isAiSpeaking,
      addUserMessage,
      addAssistantMessage,
      setLiveTranscript,
      clearLiveTranscript,
      resetConversation,
      setAiSpeaking,
    }),
    [
      conversation,
      liveTranscript,
      isAiSpeaking,
      addUserMessage,
      addAssistantMessage,
      setLiveTranscript,
      clearLiveTranscript,
      resetConversation,
      setAiSpeaking,
    ],
  )

  return <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>
}

export const useConversation = () => {
  const context = useContext(ConversationContext)
  if (!context) {
    throw new Error('useConversation must be used within a ConversationProvider')
  }
  return context
}
