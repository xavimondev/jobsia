export interface Company {
  id?: string
  name: string
  logo?: string
}

export interface Location {
  country: string
  province: string
}

export interface Skill {
  skill: string
}

export interface JobOffer {
  id: string
  title: string
  company: Company
  minRequirements: string
  location: Location
  contractType?: string
  experienceMin?: string
  applications?: number
  salaryDesc: string
  skillsList?: Skill[]
  studiesMin?: string
  teleworking?: string
}

export interface InitialPermissions {
  isMicrophoneEnabled: boolean
  isAssistantEnabled: boolean
}

export interface Interview {
  question: string
  answer: string
  score: number
  feedback: string
}

export interface Candidate {
  id: string
  name: string
  surname1: string
  surname2: string
  fullName?: string
  city: string
  photo: string
}

export interface EndInterviewStatus {
  isInterviewSaved?: boolean
  isLastSpeech?: boolean
}

export interface OffersInterview {
  offerid: string
  companyname: string
  positionname: string
}

export interface ReportInterview {
  interviewid: string
  candidateid: string
  candidate: string
  candidate: string
  photo: string
  city: string
  jobposition: string
  company: string
  interviewdate: string
  totalscore: string
}
