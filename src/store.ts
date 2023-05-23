import { create } from 'zustand'
import { Interview } from './types'

type State = {
  interview: Interview[]
}

type Action = {
  updateInterview: (interview: Interview) => void
  getTotalScore: () => number
}

export const useStore = create<State & Action>((set, get) => ({
  interview: [],
  updateInterview: (interviewData: Interview) =>
    set((prev) => ({ interview: [...prev.interview, interviewData] })),
  getTotalScore: () => {
    const interview = get().interview
    return interview.reduce((acc, curr) => acc + curr.score, 0)
  }
}))
