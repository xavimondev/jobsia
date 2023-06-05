import Link from 'next/link'
import { DetailsInterview } from '@/components/details-interview'

export function FeedbackInterview() {
  return (
    <div className='flex flex-col w-full gap-7 max-w-5xl'>
      <div className='flex flex-col text-white'>
        <p>
          Puedes ver el puntaje que te dió el asistente a cada pregunta y el feedback para mejorar
          en la siguiente entrevista.
        </p>
        <p>
          Revisa el resultado de otros visitando el{' '}
          <Link href='/dashboard' className='text-blue-400 underline'>
            dashboard
          </Link>{' '}
          o si deseas puedes ir a{' '}
          <Link className='text-blue-400 underline' href='/'>
            Inicio
          </Link>
        </p>
      </div>
      <DetailsInterview />
    </div>
  )
}
