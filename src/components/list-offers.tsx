import { JobOffer } from '@/types'

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
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  fill='currentColor'
                  viewBox='0 0 256 256'
                >
                  <path d='M239.73,208H224V96a16,16,0,0,0-16-16H164a4,4,0,0,0-4,4V208H144V32.41a16.43,16.43,0,0,0-6.16-13,16,16,0,0,0-18.72-.69L39.12,72A16,16,0,0,0,32,85.34V208H16.27A8.18,8.18,0,0,0,8,215.47,8,8,0,0,0,16,224H240a8,8,0,0,0,8-8.53A8.18,8.18,0,0,0,239.73,208ZM76,184a8,8,0,0,1-8.53,8A8.18,8.18,0,0,1,60,183.72V168.27A8.19,8.19,0,0,1,67.47,160,8,8,0,0,1,76,168Zm0-56a8,8,0,0,1-8.53,8A8.19,8.19,0,0,1,60,127.72V112.27A8.19,8.19,0,0,1,67.47,104,8,8,0,0,1,76,112Zm40,56a8,8,0,0,1-8.53,8,8.18,8.18,0,0,1-7.47-8.26V168.27a8.19,8.19,0,0,1,7.47-8.26,8,8,0,0,1,8.53,8Zm0-56a8,8,0,0,1-8.53,8,8.19,8.19,0,0,1-7.47-8.26V112.27a8.19,8.19,0,0,1,7.47-8.26,8,8,0,0,1,8.53,8Z'></path>
                </svg>
                {offer.teleworking}
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
