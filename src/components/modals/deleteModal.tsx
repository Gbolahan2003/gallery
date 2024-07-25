'use client'
import { useAppDispatch, useAppSelector } from '@/app/redux/store'
import { AnimatePresence } from 'framer-motion'
import React, { FC, memo } from 'react'
import Iconify from '../element/icon'
import { Button } from '../element/button'
import { showItem } from '../utils'
import CustomActionModal from './customActionModal'



interface Props {
    handleDelete: (data: any) => void,
}

const DeleteModal: FC<Props> = ({ handleDelete }) => {

    const dispatch = useAppDispatch()
    const { deleteId, isSubmitting } = useAppSelector(state => state.utils)

    return (
        <CustomActionModal>
            <AnimatePresence>
                <div className='lg:w-1/3 mx-auto bg-background p-12 rounded-2xl'>
                    <div className='space-y-6'>
                        <Iconify icon='uil:exclamation-circle' className='text-8xl text-center mx-auto text-yellow-400' />
                        <div className='text-center'>
                            <h1 className='card_header text-primary-text'>Are you Sure?</h1>
                            <p className='subtitles text-primary-text'>This action can not be revert. Do you want to continue?</p>
                        </div>
                        <div className='flex gap-6 justify-center'>
                            <Button onClick={() => handleDelete(deleteId)} isLoading={isSubmitting} disabled={isSubmitting} variant='danger'>Yes, Delete it!</Button>
                            {
                                !isSubmitting && (
                                    <Button onClick={() => dispatch(showItem(null))}>No</Button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </AnimatePresence>
        </CustomActionModal>
    )
}

export default memo(DeleteModal) 