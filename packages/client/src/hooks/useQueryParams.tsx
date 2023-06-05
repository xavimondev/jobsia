'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function useQueryParams<T = unknown>() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryParams = Object.fromEntries(searchParams.entries()) as Partial<T>
  const urlSearchParams = new URLSearchParams(searchParams.toString())

  function setQueryParams(params: Partial<T>) {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value))
    })

    const search = urlSearchParams.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  return { queryParams, setQueryParams }
}
