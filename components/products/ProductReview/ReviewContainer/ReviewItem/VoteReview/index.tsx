'use client'

import {
  IcoFlag,
  IcoThumbDown,
  IcoThumbDownFill,
  IcoThumbUp,
  IcoThumbUpFill,
} from '@/components/icons'
import { useState, useEffect, memo, useEffectEvent } from 'react'
import { voteReview } from '../../../services'

interface VoteReviewProps {
  reviewId: string
  initialVoteUp?: number
  initialVoteDown?: number
}

const VoteReview = ({
  reviewId,
  initialVoteUp = 0,
  initialVoteDown = 0,
}: VoteReviewProps) => {
  const [voteUp, setVoteUp] = useState(initialVoteUp)
  const [voteDown, setVoteDown] = useState(initialVoteDown)
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null)

  const loadUserVote = useEffectEvent(() => {
    const match = document.cookie.match(/(?:^|;\s*)review_votes=([^;]*)/)
    if (!match) return

    try {
      const votes = JSON.parse(decodeURIComponent(match[1]))
      if (votes[reviewId]) {
        setUserVote(votes[reviewId])
      }
    } catch {}
  })

  useEffect(() => {
    loadUserVote()
  }, []) 

  const handleVote = async (type: 'up' | 'down') => {
    if (userVote === type) return

    setVoteUp(type === 'up' ? voteUp + 1 : voteUp)
    setVoteDown(type === 'down' ? voteDown + 1 : voteDown)
    setUserVote(type)

    try {
      const data = await voteReview({ reviewId, type })
      setVoteUp(data.vote_up)
      setVoteDown(data.vote_down)
      setUserVote(data.userVote)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex items-center mt-10 gap-6">
      <button
        onClick={() => handleVote('up')}
        className="flex items-center gap-1"
      >
        {userVote === 'up' ? (
          <IcoThumbUpFill className="w-5 h-5" />
        ) : (
          <IcoThumbUp className="w-5 h-5" />
        )}
        <span>({voteUp})</span>
      </button>

      <button
        onClick={() => handleVote('down')}
        className="flex items-center gap-1"
      >
        {userVote === 'down' ? (
          <IcoThumbDownFill className="w-5 h-5" />
        ) : (
          <IcoThumbDown className="w-5 h-5" />
        )}
        <span>({voteDown})</span>
      </button>

      <span className="flex items-center text-sm">
        <IcoFlag className="w-5 h-5" /> Flag
      </span>
    </div>
  )
}

export default memo(VoteReview)
