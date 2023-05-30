'use client'
import { useEffect } from 'react'
import { useStore } from '@/store'
import { ListInterviews } from '@/components/dashboard/list-interviews'
import { ListIndicators } from '@/components/dashboard/list-indicators'

export function BodyDashboard() {
  const jobOfferIdSelected = useStore((state) => state.jobOfferIdSelected)
  const setInterviewReport = useStore((state) => state.setInterviewReport)
  const setIsLoadingInterviewReport = useStore((state) => state.setIsLoadingInterviewReport)
  const setIndicators = useStore((state) => state.setIndicators)

  useEffect(() => {
    if (jobOfferIdSelected) {
      setIsLoadingInterviewReport(true)
      fetch(`/api/dashboard?offerid=${jobOfferIdSelected}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            const { indicators, interviews } = data
            setIndicators(indicators)
            setInterviewReport(interviews)
          }
        })
        .finally(() => setIsLoadingInterviewReport(false))
    }
  }, [jobOfferIdSelected])

  return (
    <>
      <ListIndicators />
      <ListInterviews />
    </>
  )
}
