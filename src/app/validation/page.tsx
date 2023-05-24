import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Validation({
  searchParams: { offer }
}: {
  searchParams: { offer: string }
}) {
  const cookieStore = cookies()
  const accesToken = cookieStore.get('jobsia.access-token')?.value
  if (accesToken) redirect(`/settings?offer=${offer}`)
  else redirect(`/onboarding?offer=${offer}`)
}
