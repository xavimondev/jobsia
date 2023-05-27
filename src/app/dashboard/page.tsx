import { getOffersCompany } from '@/services/position'
import { ListOffersInterview } from '@/components/dashboard/list-offers-interview'
import { UsersIc } from '@/components/icons'

export default async function Dashboard() {
  const data = await getOffersCompany()

  return (
    <section className='p-6 w-full h-screen'>
      <div className='flex-1 p-6'>
        <div className='flex items-center justify-between text-white'>
          <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
          <div className='flex items-center space-x-2'>
            <div className='grid gap-2'>
              <ListOffersInterview offers={data} />
            </div>
          </div>
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-white mt-6'>
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
      </div>
    </section>
  )
}
