import { topicTypes } from '@/const'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  apiKey: string
  setApiKey: (apiKey: string) => void
  topicType: string
  setTopicType: (topicType: string) => void
  question: string
  setQuestion: (question: string) => void
  content: string
  setContent: (content: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      apiKey: '',
      setApiKey: (apiKey: string) => set({ apiKey }),
      topicType: topicTypes[0],
      setTopicType: (topicType: string) => set({ topicType }),
      question: '',
      setQuestion: (question: string) => set({ question }),
      content: '',
      setContent: (content: string) => set({ content }),
    }),
    {
      name: 'app-storage',
    },
  ),
)