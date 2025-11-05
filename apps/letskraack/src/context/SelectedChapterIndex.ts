import { createContext } from 'react'
import { SelectedChapterIndexContextType } from '@/types/types'

export const SelectedChapterIndexContext = createContext<SelectedChapterIndexContextType>({ 
	selectedChapterIndex: 0,
	setSelectedChapterIndex: () => {},
})
