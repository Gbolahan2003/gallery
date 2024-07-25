import React, { FC, memo } from 'react'
import { motion } from "framer-motion"


interface Props {
    children: React.ReactNode,
}

const CustomActionModal: FC<Props> = ({ children }) => {

    return (
        <section className='bg-gray-900 bg-opacity-90 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 min-h-screen flex items-center justify-center max-h-full'>
            <div className='relative w-full max-h-full'>
                <div className='relative'>
                    <motion.div
                        animate={{ scale: [0.5, 0.2, 1] }}
                        initial={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                        exit={{ scale: [0, 0.8, 0], opacity: [1] }}
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default memo(CustomActionModal) 