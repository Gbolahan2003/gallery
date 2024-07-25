'use client'
import React, { useEffect, useState } from 'react'

const ProgressBar = () => {

    const [progess, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 0 : prevProgress + 10
            )
        }, 600);

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className='fixed z-50 top-0 w-full h-1 bg-gray-100'>
            <div className='bg-theme transition-all ease-in-out duration-500 h-full shadow-black shadow-md' style={{ width: `${progess}%` }}></div>
        </div>
    )

}

export default ProgressBar