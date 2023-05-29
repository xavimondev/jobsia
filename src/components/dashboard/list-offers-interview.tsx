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
          className='bg-[#15131d] text-gray-400 hover:text-white hover:bg-[#1d1b25] border-b border-none divide-none'
        />
      ))}
    </SelectBox>
  )
}
