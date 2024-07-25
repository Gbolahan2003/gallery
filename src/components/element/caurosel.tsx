import React from 'react'
import Iconify from './icon'

const Courosel = () => {
  return (
    <div className='overflow-hdden relative flex items-center justify-center gap-4'>
       <div className="h-16 w-16 text-[3rem] rounded-full text-primary-text border-2 border-border-color flex justify-center items-center"> <Iconify icon='formkit:left' className=''/></div>
        <div className="">slides</div>
        <div className="h-16 w-16 text-[3rem] rounded-full text-primary-text border-2 border-border-color flex justify-center items-center"> <Iconify icon='formkit:right' className=''/></div>            
    </div>
  )
}

export default Courosel