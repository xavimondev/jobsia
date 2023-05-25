import Link from 'next/link'
import { DetailsInterview } from './details-interview'

export function FeedbackInterview() {
  return (
    <div className='flex flex-col w-full gap-7 max-w-5xl'>
      <div className='flex flex-col text-white'>
        <p className=''>
          Puedes ver el puntaje que te dió el asistente a cada pregunta y el feedback para mejorar
          en la siguiente entrevista.
        </p>
        <p className=''>
          Revisa el resultado de otros visitando el{' '}
          <Link href='/dashboard' className='text-blue-400 underline'>
            dashboard
          </Link>
        </p>
      </div>
      <DetailsInterview />
    </div>
  )
}
