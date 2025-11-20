'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { UserDetails } from '@/types/types'
import { UserDetailContext } from '@/context/UserDetailsContext'
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndex'


const Provider = ({children} : {children: React.ReactNode}) => {

    // clerk provided user object (hook) to use it for getting user information
    const { user } = useUser()
    const [userDetail, setUserDetail] = useState<UserDetails>({})
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0)

    useEffect(() => {
        const checkUserInDatabase = async () => {
            try {
                console.log('Checking if user exists in database:', user?.primaryEmailAddress?.emailAddress);
                const response = await axios.get('/api/user', {
                    params: { email: user?.primaryEmailAddress?.emailAddress }
                });
                const userFromDb = response.data;
                if (userFromDb) {
                    console.log('User exists in database:', userFromDb);
                    setUserDetail(userFromDb);
                } else {
                    console.log('User does not exist, creating new user.');
                    await CreateNewUser();
                }
            } catch (error) {
                console.error('Error checking/creating user:', error);
            }
        }

        if (user) {
            checkUserInDatabase();
        }
        // user && CreateNewUser();
    }, [user]);

    const CreateNewUser = async () => {
        const response = await axios.post('/api/user', {
            email: user?.primaryEmailAddress?.emailAddress,
            name: user?.fullName,
        });
        console.log('User created:', response.data);
        setUserDetail(response.data);
    }

  return (
    <>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <SelectedChapterIndexContext.Provider value={{  selectedChapterIndex, setSelectedChapterIndex }}>
          {children}
        </SelectedChapterIndexContext.Provider>
      </UserDetailContext.Provider>
    </>
  )
}

export default Provider;
