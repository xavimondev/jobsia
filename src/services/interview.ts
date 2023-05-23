export const startInterview = async (payload: any) => {
  const response = await fetch('/api/interview', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const data = await response.json()
  return data
}
