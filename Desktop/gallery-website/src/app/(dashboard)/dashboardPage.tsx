'use client'
import ReactImage from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import image from '@/assets/images/background.jpg'
import Lightbox from '@/components/element/lightBox'
import { useAuth } from '@/context/authContext'
import { Button } from '@/components/element/button'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { setIsSubmitting, showItem } from '@/components/utils'
import ShowAllModals from '@/components/modals/showAllModals'
import { Form, Formik } from 'formik'
import CustomInput from '@/components/form/formik/customInput'
import * as Yup from 'yup'
import { addUserData, deleteImageData, fetchImageMetadata } from '../redux/imageDocuments/fetaures'
import Iconify from '@/components/element/icon'
import Navbar from '@/components/element/navbar'
import Images from './Images'
import DeleteModal from '@/components/modals/deleteModal'
import { batch } from 'react-redux'
import ShareModal from '@/components/modals/shareModal'
import ProgressBar from '@/components/element/progressBar'
import { getUser } from '../redux/auth/features'
import { ImageMetadata, imageData } from '../redux/imageDocuments/interface'
import { reverseArray } from '@/helper'


 const DashboardPage = () => {
     
       const {currentUser} = useAuth()

  const dispatch = useAppDispatch()
  const ImageDatas:any = useAppSelector(state=>state.imageDocument.imageMetaData)
  // const ImageData = useAppSelector(state=>state.imageDocument.imageMetaData)
  const show = useAppSelector(state=>state.utils.show)
  const deleteId = useAppSelector(state=>state.utils.deleteId)
  const userData= useAppSelector(state=>state.auth.UserData)
  const shareImage:any= useAppSelector(state=>state.utils.shareImage)



useEffect( ()=>{
  dispatch(getUser(currentUser.uid))
   dispatch(fetchImageMetadata(currentUser.uid))

},[dispatch, currentUser])
  
if(userData === null){
  return <ProgressBar/>
}



const handleDelete=async()=>{
  dispatch(setIsSubmitting(true))

  
  let deleted
   deleted = await dispatch(deleteImageData(currentUser.uid, deleteId))
  if(deleted){
    batch(async()=>{
     await dispatch(fetchImageMetadata(currentUser.uid))
    })
  }
 dispatch(setIsSubmitting(false))
  dispatch(showItem(null))

}




const ImageData:ImageMetadata[] =reverseArray(ImageDatas)



  return (
    <>
    {
        currentUser && (
       <div className='w-full'>
              <div className="w-full"><Navbar/></div>
            <div className={` bg-background min-h-screen text-primary-text px-8`}>
    <header className="p-4 flex lg:flex-row flex-col justify-between items-center mb-10">
      <h1 className="text-3xl font-bold">Welcome, {userData?.firstName}</h1>
      {/* <h1 className="text-secondary-text">Welcome to your gallery {users?.firstName}.</h1> */}
      <button
      onClick={()=>dispatch(showItem('AddImage'))}
        className="mt-4 p-2 px-4 bg-primary-accent text-primary-text rounded-lg"

      >
    Upload New Photo
      </button>
    </header>

<>
{ImageData?.length ? (
  <Images ImageData={ImageData} />
): <div className="flex flex-col items-center justify-center w-full h-64 text-center animate-pulse">
<Iconify icon="fluent:document-search-20-filled" className="text-[14rem] text-gray-400" />
<p className="text-gray-400 mt-4">No images found</p>
</div>}
</>
  </div>
       </div>
        )
    }
{show ==='deleteModal' && <DeleteModal  handleDelete={handleDelete}/>}

{show === 'ShareModal' && <ShareModal name={shareImage?.name} description={shareImage?.description} imageUrl={shareImage?.imageUrl}/>}

    <ShowAllModals/>
    </>
  )
}

export default DashboardPage
