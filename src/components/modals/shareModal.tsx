import React, { FC } from 'react'
import CustomModal from './customModal'
import Iconify from '../element/icon'
import { shareImage } from '../utils/interface'
import { toast } from 'sonner'



const ShareModal:FC<shareImage> = ({imageUrl, name, description}) => {

    const handleCopyText = () => {
        navigator.clipboard.writeText(imageUrl)
          .then(() => {
            toast('copied',{
                className:'bg-background  border-none w-20 h-0 rounded-2xl text-primary-text'
            })
          })
          .catch((error) => {
            console.error('Error copying text:', error);
          });
      };

      const body = `Hi,

      I would like to share the following image information with you:
      
      Image Name: ${name}
      Description: ${description}
      image URL:${imageUrl}
     `;
      
 
      const encodedBody = encodeURIComponent(body);
    
        // Encode the subject and body for use in the mailto URL
    
        const mailtoUrl = `mailto:?body=${encodedBody}`
      
  return (
    <CustomModal size='sm' title='Share'>
        <div className="p-4">
        <div className="">
            <p className='text-primary-text text-lg'>Share this link via</p>
            <div className="flex items-center lg:gap-5 gap-2 mt-2">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"

                className="h-14 w-14 flex justify-center items-center rounded-full border-2 border-border-color">
                    <Iconify icon='basil:facebook-solid' className='text-3xl text-[#1877F2]'/>
                </a>

             <a
             href={mailtoUrl} target="_blank" rel="noopener noreferrer"
              className="h-14 w-14 flex justify-center items-center rounded-full border-2 border-border-color gradient-instagram">
    <Iconify icon='mdi:email' className='text-3xl gradient-instagram text-[#ADD8E6]'/>
</a>
                <a
                   href={`https://wa.me/?text=${encodeURIComponent(`Check out this link: ${name} ${imageUrl}`)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                 className="h-14 w-14 flex justify-center items-center rounded-full border-2 border-border-color">
                    <Iconify icon='mdi:whatsapp' className='text-3xl text-[#25D366]'/>
                </a>
                <a
                 href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(imageUrl)}&title=${encodeURIComponent(name)}&summary=${encodeURIComponent(description)}&source=${encodeURIComponent(imageUrl)}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="h-14 w-14 flex justify-center items-center rounded-full border-2 border-border-color">
                    <Iconify icon='ri:linkedin-line' className='text-3xl text-[#0077B5]'/>
                </a>
                <a
                   href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(name)}&url=${encodeURIComponent(imageUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
    
                 className="h-14 w-14 flex justify-center items-center rounded-full border-2 border-border-color">
                    <Iconify icon='pajamas:twitter'  className='text-3xl'/>
                </a>
            </div>
            <div className="">
                <div className="w-10/12">
                   <div className="flex flex-col gap-1 mt-4">
                   <p className='text-primary-text text-lg'>Or copy link</p>
                    <div className="flex justify-between items-center  mt-2 border-2 border-border-color  pl-2  rounded-lg">
                        <div className="flex gap-2 items-center">
                        <Iconify icon='solar:link-outline' className='text-xl text-primary-text'/>
                        <p className='text-secondary-text'>{imageUrl.substring(0,30)}</p>
                        </div>
                        <button onClick={handleCopyText} className='bg-primary-accent p-2 px-3 rounded-r-lg'>Copy</button>
                    </div>
                   </div>
                </div>
            </div>
        </div>
        </div>
    </CustomModal>
  )
}

export default ShareModal