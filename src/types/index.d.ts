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
