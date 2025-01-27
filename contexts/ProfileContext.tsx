"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'

type ProfileContextType = {
  profileImage: string | null
  setProfileImage: (image: string | null) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    const storedImage = localStorage.getItem('profileImage')
    if (storedImage) {
      setProfileImage(storedImage)
    }
  }, [])

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}

