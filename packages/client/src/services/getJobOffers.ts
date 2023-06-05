import { SERVER_ENDPOINT } from '@/utils/constants'

export const getJobOffers = async (query: string) => {
  const response = await fetch(`${SERVER_ENDPOINT}/api/list-jobs?q=${encodeURIComponent(query)}`)
  const data = await response.json()
  return data
}
