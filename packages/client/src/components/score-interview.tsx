import { SCORE_TO_ACCOMPLISH } from '../utils/constants'
import { useStore } from '../store'

export function ScoreInterview() {
  const getTotalScore = useStore((state) => state.getTotalScore)
  const hasIdealScore = getTotalScore() >= SCORE_TO_ACCOMPLISH
  const gradientStyles = `text-transparent bg-clip-text bg-gradient-to-r ${
    hasIdealScore ? 'from-[#b6eead] to-[#59bc6b]' : 'from-[#ee6b69] to-[#e15050]'
  }`

  return (
    <div className='text-2xl xl:text-4xl'>
      <p className='text-white font-semibold'>
        <span className={gradientStyles}>{hasIdealScore ? 'Felicidades' : 'Lo siento'}</span>, has
        obtenido <span className={gradientStyles}>{getTotalScore()}</span> puntos de{' '}
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600'>
          {SCORE_TO_ACCOMPLISH}.
        </span>
      </p>
    </div>
  )
}
