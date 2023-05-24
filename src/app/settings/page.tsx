import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CheckingSettings } from '@/components/illustrations'
import { CheckMedia } from '@/components/settings/check-media'

export default function Settings({
  searchParams: { offerId }
}: {
  searchParams: { offerId: string }
}) {
  const jobOfferId = offerId ? offerId : cookies().get('jobsia.offer-id')?.value
  if (!jobOfferId) redirect('/')

  return (
    <div className='p-6 h-screen grid place-items-center'>
      <section className='block lg:hidden mr-6'>
        <h1>No puedes acceder a este modulo desde el móvil</h1>
      </section>
      <section className='hidden lg:flex flex-row items-center mx-auto max-w-7xl'>
        <div className='full p-2 mr-24 w-[700px]'>
          <h2 className='font-bold text-3xl text-blue-300 mb-10'>
            Configurando el espacio de trabajo...
          </h2>
          {/* Steps block */}
          <CheckMedia offerId={jobOfferId} />
        </div>
        <div className='full'>
          <CheckingSettings width={550} height={550} />
        </div>
      </section>
    </div>
  )
}
