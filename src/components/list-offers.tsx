import { JobOffer } from '@/types'
import { YoungIc } from './icons'

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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  fill='currentColor'
                  viewBox='0 0 256 256'
                >
                  <path d='M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z'></path>
                </svg>
                {offer.location.country}, {offer.location.province}
              </span>
              <p className='text-gray-400 text-sm line-clamp-2'>{offer.minRequirements}</p>
            </div>
            <div className='flex flex-row items-center gap-2 justify-between'>
              <span className='flex items-center text-blue-300 gap-1 text-sm'>
                <YoungIc className='h-5 w-5' />
                {offer.experienceMin}
              </span>
              <span className='flex items-center text-green-400 gap-1 text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  fill='currentColor'
                  viewBox='0 0 256 256'
                >
                  <path d='M168,128a40,40,0,1,1-40-40A40,40,0,0,1,168,128Zm80-64V192a8,8,0,0,1-8,8H16a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H240A8,8,0,0,1,248,64Zm-16,46.35A56.78,56.78,0,0,1,193.65,72H62.35A56.78,56.78,0,0,1,24,110.35v35.3A56.78,56.78,0,0,1,62.35,184h131.3A56.78,56.78,0,0,1,232,145.65Z'></path>
                </svg>
                {offer.salaryDesc}
              </span>
            </div>
          </article>
        )
      })}
    </div>
  )
}
