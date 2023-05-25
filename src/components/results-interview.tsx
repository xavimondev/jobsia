import { SCORE_TO_ACCOMPLISH } from '@/utils/constants'
import { useStore } from '@/store'
import { Discarded, EvaluationExcellent } from './illustrations'
import { FeedbackInterview } from './feedback-interview'
import { ScoreInterview } from './score-interview'

export function ResultsInterview() {
  const getTotalScore = useStore((state) => state.getTotalScore)
  const hasIdealScore = getTotalScore() === SCORE_TO_ACCOMPLISH

  return (
    <section className='p-6 w-full h-screen grid place-items-center animate-fadeIn'>
      <div className='flex items-center'>
        {hasIdealScore ? (
          <EvaluationExcellent className='w-[400px] h-[400px] xl:w-[600px] xl:h-[600px]' />
        ) : (
          <Discarded className='w-[400px] h-[400px] xl:w-[600px] xl:h-[600px]' />
        )}

        <div className='flex flex-col items-center gap-4'>
          <ScoreInterview />
          <FeedbackInterview />
        </div>
      </div>
    </section>
  )
}
