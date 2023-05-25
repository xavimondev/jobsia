'use client'
import { useMemo } from 'react'
import { INTERVIEW_TOTAL_QUESTIONS, INTERVIEW_MAX_SCORE } from '@/utils/constants'
import { useStore } from '@/store'

// Five is the maximum score
const TOTAL_SCORE = INTERVIEW_TOTAL_QUESTIONS * INTERVIEW_MAX_SCORE
// 0.6 can change, it's up to the user
const MAX_SCORE = TOTAL_SCORE * 0.6
export function StatsInterview() {
  const getTotalScore = useStore((state) => state.getTotalScore)
  const interview = useStore((state) => state.interview)
  const endInterviewStatus = useStore((state) => state.endInterviewStatus)

  // TODO: Change this, it should be a better way to do this
  const totalScore = useMemo(() => {
    return getTotalScore()
  }, [interview])

  return (
    <div
      className={`bg-[#0d0d15] absolute bottom-0 py-3.5 w-full flex justify-center font-bold text-xl gap-6 ${
        endInterviewStatus.isInterviewSaved && endInterviewStatus.isLastSpeech
          ? 'animate-fadeOutDown'
          : ''
      }`}
    >
      <h4 className='text-green-400'>PUNTAJE ACTUAL: {totalScore}</h4>
      <h4 className='text-blue-400'>PUNTAJE NECESARIO: {MAX_SCORE}</h4>
      <h4 className='text-red-400'>PUNTAJE MÁXIMO: {TOTAL_SCORE}</h4>
    </div>
  )
}
