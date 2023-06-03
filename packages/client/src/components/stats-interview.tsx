'use client'
import { useMemo } from 'react'
import { useStore } from '../store'
import {
  INTERVIEW_MAX_SCORE,
  SCORE_TO_ACCOMPLISH,
  INTERVIEW_TOTAL_QUESTIONS
} from '../utils/constants'

export function StatsInterview() {
  const getTotalScore = useStore((state) => state.getTotalScore)
  const interview = useStore((state) => state.interview)

  // TODO: Change this, it should be a better way to do this
  const totalScore = useMemo(() => {
    return getTotalScore()
  }, [interview])

  return (
    <div className='bg-[#0d0d15] absolute bottom-0 py-4 px-6 w-full flex justify-between items-center font-semibold text-base xl:text-lg'>
      <div className='text-white'>
        <h4>
          Pregunta: {interview.length}/{INTERVIEW_TOTAL_QUESTIONS}
        </h4>
      </div>
      <div className='flex gap-6'>
        <h4 className='text-green-400'>Puntaje Actual: {totalScore}</h4>
        <h4 className='text-blue-400'>Puntaje Necesario: {SCORE_TO_ACCOMPLISH}</h4>
        <h4 className='text-red-400'>Puntaje Máximo: {INTERVIEW_MAX_SCORE}</h4>
      </div>
    </div>
  )
}
