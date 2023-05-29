import Link from 'next/link'
import { OffersInterview } from '@/types'
import { ListOffersInterview } from '@/components/dashboard/list-offers-interview'
import { CaretRight, HomeIc } from '@/components/icons'

type HeaderDashboardProps = {
  data: OffersInterview[]
}

export function HeaderDashboard({ data }: HeaderDashboardProps) {
  return (
    <div className='flex items-center justify-between text-white'>
      <nav className='flex text-2xl' aria-label='Breadcrumb'>
        <ol className='inline-flex items-center space-x-1 md:space-x-3'>
          <li className='inline-flex items-center'>
            <Link
              href='/'
              className='inline-flex items-center text-gray-400 hover:text-white font-bold'
            >
              <HomeIc className='w-5 h-5 mr-2' />
              Home
            </Link>
          </li>
          <li aria-current='page'>
            <div className='flex items-center'>
              <CaretRight className='w-4 h-4 text-gray-400' />
              <Link href='/dashboard' className='ml-2 font-bold text-white'>
                Dashboard
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      <div className='flex items-center space-x-2'>
        <div className='grid gap-2'>
          <ListOffersInterview offers={data} />
        </div>
      </div>
    </div>
  )
}
