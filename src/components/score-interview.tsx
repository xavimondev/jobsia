import { INTERVIEW_MAX_SCORE } from '@/utils/constants'
import { useStore } from '@/store'

export function ScoreInterview() {
  const getTotalScore = useStore((state) => state.getTotalScore)

  return (
    <div className='text-3xl xl:text-5xl'>
      <p className='text-white font-semibold'>
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#b6eead] to-[#59bc6b]'>
          Felicidades
        </span>
        , has obtenido{' '}
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#b6eead] to-[#59bc6b]'>
          {getTotalScore()}
        </span>{' '}
        puntos de{' '}
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600'>
          {INTERVIEW_MAX_SCORE}.
        </span>
      </p>
    </div>
  )
}
