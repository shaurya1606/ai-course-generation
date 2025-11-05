'use client'

import { useContext } from 'react'
import { UserDetailContext } from '@/context/UserDetailsContext'
import type { UserDetailsContextType } from '@/types/types'

export const useUserDetails = (): UserDetailsContextType => {
  return useContext(UserDetailContext)
}
