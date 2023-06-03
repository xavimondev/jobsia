import { LineWobble } from '@uiball/loaders'
import { LoadingIc } from './icons'

type RingLoaderProps = {
  msg: string
  className?: string
}

export function RingLoader({ msg, className }: RingLoaderProps) {
  return (
    <div className={`flex flex-col gap-2 justify-center items-center w-full ${className ?? ''}`}>
      <LoadingIc className='h-10 w-10' />
      <span className='font-bold text-white'>{msg}</span>
    </div>
  )
}

type LineWobbleLoader = {
  msg: string
  className: string
}

export function LineWobbleLoader({ msg, className }: LineWobbleLoader) {
  return (
    <div className='flex flex-col items-center gap-1'>
      <LineWobble color='#FDE047' size={80} speed={3} lineWeight={6} />
      <span className={className}>{msg}</span>
    </div>
  )
}
