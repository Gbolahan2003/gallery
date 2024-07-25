// components/Lightbox.js

import Image from "next/image";
import { FC } from "react";

interface  image{
    image:any,
    onClose:any
}
const Lightbox:FC<image> = ({ image, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="relative">
          <Image src={image.src} alt={image.alt} className="max-w-full max-h-full" />
          <button onClick={onClose} className="absolute top-2 right-2 text-white">Close</button>
        </div>
      </div>
    );
  };
  
  export default Lightbox;
  