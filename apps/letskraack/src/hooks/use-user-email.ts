'use client'

import { useContext, useMemo } from 'react'
import { UserDetailContext } from '@/context/UserDetailsContext'

export const useUserEmail = () => {
  const { userDetail } = useContext(UserDetailContext)

  return useMemo(() => userDetail?.email ?? null, [userDetail?.email])
}
