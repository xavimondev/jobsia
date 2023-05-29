import { getOffersCompany } from '@/services/position'
import { HeaderDashboard } from '@/components/dashboard/header-dashboard'
import { BodyDashboard } from '@/components/dashboard/body-dashboard'

export const dynamic = 'force-dynamic'
export default async function Dashboard() {
  const data = await getOffersCompany()
  return (
    <section className='p-6 w-full h-screen'>
      <div className='flex-1 p-6'>
        <HeaderDashboard data={data} />
        <BodyDashboard />
      </div>
    </section>
  )
}
