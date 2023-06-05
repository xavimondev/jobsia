import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Candidate } from '../../../types'
import { getResumeOffer } from '../../../utils/getResumeOffer'
import { supabase } from '../../../utils/supabase'
import { ProcessInterview } from '../../../components/process-interview'
import { CheckInterview } from '../../../components/check-interview'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const response = await fetch(`https://api.infojobs.net/api/7/offer/${params.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
    }
  })

  const data = await response.json()
  const {
    id,
    title,
    profile: { name: companyName }
  } = data

  return {
    title: `Jobsia | Entrevista para el puesto ${title} en la compañia ${companyName}`,
    description: `Entrevista para el puesto ${title} en la compañia ${companyName}`,
    openGraph: {
      type: 'website',
      url: `https://jobsia.vercel.app/interview/${id}`,
      locale: 'es_ES',
      images: [
        {
          url: `https://jobsia.vercel.app/interview/${id}/opengraph-image`,
          type: 'image/png'
        }
      ]
    }
  }
}

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

async function verifyInterview(candidateId: string, offerId: string) {
  const { data } = await supabase
    .from('interviews')
    .select('created_at')
    .eq('offerId', offerId)
    .eq('candidateId', candidateId)

  return data
}

export default async function Interview({ params: { id } }: { params: { id: string } }) {
  const jobOfferData = getJobOfferDetails(id)
  const candidateData = getCandidateData()

  const [jobDetails, candidateDetails] = await Promise.all([jobOfferData, candidateData])
  const {
    title,
    profile: { name: companyName },
    salaryDescription,
    minRequirements,
    experienceMin,
    studiesMin,
    contractType
  } = jobDetails

  const { id: candidateId, photo, name, fullName, surname1, surname2, province } = candidateDetails
  const candidate: Candidate = {
    id: candidateId,
    name,
    surname1,
    surname2,
    fullName,
    city: province?.value ?? 'No especificó',
    photo
  }
  const interviewData = await verifyInterview(candidate.id, id)
  const resumeOffer = getResumeOffer(
    salaryDescription,
    experienceMin.value,
    studiesMin.value,
    contractType.value,
    minRequirements
  )
  if (interviewData!.length === 0)
    return (
      <ProcessInterview
        position={title}
        company={companyName}
        candidate={candidate}
        resumeOffer={resumeOffer}
      />
    )

  return (
    <CheckInterview
      position={title}
      company={companyName}
      interviewDate={interviewData![0].created_at}
    />
  )
}
