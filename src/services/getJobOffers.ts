export const getJobOffers = async (query: string) => {
  const response = await fetch(`/api/list-jobs?q=${encodeURIComponent(query)}`)
  const data = await response.json()
  return data
}
