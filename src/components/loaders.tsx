import { LoadingIc } from './icons'

type RingLoaderProps = {
  msg: string
}

export function RingLoader({ msg }: RingLoaderProps) {
  return (
    <div className='flex flex-col gap-2 justify-center items-center mt-20 w-full'>
      <LoadingIc className='h-10 w-10' />
      <span className='font-bold text-white'>{msg}</span>
    </div>
  )
}
