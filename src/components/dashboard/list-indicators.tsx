import { UsersIc } from '@/components/icons'

export function ListIndicators() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-white mt-6'>
      <div className='rounded-lg border border-gray-400 border-opacity-25 shadow-sm'>
        <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-3'>
          <h3 className='text font-medium'>Postulantes</h3>
          <UsersIc className='w-8 h-8 text-white' />
        </div>
        <div className='p-6 pt-0'>
          <div className='text-2xl font-bold'>15</div>
        </div>
      </div>
      <div className='rounded-lg border border-gray-400 border-opacity-25 shadow-sm'>
        <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-3'>
          <h3 className='text font-medium'>Postulantes</h3>
          <UsersIc className='w-8 h-8 text-white' />
        </div>
        <div className='p-6 pt-0'>
          <div className='text-2xl font-bold'>15</div>
        </div>
      </div>
      <div className='rounded-lg border border-gray-400 border-opacity-25 shadow-sm'>
        <div className='p-6 flex flex-row items-center justify-between space-y-0 pb-3'>
          <h3 className='text font-medium'>Postulantes</h3>
          <UsersIc className='w-8 h-8 text-white' />
        </div>
        <div className='p-6 pt-0'>
          <div className='text-2xl font-bold'>15</div>
        </div>
      </div>
    </div>
  )
}
