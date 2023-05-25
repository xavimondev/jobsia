import { create } from 'zustand'
import { EndInterviewStatus, Interview } from './types'

type State = {
  interview: Interview[]
  endInterviewStatus: EndInterviewStatus
}

type Action = {
  updateInterview: (interview: Interview) => void
  getTotalScore: () => number
  setEndInterviewStatus: (endInterviewStatus: EndInterviewStatus) => void
}

export const useStore = create<State & Action>((set, get) => ({
  interview: [],
  endInterviewStatus: { isInterviewSaved: false, isLastSpeech: false },
  updateInterview: (interviewData: Interview) =>
    set((prev) => ({ interview: [...prev.interview, interviewData] })),
  getTotalScore: () => {
    const interview = get().interview
    return interview.reduce((acc, curr) => acc + curr.score, 0)
  },
  setEndInterviewStatus: (endInterviewStatus: EndInterviewStatus) =>
    set((prevState) => ({
      endInterviewStatus: { ...prevState.endInterviewStatus, ...endInterviewStatus }
    }))
}))
