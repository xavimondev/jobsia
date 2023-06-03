import Link from 'next/link'
import { getReadableDate } from '../utils/getReadableDate'
import { NotInterviewAllowed } from './empty-state'
import { Blocked } from './illustrations'

type CheckInterviewProps = {
  position: string
  company: string
  interviewDate: string
}

export function CheckInterview({ position, company, interviewDate }: CheckInterviewProps) {
  return (
    <section className='h-screen grid place-items-center w-full mx-auto max-w-4xl'>
      <NotInterviewAllowed>
        <Blocked className='h-[200px] w-[200px] sm:w-[500px] sm:h-[500px]' />
        <p className='font-semibold text-white text-xl xl:text-3xl'>
          Ya has realizado una entrevista para el puesto{' '}
          <span className='text-yellow-400'>{position}</span> en la empresa{' '}
          <span className='text-yellow-400'>{company}</span> el{' '}
          <span className='text-yellow-400'>{getReadableDate(interviewDate)}</span>
        </p>
        <div className='mt-6 flex items-center gap-4'>
          <Link
            className='bg-primary border hover:border-opacity-30 border-white border-opacity-10 text-[#bac8de] hover:text-white py-2 px-4 rounded-md flex items-center'
            href='/'
          >
            Ir a Inicio
          </Link>
          <Link
            className='bg-primary border hover:border-opacity-30 border-white border-opacity-10 text-[#bac8de] hover:text-white py-2 px-4 rounded-md flex items-center'
            href={`/jobs?q=${encodeURIComponent(position)}`}
          >
            Realizar una entrevista
          </Link>
        </div>
      </NotInterviewAllowed>
    </section>
  )
}
