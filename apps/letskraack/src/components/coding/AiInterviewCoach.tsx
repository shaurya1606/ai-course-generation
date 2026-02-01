'use client'

import React, { useCallback, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { cpp } from '@codemirror/lang-cpp'
import { java } from '@codemirror/lang-java'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { ArrowLeft, CheckCircle, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type {
  AiInterviewQuestion,
  ApiError,
  CheckResponse,
  CodingLanguage,
  DifficultyLevel,
  GenerateResponse,
} from '@/types/types'
import {
  ALLOWED_DIFFICULTIES,
  CODING_LANGUAGE_CONFIG,
  CODING_LANGUAGE_OPTIONS,
  DEFAULT_CODING_LANGUAGE,
} from '@/constants/constant'

const CodeMirror = dynamic(async () => {
  const mod = await import('@uiw/react-codemirror')
  return mod.default
}, { ssr: false }) as unknown as typeof import('@uiw/react-codemirror').default

const DEFAULT_STARTER = CODING_LANGUAGE_CONFIG[DEFAULT_CODING_LANGUAGE].starterTemplate

const getLanguageExtension = (lang: CodingLanguage) => {
  switch (lang) {
    case 'python':
      return python()
    case 'cpp':
      return cpp()
    case 'java':
      return java()
    default:
      return javascript({ typescript: false })
  }
}

const AiInterviewCoach: React.FC = () => {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy')
  const [language, setLanguage] = useState<CodingLanguage>(DEFAULT_CODING_LANGUAGE)
  const [questionData, setQuestionData] = useState<AiInterviewQuestion | null>(null)
  const [code, setCode] = useState<string>(DEFAULT_STARTER)
  const [feedback, setFeedback] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [checking, setChecking] = useState<boolean>(false)
  const [error, setError] = useState<ApiError>(null)

  const constraints = useMemo(
    () => (questionData?.constraints ? questionData.constraints.split('\n').filter(Boolean) : []),
    [questionData?.constraints],
  )

  const handleLanguageChange = useCallback((value: CodingLanguage) => {
    setLanguage(value)
    setQuestionData(null)
    setCode(CODING_LANGUAGE_CONFIG[value].starterTemplate)
    setFeedback('')
    setError(null)
  }, [])

  const handleGenerate = useCallback(async () => {
    setLoading(true)
    setFeedback('')
    setError(null)

    try {
      const response = await fetch('/api/coding/generate-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ difficulty, language }),
      })

      const raw = await response.text()
      const payload: GenerateResponse | null = raw ? JSON.parse(raw) : null

      if (!response.ok || !payload?.question) {
        throw new Error(payload?.error || 'Failed to generate a new question.')
      }

      setQuestionData(payload.question)
      setLanguage(payload.question.language)
      setCode(
        payload.question.starterCode?.trim() ||
          CODING_LANGUAGE_CONFIG[payload.question.language].starterTemplate,
      )

      if (payload.error) {
        setError(payload.error)
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unexpected error while generating the question.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [difficulty, language])

  const handleCheckSolution = useCallback(async () => {
    if (!questionData) {
      setError('Generate a question before checking your solution.')
      return
    }

    if (!code.trim()) {
      setError('Please enter your solution before requesting feedback.')
      return
    }

    setChecking(true)
    setError(null)

    try {
      const response = await fetch('/api/coding/check-solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, question: questionData }),
      })

      const raw = await response.text()
      const payload: CheckResponse | null = raw ? JSON.parse(raw) : null

      if (!response.ok || !payload) {
        throw new Error(payload?.error || 'Failed to evaluate your solution.')
      }

      if (payload.error) {
        setError(payload.error)
      }

      setFeedback(payload.feedback || '')
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unexpected error while validating the solution.'
      setError(message)
    } finally {
      setChecking(false)
    }
  }, [code, questionData])

  const handleReset = useCallback(() => {
    setQuestionData(null)
    setCode(CODING_LANGUAGE_CONFIG[language].starterTemplate)
    setFeedback('')
    setError(null)
  }, [language])

  return (
    <div className='flex w-full flex-col gap-8'>
      <div className='rounded-3xl border border-gray-700/50 bg-gray-800/40 p-6 shadow-2xl backdrop-blur-sm'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
          <div>
            <h2 className='flex items-center gap-2 text-2xl font-semibold text-white'>
              <Code className='h-6 w-6 text-emerald-400' />
              AI Interview Coach
            </h2>
            <p className='mt-2 max-w-xl text-sm text-gray-300'>
              Generate interview-style coding questions tailored to your difficulty and language selection, solve them directly in the editor, and receive instant AI feedback.
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-4'>
            <div className='flex items-center gap-3'>
              <span className='text-sm text-gray-200'>Difficulty:</span>
              <Select value={difficulty} onValueChange={(value) => setDifficulty(value as DifficultyLevel)}>
                <SelectTrigger className='min-w-[140px] bg-gray-900/70 text-gray-100'>
                  <SelectValue placeholder='Select difficulty' />
                </SelectTrigger>
                <SelectContent className='bg-gray-900 text-gray-100'>
                  {ALLOWED_DIFFICULTIES.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex items-center gap-3'>
              <span className='text-sm text-gray-200'>Language:</span>
              <Select value={language} onValueChange={(value) => handleLanguageChange(value as CodingLanguage)}>
                <SelectTrigger className='min-w-[140px] bg-gray-900/70 text-gray-100'>
                  <SelectValue placeholder='Select language' />
                </SelectTrigger>
                <SelectContent className='bg-gray-900 text-gray-100'>
                  {CODING_LANGUAGE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className='mt-6 flex flex-wrap gap-4'>
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white'
          >
            {loading ? 'Generating...' : 'New Question'}
          </Button>
          <Button
            onClick={handleCheckSolution}
            disabled={checking || !code.trim()}
            className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white'
          >
            {checking ? 'Checking...' : 'Check Solution'}
          </Button>
          <Button
            onClick={handleReset}
            disabled={loading || checking}
            className='flex items-center gap-2 bg-gradient-to-r from-red-500 to-amber-500 text-white'
          >
            <ArrowLeft className='h-5 w-5' />
            Go Back
          </Button>
        </div>
        {error && (
          <p className='mt-4 rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200'>
            {error}
          </p>
        )}
      </div>

      {questionData && (
        <div className='rounded-3xl border border-gray-700/50 bg-gray-800/60 p-6 shadow-2xl backdrop-blur-sm'>
          <div className='flex flex-col gap-2'>
            <span className='text-xs uppercase tracking-wider text-emerald-300'>Active Challenge</span>
            <h3 className='text-xl font-semibold text-white'>{questionData.title}</h3>
            <p className='whitespace-pre-line text-sm text-gray-200'>{questionData.description}</p>
          </div>
          <div className='mt-4'>
            <h4 className='text-lg font-semibold text-emerald-300'>Constraints</h4>
            <ul className='mt-2 list-disc list-inside text-sm text-gray-200'>
              {constraints.map((line, idx) => (
                <li key={`${line}-${idx}`}>{line}</li>
              ))}
            </ul>
          </div>
          {questionData.note && (
            <div className='mt-4'>
              <h4 className='text-lg font-semibold text-emerald-300'>Note</h4>
              <p className='text-sm text-gray-200'>{questionData.note}</p>
            </div>
          )}
          {questionData.followUpQuestions?.length ? (
            <div className='mt-4'>
              <h4 className='text-lg font-semibold text-emerald-300'>Follow-up Prompts</h4>
              <ul className='mt-2 list-disc list-inside text-sm text-gray-200'>
                {questionData.followUpQuestions.map((item, idx) => (
                  <li key={`${item}-${idx}`}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}

      <div className='rounded-3xl border border-gray-700/50 bg-gray-800/60 shadow-2xl'>
        <div className='flex items-center gap-3 border-b border-gray-700/50 bg-gray-900/90 px-4 py-3'>
          <Code className='h-5 w-5 text-emerald-400' />
          <h3 className='text-lg font-semibold text-white'>Solution:</h3>
        </div>
        <div className='px-4 py-3'>
          <CodeMirror
            value={code}
            height='550px'
            extensions={[getLanguageExtension(questionData?.language ?? language)]}
            theme={dracula}
            onChange={(val) => setCode(val)}
          />
        </div>
      </div>

      {questionData?.editorialCode && (
        <div className='rounded-3xl border border-gray-700/50 bg-gray-800/60 shadow-2xl'>
          <div className='flex items-center justify-between gap-3 border-b border-gray-700/50 bg-gray-900/90 px-4 py-3'>
            <div className='flex items-center gap-3'>
              <Code className='h-5 w-5 text-emerald-400' />
              <h3 className='text-lg font-semibold text-white'>Reference Editorial</h3>
            </div>
            <span className='text-xs font-semibold uppercase tracking-wide text-emerald-300'>
              Generated in {CODING_LANGUAGE_CONFIG[questionData.language].label}
            </span>
          </div>
          {questionData.editorialExplanation && (
            <p className='px-4 pt-4 text-sm text-gray-200'>{questionData.editorialExplanation}</p>
          )}
          <div className='px-4 py-3'>
            <CodeMirror
              value={questionData.editorialCode}
              height='400px'
              extensions={[getLanguageExtension(questionData.language)]}
              theme={dracula}
              editable={false}
            />
          </div>
        </div>
      )}

      {feedback && (
        <div
          className={`rounded-3xl p-6 shadow-2xl backdrop-blur-sm ${
            feedback.includes('✅')
              ? 'border border-green-500/30 bg-green-900/40'
              : feedback.includes('❌')
              ? 'border border-red-500/30 bg-red-900/40'
              : 'border border-gray-700/50 bg-gray-800/60'
          }`}
        >
          <div className='flex items-start gap-4'>
            <CheckCircle
              className={`h-6 w-6 ${
                feedback.includes('✅')
                  ? 'text-green-400'
                  : feedback.includes('❌')
                  ? 'text-red-400'
                  : 'text-blue-400'
              }`}
            />
            <div className='flex-1 whitespace-pre-wrap leading-relaxed text-gray-200'>{feedback}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AiInterviewCoach
