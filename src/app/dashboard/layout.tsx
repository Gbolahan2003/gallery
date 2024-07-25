'use client'
import Navbar from '@/components/element/navbar'
import GlobalProvider from '@/provider'
import React, { FC } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'


interface dashboardProps {
    children :React.ReactNode
}
const layout:FC<dashboardProps> = ({children}) => {

  return (
    <div className='w-full  '>
        
        <div className="">
          <GlobalProvider>
              {children}
          </GlobalProvider>
        </div>
    </div>
  )
}

export default layout