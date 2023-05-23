import { create } from 'zustand'
import { Interview } from './types'

type State = {
  interview: Interview[]
}

type Action = {
  updateInterview: (interview: Interview) => void
}

export const useStore = create<State & Action>((set) => ({
  interview: [],
  updateInterview: (interviewData: Interview) =>
    set((prev) => ({ interview: [...prev.interview, interviewData] }))
}))
