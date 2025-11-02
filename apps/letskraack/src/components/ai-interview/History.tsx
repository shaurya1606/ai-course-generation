'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { DiscussionRoomRow } from '@/types/types'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import moment from 'moment'

type HistoryProps = {
  userEmail?: string
}

const History = ({ userEmail }: HistoryProps) => {
  const [discussionRooms, setDiscussionRooms] = useState<DiscussionRoomRow[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userEmail) {
      setDiscussionRooms([])
      return
    }

    const getDiscussionRooms = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`/api/discussion-room?userEmail=${encodeURIComponent(userEmail)}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch discussion rooms: ${response.statusText}`)
        }
        const data: DiscussionRoomRow[] = await response.json()
        setDiscussionRooms(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching discussion rooms for history view:', error)
        setDiscussionRooms([])
        setError('We could not load your previous sessions. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    void getDiscussionRooms()
  }, [userEmail])

  const feedbackCount = useMemo(
    () => discussionRooms.filter((room) => !!room.feedback).length,
    [discussionRooms],
  )

  const lecturesCopy = useMemo(() => {
    if (!discussionRooms.length) {
      return "You don't have any previous lectures"
    }
    return `You have ${discussionRooms.length} previous ${discussionRooms.length === 1 ? 'mock interview' : 'mock interviews'}`
  }, [discussionRooms.length])

  const feedbackCopy = useMemo(() => {
    if (!feedbackCount) {
      return "You don't have any previous interview feedback"
    }
    return `You have ${feedbackCount} feedback ${feedbackCount === 1 ? 'entry' : 'entries'} ready to review`
  }, [feedbackCount])

  return (
    <div className='flex w-full flex-col gap-6 p-10'>
      <div className='grid gap-4 md:grid-cols-2'>
        <div className='rounded-xl border border-neutral-800 bg-neutral-950/60 p-6 shadow-lg'>
          <h2 className='text-xl font-semibold text-neutral-100'>Your Previous Interviews</h2>
          <p className='mt-2 text-sm text-neutral-400'>
            {isLoading ? 'Loading your sessions...' : lecturesCopy}
          </p>
        </div>
        <div className='rounded-xl border border-neutral-800 bg-neutral-950/60 p-6 shadow-lg'>
          <h2 className='text-xl font-semibold text-neutral-100'>Feedback</h2>
          <p className='mt-2 text-sm text-neutral-400'>
            {isLoading ? 'Checking for feedback...' : feedbackCopy}
          </p>
        </div>
      </div>

      <Separator className='bg-neutral-800' />

      <div className='rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4 shadow-xl'>
        <div className='flex items-center justify-between px-2 py-3'>
          <div>
            <h3 className='text-lg font-semibold text-neutral-100'>Interview History</h3>
            <p className='text-sm text-neutral-400'>
              {discussionRooms.length ? 'Review your past interview rooms and feedback.' : 'No interviews yet. Start a session to see it listed here.'}
            </p>
          </div>
          {isLoading && <span className='text-xs text-neutral-500'>Refreshing…</span>}
        </div>

        {error && (
          <div className='mx-2 mb-3 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200'>
            {error}
          </div>
        )}

        {isLoading && !discussionRooms.length ? (
          <ItemGroup className='rounded-xl border border-neutral-800/70 bg-neutral-900/40'>
            {Array.from({ length: 3 }).map((_, index) => (
              <React.Fragment key={`history-skeleton-${index}`}>
                <Item className='animate-pulse border-neutral-800/40 bg-neutral-900/40'>
                  <ItemMedia variant='icon'>
                    <div className='size-8 rounded-full bg-neutral-800' />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className='h-4 w-32 rounded bg-neutral-800/60' />
                    <ItemDescription className='mt-2 h-3 w-48 rounded bg-neutral-800/40' />
                  </ItemContent>
                </Item>
                {index < 2 && <ItemSeparator className='bg-neutral-800/60' />}
              </React.Fragment>
            ))}
          </ItemGroup>
        ) : discussionRooms.length ? (
          <ItemGroup className='rounded-xl border border-neutral-800/70 bg-neutral-900/40'>
            {discussionRooms.map((room, index) => {
              const conversationMessages = Array.isArray(room.conversation)
                ? room.conversation
                : []
              
              const discussionRoomTime = room.createdAt ? moment(room.createdAt.toString()).format('lll') : null
              const feedbackReady = !!room.feedback
              const feedbackTime = room.feedbackGeneratedAt ? moment(room.feedbackGeneratedAt.toString()).format('lll') : null

              return (
                <React.Fragment key={room.roomId}>
                  <Item className='border-neutral-800/40 bg-neutral-900/60 cursor-pointer'>
                    <ItemMedia variant='icon'>
                      <div className='flex size-8 items-center justify-center rounded-full border border-neutral-700 bg-neutral-950 text-xs font-semibold uppercase text-neutral-200'>
                        {room.expertName?.[0] ?? '?'}
                      </div>
                    </ItemMedia>
                    <ItemContent>
                      <ItemHeader>
                        <ItemTitle className='text-neutral-200'>
                          {room.topic}
                        </ItemTitle>
                        <ItemActions>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                              feedbackReady
                                ? 'border border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                                : 'border border-neutral-700 bg-neutral-800/40 text-neutral-300'
                            }`}
                          >
                            {feedbackReady ? 'Feedback ready' : 'Feedback pending'}
                          </span>
                        </ItemActions>
                      </ItemHeader>
                      <ItemDescription>
                        <span className='font-medium text-neutral-300'>Coach:</span>{' '}
                        {room.expertName}
                        <span className='mx-2 text-neutral-600'>•</span>
                        <span className='font-medium text-neutral-300'>Coaching option:</span>{' '}
                        {room.coachingOption}
                      </ItemDescription>
                      <ItemFooter className='text-xs text-neutral-400'>
                        <div className='flex flex-wrap gap-3'>
                          <span>
                            Room ID:
                            <span className='ml-1 font-mono text-neutral-300'>{room.roomId}</span>
                          </span>
                          <span>
                            Time: 
                            <span className='ml-1 font-mono text-neutral-300'>{discussionRoomTime}</span>
                          </span>
                          <span>
                            Feedback Generated: 
                            <span className='ml-1 font-mono text-neutral-300'>{feedbackTime ?? '—'}</span>
                          </span>
                        </div>
                        <ItemActions>
                          <Button
                            asChild
                            size='sm'
                            variant='outline'
                            className='invisible group-hover/item:visible'
                          >
                            <Link href={`/discussion-room/${room.roomId}`}>Open Room</Link>
                          </Button>
                          {feedbackReady && (
                            <Button
                              asChild
                              size='sm'
                              className='invisible group-hover/item:visible'
                            >
                              <Link href={`/discussion-room/feedback/${room.roomId}`}>
                                View Feedback
                              </Link>
                            </Button>
                          )}
                        </ItemActions>
                      </ItemFooter>
                    </ItemContent>
                  </Item>
                  {index < discussionRooms.length - 1 && <ItemSeparator className='bg-neutral-800/60' />}
                </React.Fragment>
              )
            })}
          </ItemGroup>
        ) : (
          <div className='flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-800/60 bg-neutral-950/40 py-16 text-center text-neutral-400'>
            <span className='text-lg font-semibold text-neutral-200'>No sessions recorded yet</span>
            <p className='max-w-md text-sm text-neutral-500'>
              Start a new mock interview to build your practice history. Once you finish a session, it will appear here with quick access to your conversation and feedback.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default History