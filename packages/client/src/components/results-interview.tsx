'use client'
import { useEffect } from 'react'
import JSConfetti from 'js-confetti'
import { SCORE_TO_ACCOMPLISH } from '@/utils/constants'
import { useStore } from '@/store'
import { Discarded, EvaluationExcellent } from '@/components/illustrations'
import { FeedbackInterview } from '@/components/feedback-interview'
import { ScoreInterview } from '@/components/score-interview'

export function ResultsInterview() {
  const getTotalScore = useStore((state) => state.getTotalScore)
  const hasIdealScore = getTotalScore() >= SCORE_TO_ACCOMPLISH

  useEffect(() => {
    const jsConfetti = new JSConfetti()
    const emojis = hasIdealScore ? ['👏', '🎉', '🥳'] : ['😢', '❌', '😞']

    jsConfetti.addConfetti({
      emojis,
      emojiSize: 40,
      confettiNumber: 60,
      confettiRadius: 5
    })

    return () => {
      jsConfetti.clearCanvas()
    }
  }, [])

  return (
    <section className='p-6 w-full h-screen grid place-items-center animate-fadeIn'>
      <div className='flex items-center'>
        {hasIdealScore ? (
          <EvaluationExcellent className='w-[400px] h-[400px] xl:w-[600px] xl:h-[600px]' />
        ) : (
          <Discarded className='w-[400px] h-[400px] xl:w-[600px] xl:h-[600px]' />
        )}

        <div className='flex flex-col gap-4'>
          <ScoreInterview />
          <FeedbackInterview />
        </div>
      </div>
    </section>
  )
}
