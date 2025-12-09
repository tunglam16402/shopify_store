'use client'

import {
  IcoFlag,
  IcoThumbDown,
  IcoThumbDownFill,
  IcoThumbUp,
  IcoThumbUpFill,
} from '@/components/icons'
import { useState } from 'react'
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

  const handleVote = async (type: 'up' | 'down') => {
    if (userVote === type) return

    setVoteUp(type === 'up' ? voteUp + 1 : voteUp)
    setVoteDown(type === 'down' ? voteDown + 1 : voteDown)
    setUserVote(type)

    try {
      const data = await voteReview({ reviewId, type })
      setVoteUp(data.vote_up)
      setVoteDown(data.vote_down)
      setUserVote(type)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex items-center mt-10 gap-6">
      <button
        className="flex items-center gap-1"
        onClick={() => handleVote('up')}
      >
        {!voteUp ? (
          <>
            <IcoThumbUp className="w-5 h-5" /> {voteUp}
          </>
        ) : (
          <>
            <IcoThumbUpFill className="w-5 h-5" /> {voteUp}
          </>
        )}
      </button>

         <button
        className="flex items-center gap-1"
        onClick={() => handleVote('down')}
      >
        {!voteDown ? (
          <>
            <IcoThumbDown className="w-5 h-5" /> {voteDown}
          </>
        ) : (
          <>
            <IcoThumbDownFill className="w-5 h-5" /> {voteDown}
          </>
        )}
      </button>

      <span className="flex items-center text-sm">
        <IcoFlag className="w-5 h-5" /> Flag
      </span>
    </div>
  )
}

export default VoteReview
