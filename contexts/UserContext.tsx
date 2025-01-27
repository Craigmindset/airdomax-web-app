"use client"

import React, { createContext, useState, useContext } from 'react'

interface UserData {
  firstName: string;
  lastName: string;
  companyName: string;
  website: string;
  contactNumber: string;
  email: string;
  companySector: string;
}

interface UserContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    companyName: '',
    website: '',
    contactNumber: '',
    email: '',
    companySector: '',
  })

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

