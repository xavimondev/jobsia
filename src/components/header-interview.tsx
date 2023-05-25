'use client'
import Image from 'next/image'
import { useStore } from '@/store'

type HeaderInterviewProps = {
  position: string
  company: string
  fullName: string
  photoUrl: string
  altImage: string
}

export function HeaderInterview({
  position,
  company,
  fullName,
  photoUrl,
  altImage
}: HeaderInterviewProps) {
  const endInterviewStatus = useStore((state) => state.endInterviewStatus)

  return (
    <header
      className={`border-b border-white border-opacity-10 flex justify-between items-center pb-6 mb-2 ${
        endInterviewStatus.isInterviewSaved && endInterviewStatus.isLastSpeech
          ? 'animate-fadeOut'
          : ''
      } `}
    >
      <div className='flex flex-col gap-2'>
        <div className='flex gap-1 xl:gap-4 items-center max-w-4xl xl:max-w-6xl'>
          <h1 className='font-semibold text-lg xl:text-2xl text-white'>
            Entrevista de trabajo para {position} de la empresa{' '}
            <span className='text-green-400'>{company}</span>
          </h1>
        </div>
      </div>
      <div className='text-white flex items-center gap-2'>
        <h3
          className='text-base xl:text-lg font-bold'
          dangerouslySetInnerHTML={{
            __html: fullName
          }}
        />
        <Image
          src={photoUrl}
          width={32}
          height={32}
          alt={`Foto de ${altImage}`}
          className='rounded-full w-6 h-6 xl:w-8 xl:h-8'
        />
      </div>
    </header>
  )
}
