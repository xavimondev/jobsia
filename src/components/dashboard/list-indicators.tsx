import { useStore } from '@/store'
import { CheckIc, NotIc, UsersIc } from '@/components/icons'

export function ListIndicators() {
  const indicators = useStore((state) => state.indicators)
  const { postulantes, seleccionados, noSeleccionados } = indicators

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-white mt-6'>
      <div className='rounded-lg shadow-sm bg-[#1d1c2d]'>
        <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-3'>
          <h3 className='font-medium'>Postulantes</h3>
          <UsersIc className='w-6 h-6 text-white' />
        </div>
        <div className='p-6 pt-0'>
          <div className='text-2xl font-bold'>{postulantes}</div>
        </div>
      </div>
      <div className='rounded-lg shadow-sm bg-[#1d1c2d]'>
        <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-3'>
          <h3 className='font-medium'>Seleccionados</h3>
          <CheckIc className='w-6 h-6 text-white' />
        </div>
        <div className='p-6 pt-0'>
          <div className='text-2xl font-bold'>{seleccionados}</div>
        </div>
      </div>
      <div className='rounded-lg shadow-sm bg-[#1d1c2d]'>
        <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-3'>
          <h3 className='font-medium'>No Seleccionados</h3>
          <NotIc className='w-6 h-6 text-white' />
        </div>
        <div className='p-6 pt-0'>
          <div className='text-2xl font-bold'>{noSeleccionados}</div>
        </div>
      </div>
    </div>
  )
}
