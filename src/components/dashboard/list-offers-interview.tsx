'use client'
import { SelectBox, SelectBoxItem } from '@tremor/react'
import { OffersInterview } from '@/types'

type ListOffersInterviewProps = {
  offers: OffersInterview[]
}

export function ListOffersInterview({ offers }: ListOffersInterviewProps) {
  return (
    <SelectBox
      onValueChange={(value) => console.log('the new value is', value)}
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
