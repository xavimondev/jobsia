import { NoSearchResults } from './illustrations'

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
