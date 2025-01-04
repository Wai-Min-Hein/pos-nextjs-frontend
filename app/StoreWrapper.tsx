'use client'

import TobBar from '@/components/TobBar'
import StoreProvider from '@/store/StoreProvider'
import React from 'react'

const StoreWrapper = ({children}: {children:React.ReactNode}) => {
  return (
    <StoreProvider>
        {/* <TobBar /> */}
        {children}
    </StoreProvider>
  )
}

export default StoreWrapper