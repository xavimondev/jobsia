'use client'
import { useStore } from '@/store'
import { Candidate } from '@/types'
import { HeaderInterview } from './header-interview'
import { SkillsInterview } from './skills-interview'
import { StatsInterview } from './stats-interview'
import { ResultsInterview } from './results-interview'

type ProcessInterviewProps = {
  position: string
  company: string
  candidate: Candidate
  resumeOffer: string
}

export function ProcessInterview({
  position,
  company,
  candidate,
  resumeOffer
}: ProcessInterviewProps) {
  const { name, fullName, photo } = candidate
  const endInterviewStatus = useStore((state) => state.endInterviewStatus)
  const isEndInterview = endInterviewStatus.isInterviewSaved && endInterviewStatus.isLastSpeech

  return (
    <>
      {!isEndInterview && (
        <section className={`h-screen relative ${isEndInterview && 'animate-fadeOut'}`}>
          <div className='p-6 w-full'>
            <HeaderInterview
              position={position}
              company={company}
              fullName={fullName as string}
              photoUrl={photo}
              altImage={name}
            />
            <SkillsInterview
              candidate={candidate}
              position={position}
              company={company}
              resumeOffer={resumeOffer}
            />
          </div>
          <StatsInterview />
        </section>
      )}
      {isEndInterview && <ResultsInterview />}
    </>
  )
}
