import { EvaluationExcellent } from './illustrations'
import { FeedbackInterview } from './feedback-interview'
import { ScoreInterview } from './score-interview'

export function ResultsInterview() {
  return (
    <section className='p-6 w-full h-screen grid place-items-center animate-fadeIn'>
      <div className='flex items-center'>
        <EvaluationExcellent className='w-[400px] h-[400px] xl:w-[600px] xl:h-[600px]' />
        <div className='flex flex-col items-center gap-4'>
          <ScoreInterview />
          <FeedbackInterview />
        </div>
      </div>
    </section>
  )
}
