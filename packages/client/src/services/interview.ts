import { SERVER_ENDPOINT } from '@/utils/constants'
import { Candidate, Interview } from '@/types'

export const startInterview = async (payload: any) => {
  const response = await fetch(`${SERVER_ENDPOINT}/api/interview`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const data = await response.json()
  return data
}

export const saveInterview = async (payload: {
  candidate: Candidate
  interviewDetails: Interview[]
}) => {
  const response = await fetch(`${SERVER_ENDPOINT}/api/end-interview`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const data = await response.json()
  return data
}
