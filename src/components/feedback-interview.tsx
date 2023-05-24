import Link from 'next/link'
import AccordionUi from '@/components/ui/accordion'

export function FeedbackInterview() {
  return (
    <div className='flex flex-col items-center w-full gap-7 mx-auto max-w-3xl'>
      <div className='flex flex-col gap-4'>
        <h2 className='font-semibold text-blue-400 text-3xl xl:text-5xl'>Feedback</h2>
        <p className='text-white'>
          Puedes ver el puntaje que te dió el asistente a cada pregunta y el feedback para mejorar
          en la siguiente entrevista.
        </p>
        <p className='text-white'>
          Puedes revisar el resultado de otros visitando el{' '}
          <Link href='/dashboard' className='text-blue-400 underline'>
            dashboard
          </Link>
        </p>
      </div>
      <AccordionUi />
    </div>
  )
}
