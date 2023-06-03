'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { JobOffer } from '@/types'
import { SERVER_ENDPOINT } from '@/utils/constants'
import { getJobOffers } from '@/services/getJobOffers'
import useQueryParams from '@/hooks/useQueryParams'
import { NotJobSelected, NotResultsFound } from '@/components/empty-state'
import { RingLoader } from '@/components/loaders'
import { ListOffers } from '@/components/list-offers'
import { JobOfferDetails } from '@/components/joboffer-details'
import { SearchForm } from '@/components/search-form'

export default function JobsResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') as string
  const [jobResults, setJobResults] = useState<JobOffer[]>([])
  const [jobDetails, setJobDetails] = useState<JobOffer | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({
    jobs: true,
    jobdetails: false
  })
  const { setQueryParams } = useQueryParams<{ q: string }>()

  useEffect(() => {
    if (!query) return

    setIsLoading({
      ...isLoading,
      jobs: true
    })

    getJobOffers(query)
      .then((response) => {
        const offers = response.data
        setJobResults(offers)
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading({
          ...isLoading,
          jobs: false
        })
      })
  }, [query])

  const getJobDetails = async (id: string) => {
    setIsLoading({
      ...isLoading,
      jobdetails: true
    })
    setJobDetails(undefined)
    const response = await fetch(`${SERVER_ENDPOINT}/api/job-details?id=${id}`)
    const data = await response.json()
    setJobDetails(data)
    setIsLoading({
      ...isLoading,
      jobdetails: false
    })
  }

  const onSubmitHandler = async (query: string) => {
    // Updating query params
    setQueryParams({
      q: query
    })
    setJobDetails(undefined)
  }

  return (
    <div className='p-6'>
      <section className='flex mb-7'>
        <div className='flex gap-6 w-full items-center'>
          <Link
            href='/'
            className='max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#ff8b42] to-[#8b36bb] font-bold text-xl hidden sm:block'
          >
            jobs.ia
          </Link>
          <SearchForm onSubmit={onSubmitHandler} enteredQuery={query} />
        </div>
      </section>
      {isLoading.jobs && <RingLoader msg='Obteniendo ofertas de trabajo' className='mt-20' />}
      {!isLoading.jobs && jobResults.length === 0 && <NotResultsFound />}
      {!isLoading.jobs && jobResults.length > 0 && (
        <section className='flex gap-5 w-full h-[calc(100vh-120px)]'>
          <ListOffers jobDetailsFn={getJobDetails} offers={jobResults} />
          {isLoading.jobdetails && (
            <RingLoader msg='Obteniendo detalles de la oferta' className='mt-20' />
          )}
          {!jobDetails && !isLoading.jobdetails && <NotJobSelected />}
          <JobOfferDetails jobOffer={jobDetails} />
        </section>
      )}
    </div>
  )
}
