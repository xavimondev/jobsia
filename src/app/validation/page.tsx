import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Validation() {
  const cookieStore = cookies()
  const accesToken = cookieStore.get('jobsia.access-token')?.value
  if (accesToken) redirect('/settings')
  else redirect('/onboarding')
}
