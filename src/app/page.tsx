import { redirect } from 'next/navigation'

export default function Home() {
  async function handleSubmit(data: FormData) {
    'use server'
    const query = data.get('search') as string
    redirect(`/jobs?q=${encodeURIComponent(query)}`)
  }
  return (
    <main className='p-6 min-h-screen h-full w-full grid place-items-center'>
      <section className='mx-auto flex justify-center items-center flex-col py-8 sm:py-10 lg:py-14'>
        <h1
          className='max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#ff8b42] to-[#8b36bb] font-bold text-5xl sm:text-7xl 
          mb-5'
        >
          jobs.ia
        </h1>
        <h2 className='text-[#bac8de] italic mb-8 text-sm sm:text-lg max-w-4xl text-center'>
          Disponible para desarrolladores, administradores de base de datos y diseñadores web
        </h2>
        <form
          action={handleSubmit}
          className='max-w-4xl flex flex-col gap-5 md:flex-row md:items-center w-full mb-6'
        >
          <div className='relative w-full'>
            <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-gray-500'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            <input
              type='search'
              name='search'
              className='bg-[#232234] 
                border-none 
                text-white 
                text-sm 
                rounded-lg 
                block 
                w-full 
                pl-10 
                p-2.5 
                placeholder-gray-500 
                focus:outline-none 
                focus:ring-1 
                focus:ring-purple-400'
              autoCapitalize='false'
              autoComplete='off'
              autoCorrect='off'
              placeholder='Desarrollador en JavaScript con 5 años de experiencia'
            />
          </div>
        </form>
        <div className='mx-auto max-w-6xl'>
          <div className='flex gap-4 flex-wrap'>
            <button className='border border-white border-opacity-10 text-sm sm:text-base w-full sm:w-auto hover:border-opacity-30 shadow-md rounded-lg transition duration-200 ease-in-out group hover:-translate-y-1 z-10 bg-[#13111a] text-[#bac8de] hover:text-white p-2'>
              Desarrollador c# con ASP.NET con 2 años de experiencia y modalidad presencial
            </button>
            <button className='border border-white border-opacity-10 text-sm sm:text-base w-full sm:w-auto hover:border-opacity-30 shadow-md rounded-lg transition duration-200 ease-in-out group hover:-translate-y-1 z-10 bg-[#13111a] text-[#bac8de] hover:text-white p-2'>
              Desarrollador Java con salario de 30.000 en Barcelona
            </button>
            <button className='border border-white border-opacity-10 text-sm sm:text-base w-full sm:w-auto hover:border-opacity-30 shadow-md rounded-lg transition duration-200 ease-in-out group hover:-translate-y-1 z-10 bg-[#13111a] text-[#bac8de] hover:text-white p-2'>
              Programador a Java en Sevilla con contrato indefinido y modalidad teletrabajo
            </button>
            <button className='border border-white border-opacity-10 text-sm sm:text-base w-full sm:w-auto hover:border-opacity-30 shadow-md rounded-lg transition duration-200 ease-in-out group hover:-translate-y-1 z-10 bg-[#13111a] text-[#bac8de] hover:text-white p-2'>
              Administrador de sistemas Linux en Madrid con contrato indefinido
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
