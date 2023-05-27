import { getOffersCompany } from '@/services/position'
import { ListOffersInterview } from '@/components/dashboard/list-offers-interview'
import { ListInterviews } from '@/components/dashboard/list-interviews'
import { ListIndicators } from '@/components/dashboard/list-indicators'

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
        <ListIndicators />
        <ListInterviews />
      </div>
    </section>
  )
}
