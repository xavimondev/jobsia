'use client'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { SearchForm } from '@/components/search-form'
import { ListSuggestions } from '@/components/list-suggestions'
import { DashboardIc } from '@/components/icons'

const handleSubmit = (query: string) => {
  redirect(`/jobs?q=${encodeURIComponent(query)}`)
}

export default function Home() {
  return (
    <main className='p-6 min-h-screen h-full w-full grid place-items-center animate-fadeIn animate-delay-150'>
      <section className='mx-auto flex justify-center items-center flex-col py-8 sm:py-10 lg:py-14'>
        <h1
          className='max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#ff8b42] to-[#8b36bb] font-bold text-5xl sm:text-7xl 
          mb-5'
        >
          jobs.ia
        </h1>
        <h2 className='text-[#bac8de] italic mb-4 text-sm sm:text-lg max-w-4xl text-center'>
          Disponible para desarrolladores, administradores de base de datos y diseñadores web
        </h2>
        <Link
          href='/dashboard'
          className='flex gap-2 items-center text-[#bac8de] hover:text-white semibold p-2 bg-primary rounded-lg text-center border border-white border-opacity-10 mb-4 text-sm sm:text-base'
        >
          <DashboardIc className='w-4 h-4' />
          Deseo ir al dashboard
        </Link>
        <SearchForm onSubmit={handleSubmit} enteredQuery='' />
        <ListSuggestions />
      </section>
    </main>
  )
}
