import { create } from 'zustand'
import { EndInterviewStatus, Interview, ReportInterview } from './types'

type State = {
  interview: Interview[]
  endInterviewStatus: EndInterviewStatus
  isAssistantSpeaking: boolean
  jobOfferIdSelected: string | undefined
  interviewReport: ReportInterview[] | undefined
}

type Action = {
  updateInterview: (interview: Interview) => void
  getTotalScore: () => number
  setEndInterviewStatus: (endInterviewStatus: EndInterviewStatus) => void
  setIsAssistantSpeaking: (isAssistantSpeaking: boolean) => void
  setJobOfferIdSelected: (jobOfferIdSelected: string) => void
  setInterviewReport: (interviewReport: ReportInterview[]) => void
}

export const useStore = create<State & Action>((set, get) => ({
  interview: [],
  endInterviewStatus: { isInterviewSaved: false, isLastSpeech: false },
  isAssistantSpeaking: true,
  jobOfferIdSelected: undefined,
  interviewReport: undefined,
  updateInterview: (interviewData: Interview) =>
    set((prev) => ({ interview: [...prev.interview, interviewData] })),
  getTotalScore: () => {
    const interview = get().interview
    return interview.reduce((acc, curr) => acc + curr.score, 0)
  },
  setEndInterviewStatus: (endInterviewStatus: EndInterviewStatus) =>
    set((prevState) => ({
      endInterviewStatus: { ...prevState.endInterviewStatus, ...endInterviewStatus }
    })),
  setIsAssistantSpeaking: (isAssistantSpeaking: boolean) => set({ isAssistantSpeaking }),
  setJobOfferIdSelected: (jobOfferIdSelected: string) => set({ jobOfferIdSelected }),
  setInterviewReport: (interviewReport: ReportInterview[]) => set({ interviewReport })
}))
