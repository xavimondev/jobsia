import { PropsWithChildren } from 'react'
import { NoSearchResults, WaitingSearch } from './illustrations'

export function NotResultsFound() {
  return (
    <div className='mt-40 sm:mt-30 flex justify-center items-center gap-2 flex-col text-center'>
      <NoSearchResults className='h-[200px] w-[200px] sm:w-[400px] sm:h-[400px]' />
      <p className='text-white text-lg sm:text-2xl max-w-xl'>
        <span className='font-bold'>Ningún resultado a la vista</span> Comprueba que esté bien
        escrito, usa otras palabras o revisa los filtros.
      </p>
    </div>
  )
}

export function NotJobSelected() {
  return (
    <div className='mt-2 hidden lg:flex justify-center items-center gap-2 flex-col text-center w-full h-full'>
      <WaitingSearch className='h-[200px] w-[200px] sm:w-[400px] sm:h-[400px]' />
      <p className='text-white text-2xl'>Selecciona una oferta de trabajo para ver el detalle</p>
    </div>
  )
}

export function NotInterviewAllowed({ children }: PropsWithChildren) {
  return (
    <div className='mt-2 hidden lg:flex justify-center items-center gap-2 flex-col text-center w-full h-full'>
      {children}
    </div>
  )
}
