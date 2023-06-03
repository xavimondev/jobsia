import { create } from 'zustand'
import { EndInterviewStatus, Indicators, Interview, ReportInterview } from './types'

type State = {
  interview: Interview[]
  endInterviewStatus: EndInterviewStatus
  isAssistantSpeaking: boolean
  jobOfferIdSelected: string | undefined
  interviewReport: ReportInterview[]
  isLoadingInterviewReport: boolean
  indicators: Indicators
}

type Action = {
  updateInterview: (interview: Interview) => void
  getTotalScore: () => number
  setEndInterviewStatus: (endInterviewStatus: EndInterviewStatus) => void
  setIsAssistantSpeaking: (isAssistantSpeaking: boolean) => void
  setJobOfferIdSelected: (jobOfferIdSelected: string) => void
  setInterviewReport: (interviewReport: ReportInterview[]) => void
  setIsLoadingInterviewReport: (isLoadingInterviewReport: boolean) => void
  setIndicators: (indicators: Indicators) => void
}

export const useStore = create<State & Action>((set, get) => ({
  interview: [],
  endInterviewStatus: { isInterviewSaved: false, isLastSpeech: false },
  isAssistantSpeaking: true,
  jobOfferIdSelected: undefined,
  interviewReport: [],
  isLoadingInterviewReport: false,
  indicators: { seleccionados: 0, noSeleccionados: 0, postulantes: 0 },
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
  setInterviewReport: (interviewReport: ReportInterview[]) => set({ interviewReport }),
  setIsLoadingInterviewReport: (isLoadingInterviewReport: boolean) =>
    set({ isLoadingInterviewReport }),
  setIndicators: (indicators: Indicators) => set({ indicators })
}))
