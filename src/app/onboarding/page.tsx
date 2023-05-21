import Link from 'next/link'
import { DayMomentNight } from '@/components/illustrations'

export default function Onboarding() {
  return (
    <div className='p-6 h-screen grid place-items-center'>
      <section className='block lg:hidden mr-6'>
        <h1>No puedes acceder a este modulo desde el móvil</h1>
      </section>
      <section className='hidden lg:flex flex-row items-center mx-auto max-w-7xl'>
        <div className='w-full'>
          <h1 className='font-bold text-5xl text-blue-300 mb-5'>Bienvenido a InterviewIA</h1>
          <p className='text-white text-lg'>
            InterviewIA es una plataforma que te ayuda a prepararte para tus próximas entrevistas de
            trabajo.
          </p>
          <p className='text-white text-lg mt-3'>
            Tendrás dos fases de entrevista, la primera consistirá en una{' '}
            <span className='text-yellow-300 font-bold'>Entrevista inicial</span> y la segunda una{' '}
            <span className='text-yellow-300 font-bold'>Entrevista técnica</span>.
          </p>
          <div className='mt-8'>
            <h2 className='font-bold text-2xl text-blue-300 mb-5'>
              ¿En que consiste la entrevista inicial?
            </h2>
            <p className='text-white text-lg'>
              En este fase se evalua tu experiencia, habilidades y disponibilidad.
            </p>
            <p className='text-white text-lg'>
              Al culminar esta fase, el asistente arrojará un{' '}
              <span className='text-yellow-300 font-bold'>puntaje</span> que determinará si pasas a
              la siguiente fase.
            </p>
          </div>
          <div className='mt-8'>
            <h2 className='font-bold text-2xl text-blue-300 mb-5'>
              ¿En que consiste la entrevista técnica?
            </h2>
            <p className='text-white text-lg'>
              En este fase el asistente evaluará tus conocimientos técnicos solicitados en la oferta
              laboral.
            </p>
            <p className='text-white text-lg'>
              Al igual que la fase previa, debes obtener el{' '}
              <span className='text-yellow-300 font-bold'>puntaje</span> necesario para alcanzar la
              fase final.
            </p>
          </div>
          <div className='p-3 border rounded-lg text-blue-400 border-blue-300 mt-4'>
            <div className='flex items-center justify-between'>
              <span className='font-semibold'>
                Para empezar la prueba técnica necesitas autenticarte
              </span>
              <Link
                href={`https://www.infojobs.net/api/oauth/user-authorize/index.xhtml?scope=MY_APPLICATIONS,CANDIDATE_PROFILE_WITH_EMAIL,CANDIDATE_READ_CURRICULUM_SKILLS,CV,CANDIDATE_READ_CURRICULUM_CVTEXT,CANDIDATE_READ_CURRICULUM_EDUCATION,CANDIDATE_READ_CURRICULUM_EXPERIENCE,COVER_LETTER_READ&client_id=${process.env.INFOJOBS_CLIENT_ID}&redirect_uri=${process.env.INFOJOBS_REDIRECT_URI}&response_type=code`}
                className='bg-transparent border rounded-lg text-sm px-3 py-2 text-center hover:bg-blue-600 border-blue-600 text-blue-400 hover:text-white '
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <DayMomentNight width={650} height={650} />
        </div>
      </section>
    </div>
  )
}
