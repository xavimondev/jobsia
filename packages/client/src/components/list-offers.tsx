import { JobOffer } from '@/types'
import { LocationIc, MoneyIc, YoungIc } from '@/components/icons'

type ListOffersProps = {
  jobDetailsFn: (offerId: string) => Promise<void>
  offers: JobOffer[]
}

export function ListOffers({ jobDetailsFn, offers }: ListOffersProps) {
  return (
    <div className='flex flex-col gap-6 w-full lg:w-1/2 lg:overflow-auto animate-fadeIn'>
      {offers.map((offer) => {
        return (
          <article
            className='rounded-xl border-none bg-[#1d1c2d] z-10 w-full p-5 cursor-pointer'
            key={offer.id}
            onClick={() => jobDetailsFn(offer.id)}
          >
            <div className='mb-3 flex flex-col gap-2 w-full'>
              <h3 className='font-bold text-white text-lg line-clamp-1'>{offer.title}</h3>
              <h4 className='font-semibold text-white text-lg'>{offer.company.name}</h4>
              <span className='flex items-center text-[#f77e80] gap-1 text-sm'>
                <LocationIc className='h-4 w-4' />
                {offer.location.country}, {offer.location.province}
              </span>
              <p className='text-gray-400 text-sm line-clamp-2'>{offer.minRequirements}</p>
            </div>
            <div className='flex flex-row items-center gap-2 justify-between'>
              <span className='flex items-center text-blue-300 gap-1 text-sm'>
                <YoungIc className='h-4 w-4' />
                {offer.experienceMin}
              </span>
              <span className='flex items-center text-green-400 gap-1 text-sm'>
                <MoneyIc className='h-4 w-4' />
                {offer.salaryDesc}
              </span>
            </div>
          </article>
        )
      })}
    </div>
  )
}
