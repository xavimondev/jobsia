import { OffersInterview } from '@/types'
import { ListOffersInterview } from '@/components/dashboard/list-offers-interview'

type HeaderDashboardProps = {
  data: OffersInterview[]
}

export function HeaderDashboard({ data }: HeaderDashboardProps) {
  return (
    <div className='flex items-center justify-between text-white'>
      <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
      <div className='flex items-center space-x-2'>
        <div className='grid gap-2'>
          <ListOffersInterview offers={data} />
        </div>
      </div>
    </div>
  )
}
