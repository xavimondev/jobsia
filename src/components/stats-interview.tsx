'use client'
import { useMemo } from 'react'
import { useStore } from '@/store'
import { INTERVIEW_MAX_SCORE, SCORE_TO_ACCOMPLISH } from '@/utils/constants'

export function StatsInterview() {
  const getTotalScore = useStore((state) => state.getTotalScore)
  const interview = useStore((state) => state.interview)

  // TODO: Change this, it should be a better way to do this
  const totalScore = useMemo(() => {
    return getTotalScore()
  }, [interview])

  return (
    <div className='bg-[#0d0d15] absolute bottom-0 py-3.5 w-full flex justify-center font-semibold text-lg xl:text-xl gap-6'>
      <h4 className='text-green-400'>PUNTAJE ACTUAL: {totalScore}</h4>
      <h4 className='text-blue-400'>PUNTAJE NECESARIO: {SCORE_TO_ACCOMPLISH}</h4>
      <h4 className='text-red-400'>PUNTAJE MÁXIMO: {INTERVIEW_MAX_SCORE}</h4>
    </div>
  )
}
