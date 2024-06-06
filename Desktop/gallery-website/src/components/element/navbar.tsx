'use client'
import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/app/firebase/config'
import Iconify from './icon'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux/store'
import { fetchImageMetadata } from '@/app/redux/imageDocuments/fetaures'
import { useAuth } from '@/context/authContext'
import { ImageMetadata } from '@/app/redux/imageDocuments/interface'
import { setImageData } from '@/app/redux/imageDocuments'
import Images from '@/app/(dashboard)/Images'
import { filterByName } from '@/helper'

const Navbar = () => {

    const dispatch = useAppDispatch()
    const ImageData = useAppSelector(state=>state.imageDocument.imageMetaData)
    const {currentUser} = useAuth()
    const [searchInput, setSearchInput] = useState('')
    const [initialImageData, setInitialImagedata] = useState<ImageMetadata[]|any>()
 

    useEffect(() => {
        if (currentUser?.uid && searchInput ==='')  {
            dispatch(fetchImageMetadata(currentUser.uid));
        }
    }, [dispatch, currentUser, searchInput ]);


    useEffect(() => {
        if (ImageData) {
            setInitialImagedata(ImageData);
        }
    }, [ImageData]);


 

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
      
        setSearchInput(value)
        if (value === '') {
            dispatch(setImageData(initialImageData));
        } else {
            const filteredImages = filterByName(initialImageData, value);
            dispatch(setImageData(filteredImages));
        }

    }


  return (
    <div className=' bg-background p-6 lg:px-10  text-white shadow-sm border-b items-center  border-border-color'>
        <div className="flex lg:justify-between gap-6 items-center ">
            <div className=""> 
            <Link href={'/'}><Iconify icon='solar:gallery-wide-broken' className='text-4xl t' /></Link>
            </div>

        <div className="flex gap-3 px-2 items-center border-2 border-border-color rounded-xl p-2 lg:w-1/3 w-3/4">
            <input value={searchInput} onChange={(e:any)=>handleFilter(e)} type="text" placeholder='Search by name' className='w-11/12 bg-transparent outline-none pl-2'/>
            <div className="">
                <Iconify icon='heroicons-outline:search'/>
            </div>
        </div>
        
        
        <div className="flex gap-4">
        
            <button onClick={()=>{signOut(auth)
                sessionStorage.removeItem('user')}
            } className="flex items-center gap-1 duration-300 hover:text-theme" >
            <div className="">Logout</div>
                <Iconify icon='tabler:logout'/>
            </button>
        </div>
        </div>
        </div>
  )
}

export default Navbar