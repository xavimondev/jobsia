'use client'
import { SearchForm } from '@/components/search-form'
import { redirect } from 'next/navigation'

const handleSubmit = (query: string) => {
  redirect(`/jobs?q=${encodeURIComponent(query)}`)
}

export default function Home() {
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
        <SearchForm onSubmit={handleSubmit} enteredQuery='' />
        <div className='mx-auto max-w-6xl mt-4'>
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
