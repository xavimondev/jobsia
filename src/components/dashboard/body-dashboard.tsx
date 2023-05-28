'use client'
import { useEffect } from 'react'
import { useStore } from '@/store'
import { ListInterviews } from '@/components/dashboard/list-interviews'
import { ListIndicators } from '@/components/dashboard/list-indicators'

export function BodyDashboard() {
  const jobOfferIdSelected = useStore((state) => state.jobOfferIdSelected)
  const setInterviewReport = useStore((state) => state.setInterviewReport)

  useEffect(() => {
    if (jobOfferIdSelected) {
      fetch(`/api/dashboard?offerid=${jobOfferIdSelected}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.interviews) {
            //console.log(data.interviews)
            setInterviewReport(data.interviews)
          }
        })
    }
  }, [jobOfferIdSelected])

  return (
    <>
      <ListIndicators />
      <ListInterviews />
    </>
  )
}
