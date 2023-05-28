'use client'
import { SelectBox, SelectBoxItem } from '@tremor/react'
import { OffersInterview } from '@/types'
import { useStore } from '@/store'

type ListOffersInterviewProps = {
  offers: OffersInterview[]
}

export function ListOffersInterview({ offers }: ListOffersInterviewProps) {
  const setJobOfferIdSelected = useStore((state) => state.setJobOfferIdSelected)

  return (
    <SelectBox
      onValueChange={(value) => setJobOfferIdSelected(value)}
      placeholder='Selecciona el puesto de tu interés'
      className='w-96'
    >
      {offers.map((offer) => (
        <SelectBoxItem
          value={offer.offerid}
          text={`${offer.positionname} - ${offer.companyname}`}
          key={offer.offerid}
        />
      ))}
    </SelectBox>
  )
}
