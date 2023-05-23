import { cookies } from 'next/headers'
import Image from 'next/image'
import { SkillsInterview } from '@/components/skills-interview'

async function getJobOfferDetails(offerId: string) {
  const response = await fetch(`https://api.infojobs.net/api/7/offer/${offerId}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
    }
  })
  return response.json()
}

async function getCandidateData() {
  const cookieStore = cookies()
  const accesToken = cookieStore.get('jobsia.access-token')?.value
  const response = await fetch(`https://api.infojobs.net/api/6/candidate`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${process.env.INFOJOBS_TOKEN},Bearer ${accesToken}`
    }
  })
  return response.json()
}

export default async function Interview({ params: { id } }: { params: { id: string } }) {
  const jobOfferData = getJobOfferDetails(id)
  const candidateData = getCandidateData()

  const [jobDetails, candidateDetails] = await Promise.all([jobOfferData, candidateData])
  const {
    title,
    city,
    category: { value: categoryValue },
    subcategory: { value: subcategoryValue },
    profile: { name: companyName }
  } = jobDetails
  // console.log(jobDetails)
  const { id: jobOfferId, photo, name, fullName } = candidateDetails

  return (
    <div className='h-screen relative'>
      <div className='p-6 w-full'>
        <header className='border-b border-white border-opacity-10 flex justify-between items-center pb-4 mb-2'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-4 items-center'>
              <h1 className='font-bold text-xl xl:text-2xl text-white'>
                Entrevista de trabajo para {title}
              </h1>
              <span className='bg-blue-300 text-blue-600 p-1.5 rounded-md font-bold text-sm hidden xl:flex items-center gap-1'>
                <div className='h-1.5 w-1.5 rounded-full bg-blue-600'></div> {categoryValue} -{' '}
                {subcategoryValue}
              </span>
            </div>
            <h2 className='font-semibold text-gray-400 text-lg xl:text-xl'>
              de la empresa {companyName}
            </h2>
          </div>
          <div className='text-white flex items-center gap-2'>
            <h3
              className='text-base xl:text-lg font-bold'
              dangerouslySetInnerHTML={{
                __html: fullName
              }}
            />
            <Image
              src={photo}
              width={32}
              height={32}
              alt={`Foto de ${name}`}
              className='rounded-full w-6 h-6 xl:w-8 xl:h-8'
            />
          </div>
        </header>
        <SkillsInterview
          candidate={name}
          position={title}
          company={companyName}
          category={categoryValue}
          location={city}
        />
      </div>
      <div className='bg-[#09080e] absolute bottom-0 py-3.5 w-full flex justify-center font-bold text-2xl'>
        <h4 className='text-green-400 mr-6'>PUNTAJE ACTUAL: 0</h4>
        <h4 className='text-red-400'>PUNTAJE NECESARIO: 40</h4>
      </div>
    </div>
  )
}
