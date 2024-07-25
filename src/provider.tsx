'use client'; // Add this pragma to mark this file as a client-side component

import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { store } from './app/redux/store'
import { Toaster } from 'sonner'
import { AuthProvider, useAuth } from './context/authContext'
import { useRouter } from 'next/navigation' // Make sure this import is only used in client-side components

interface ProviderInterface {
    children: React.ReactNode
}

const GlobalProvider: FC<ProviderInterface> = ({ children }) => {
    // const { currentUser } = useAuth()
    // const router = useRouter()

    // console.log(currentUser);

    return (
        <AuthProvider>
            <Provider store={store}>
                <Toaster
                    position="top-center"
                    richColors
                    closeButton
                    toastOptions={{
                        style: { height: '64px' },
                    }}
                />
                {children}
            </Provider>
        </AuthProvider>
    )
}

export default GlobalProvider
