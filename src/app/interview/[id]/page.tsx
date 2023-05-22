import { cookies } from 'next/headers'
import Image from 'next/image'

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
    category: { value: categoryValue },
    subcategory: { value: subcategoryValue },
    profile: { name: companyName }
  } = jobDetails

  const { id: jobOfferId, photo, name, fullName } = candidateDetails
  console.log(candidateDetails)
  return (
    <div className='h-screen relative'>
      <div className='p-6 w-full'>
        <header className='border-b border-white border-opacity-10 flex justify-between items-center pb-4 mb-2'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-4 items-center'>
              <h1 className='font-bold text-2xl xl:text-2xl text-white'>
                Entrevista de trabajo para {title}
              </h1>
              <span className='bg-blue-300 text-blue-600 p-1.5 rounded-md font-bold text-sm flex items-center gap-1'>
                <div className='h-1.5 w-1.5 rounded-full bg-blue-600'></div> {categoryValue} -{' '}
                {subcategoryValue}
              </span>
            </div>
            <h2 className='font-semibold text-gray-400 text-xl'>de la empresa {companyName}</h2>
          </div>
          <div className='text-white flex items-center gap-2'>
            <h3
              className='text-lg font-bold'
              dangerouslySetInnerHTML={{
                __html: fullName
              }}
            />
            <Image
              src={photo}
              width={34}
              height={34}
              alt={`Foto de ${name}`}
              className='rounded-full'
            />
          </div>
        </header>
        <div className='flex flex-row gap-4 mt-8'>
          <div className='text-yellow-300 text-4xl w-1/2'>
            <p className='italic'>
              Como te identifica a ti mismo dentro de unos años y como crees que debo decir un texto
              largo que no debe exceder los 100 tokens
            </p>
          </div>
          <div className='text-white text-3xl w-1/2'>
            <p>
              Soy una persona creativa que siempre está innovando, sin embargo debemos mejorar
              ciertos aspectos de la lógica
            </p>
          </div>
        </div>
      </div>
      <div className='bg-[#09080e] absolute bottom-0 py-3.5 w-full flex justify-center font-bold text-2xl'>
        <h4 className='text-green-400 mr-6'>PUNTAJE ACTUAL: 0</h4>
        <h4 className='text-red-400'>PUNTAJE NECESARIO: 40</h4>
      </div>
    </div>
  )
}
