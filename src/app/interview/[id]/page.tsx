import { cookies } from 'next/headers'
import { Candidate } from '@/types'
import { SkillsInterview } from '@/components/skills-interview'
import { StatsInterview } from '@/components/stats-interview'
import { HeaderInterview } from '@/components/header-interview'

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
    profile: { name: companyName }
  } = jobDetails

  const {
    id: candidateId,
    photo,
    name,
    fullName,
    surname1,
    surname2,
    city: cityCandidate
  } = candidateDetails
  const candidate: Candidate = {
    id: candidateId,
    name,
    surname1,
    surname2,
    city: cityCandidate,
    photo
  }

  return (
    <div className='h-screen relative'>
      <div className='p-6 w-full'>
        <HeaderInterview
          position={title}
          company={companyName}
          fullName={fullName}
          photoUrl={photo}
          altImage={name}
        />
        <SkillsInterview candidate={candidate} position={title} company={companyName} />
      </div>
      <StatsInterview />
    </div>
  )
}
