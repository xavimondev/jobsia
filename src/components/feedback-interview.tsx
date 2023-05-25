import Link from 'next/link'
import AccordionUi from '@/components/ui/accordion'

export function FeedbackInterview() {
  return (
    <div className='flex flex-col w-full gap-7'>
      <div className='flex flex-col text-white'>
        {/* <h2 className='font-semibold text-blue-400 text-3xl xl:text-5xl'>Feedback</h2> */}
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
      <AccordionUi />
    </div>
  )
}
