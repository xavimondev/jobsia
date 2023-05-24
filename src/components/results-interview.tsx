import { INTERVIEW_MAX_SCORE, INTERVIEW_TOTAL_QUESTIONS } from '@/utils/constants'
import { EvaluationExcellent } from '@/components/illustrations'

export function ResultsInterview() {
  return (
    <div className='flex flex-col items-center gap-4 mx-auto max-w-4xl animate-bounce animate-delay-200'>
      <EvaluationExcellent className='w-[500px] h-[500px] xl:w-[600px] xl:h-[600px]' />
      <p className='text-white text-2xl xl:text-4xl font-semibold text-center'>
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#b6eead] to-[#59bc6b]'>
          Felicidades
        </span>
        , has obtenido{' '}
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#b6eead] to-[#59bc6b]'>
          30
        </span>{' '}
        puntos de{' '}
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600'>
          {INTERVIEW_TOTAL_QUESTIONS * INTERVIEW_MAX_SCORE}
        </span>
      </p>
      <p className='text-white text-2xl xl:text-4xl font-semibold'>
        Con esto estarías apto para la siguiente fase.
      </p>
      <p className='text-white text-2xl xl:text-4xl font-semibold animate-slideInUp'>
        A continuación, verás el{' '}
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#b6eead] to-[#59bc6b]'>
          resumen de tu entrevista, puntaje y feedback
        </span>{' '}
        realizado por el asistente.
      </p>
    </div>
  )
}
