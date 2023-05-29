import { PropsWithChildren } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { JobOffer, Skill } from '@/types'
import { Tooltip } from '@/components/ui/tooltip'
import {
  CheckIc,
  DoubleCheckIc,
  LocationIc,
  MoneyIc,
  SheetIc,
  SparkleIc,
  StudyIc,
  YoungIc
} from '@/components/icons'

type JobOfferDetailsProps = {
  jobOffer: JobOffer | undefined
}
export function JobOfferDetails({ jobOffer }: JobOfferDetailsProps) {
  if (!jobOffer) return null

  return (
    <>
      <div className='hidden lg:flex flex-col gap-5 rounded-xl bg-[#1d1c2d] w-full h-full p-5 animate-fadeIn overflow-scroll relative'>
        <div className='flex flex-row gap-2 items-center'>
          {jobOffer.company.logo && (
            <Image
              src={jobOffer.company.logo}
              alt='Leading'
              width={52}
              height={52}
              className='rounded-sm hidden lg:block'
            />
          )}
          <h2 className='font-bold text-white text-base lg:text-lg max-w-4xl'>{jobOffer.title}</h2>
        </div>
        <JobOfferDetailItem
          content={{
            subtitle: 'Requerimientos',
            value: jobOffer.minRequirements || 'No especificado'
          }}
        >
          <CheckIc width={18} height={18} />
        </JobOfferDetailItem>
        <JobOfferDetailItem
          content={{
            subtitle: 'Salario',
            value: jobOffer.salaryDesc
          }}
        >
          <MoneyIc width={18} height={18} />
        </JobOfferDetailItem>
        <JobOfferDetailItem
          content={{
            subtitle: 'Tipo de contrato',
            value: jobOffer.contractType
          }}
        >
          <SheetIc width={18} height={18} />
        </JobOfferDetailItem>
        <JobOfferDetailItem
          content={{
            subtitle: 'Experiencia mínima',
            value: jobOffer.experienceMin
          }}
        >
          <YoungIc width={18} height={18} />
        </JobOfferDetailItem>
        <JobOfferDetailItem
          content={{
            subtitle: 'Ubicación',
            value: `${jobOffer.location.country} ${jobOffer.location.province}`
          }}
        >
          <LocationIc width={18} height={18} />
        </JobOfferDetailItem>
        <JobOfferDetailItem
          content={{
            subtitle: 'Estudios',
            value: jobOffer.studiesMin
          }}
        >
          <StudyIc width={18} height={18} />
        </JobOfferDetailItem>
        {/* Skills section */}
        {jobOffer.skillsList && jobOffer.skillsList.length > 0 && (
          <JobOfferDetailSkills skillsList={jobOffer.skillsList} />
        )}
        <div className='flex absolute bottom-4 right-4'>
          <Tooltip text='Click para realizar una entrevista con un asistente de inteligencia artificial.'>
            <Link
              href={`/settings?offerId=${jobOffer.id}`}
              className='bg-[#13111a] text-[#bac8de] hover:text-white p-4 rounded-full flex items-center hover:animate-tada'
            >
              <SparkleIc className='h-5 w-5' />
            </Link>
          </Tooltip>
        </div>
      </div>
    </>
  )
}

type JobOfferDetailItemProps = {
  content: {
    subtitle: string
    value: any
  }
}
function JobOfferDetailItem({ content, children }: PropsWithChildren<JobOfferDetailItemProps>) {
  const { subtitle, value } = content
  return (
    <>
      <h3 className='text-white font-semibold text-lg flex items-center gap-1'>
        {children}
        {subtitle}
      </h3>
      <p className='text-white whitespace-pre'>{value}</p>
    </>
  )
}

type JobOfferDetailSkillsProps = {
  skillsList: Skill[]
}
function JobOfferDetailSkills({ skillsList }: JobOfferDetailSkillsProps) {
  if (skillsList.length > 0) return null
  return (
    <div className='flex flex-col gap-5'>
      <h3 className='text-white font-semibold text-lg flex items-center gap-1'>
        <DoubleCheckIc width={18} height={18} />
        Habilidades
      </h3>
      <div className='flex gap-2'>
        {skillsList.map((sk) => (
          <span
            key={sk.skill}
            className='p-1.5 text-green-300 bg-green-700/[0.5] rounded-md text-sm'
          >
            {sk.skill}
          </span>
        ))}
      </div>
    </div>
  )
}
