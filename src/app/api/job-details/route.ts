import { NextResponse } from 'next/server'
import type { Company, JobOffer, Location } from '@/types'

const API_INFOJOBS = `https://api.infojobs.net/api/7/offer`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const data = await fetch(`${API_INFOJOBS}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
    }
  })
  const {
    applications,
    contractType,
    experienceMin,
    id: jobId,
    minRequirements,
    maxPay,
    minPay,
    skillsList,
    country,
    province,
    studiesMin,
    title,
    profile
  } = await data.json()

  const location: Location = {
    country: country.value,
    province: province.value
  }

  const company: Company = {
    id: profile.id,
    name: profile.name,
    logo: profile.logoUrl
  }

  const salaryDesc =
    minPay == null || maxPay == null
      ? 'No especificado'
      : `${minPay.amountValue} - ${maxPay.amountValue}`

  const response: JobOffer = {
    id: jobId,
    title,
    company,
    minRequirements,
    location,
    contractType: contractType.value,
    experienceMin: experienceMin.value,
    applications: applications,
    salaryDesc,
    skillsList,
    studiesMin: studiesMin.value
  }
  return NextResponse.json(response)
}
