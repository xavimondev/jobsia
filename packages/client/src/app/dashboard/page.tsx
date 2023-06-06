import { getOffersCompany } from '@/services/position'
import { HeaderDashboard } from '@/components/dashboard/header-dashboard'
import { BodyDashboard } from '@/components/dashboard/body-dashboard'

export const dynamic = 'force-dynamic'
export default async function Dashboard() {
  const data = await getOffersCompany()
  return (
    <section className='p-6 w-full h-screen'>
      <div className='flex-1'>
        <HeaderDashboard data={data} />
        <p className='text-gray-300/80 mt-8 text-sm xl:text-base'>
          Podrás visualizar los resultados de otros candidatos solo en puestos de trabajo que tengan
          como mínimo una entrevista realizada.
        </p>
        <BodyDashboard />
      </div>
    </section>
  )
}
