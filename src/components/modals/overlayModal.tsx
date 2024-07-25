'use client';
import React, { useEffect, useState } from 'react';
import CustomOverlay from './customOverlay';
import { useAuth } from '@/context/authContext';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import Image from 'next/image';
import { ImageMetadata } from '@/app/redux/imageDocuments/interface';
import Iconify from '../element/icon';
import { fetchImageMetadata } from '@/app/redux/imageDocuments/fetaures';
import { reverseArray } from '@/helper';

const OverlayModal = () => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const dispatch = useAppDispatch();
  const imageIndex = useAppSelector(state => state.utils.imageIndex);
  const images:any = useAppSelector(state => state.imageDocument.imageMetaData);


  
  const [currentIndex, setCurrentIndex] = useState(imageIndex);
  
  useEffect(() => {
    if (currentUser?.uid) {
      dispatch(fetchImageMetadata(currentUser.uid));
    }
  }, [dispatch, currentUser]);
  
  const imagedatas:ImageMetadata[] = reverseArray(images)
  
  const ImageData: ImageMetadata[] = imagedatas && imagedatas
  const currentImage: ImageMetadata | null = (ImageData && ImageData[currentIndex]) || null;

  useEffect(() => {
    if (currentImage) {
      setLoading(true);
    }
  }, [currentImage]);

  useEffect(() => {
    setCurrentIndex(imageIndex);
  }, [imageIndex]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + ImageData.length) % ImageData.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ImageData.length);
  };

  return (
    <CustomOverlay>
      {/* {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[40rem] h-[40rem] bg-gray-200 animate-pulse"></div>
        </div>
      )} */}
      {currentImage && (
        <div className="relative flex items-center justify-center gap-4 w-full h-full">
          <button
            className="h-16 w-20 text-[3rem] rounded-full text-primary-text border-2 border-border-color flex justify-center items-center"
            onClick={handlePrev}
          >
            <Iconify icon="formkit:left" />
          </button>
          <div className="w-full h-[40rem] max-h-screen flex items-center justify-center overflow-hidden relative">
            {ImageData.map((image, index) => (
              <div
                key={index}
                className={`absolute transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                style={{ width: '100%', height: '100%' }}
              >
                <Image
                  src={image.imageUrl}
                  alt={`Slide ${index}`}
                  layout="fill"
                  objectFit="contain"
                  onLoadingComplete={handleImageLoad}
                />            
              </div>
        //     <Image
        //     key={index}
        //     src={image.imageUrl}
        //     alt={`Slide ${index}`}
        //     layout="fill"
        //     objectFit="contain"
        //     className={`max-w-full max-h-full object-contain transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-100'}`}
        //     onLoadingComplete={handleImageLoad}
        //   />  
            ))}
          </div>
          <button
            className="h-16 w-20 text-[3rem] rounded-full text-primary-text border-2 border-border-color flex justify-center items-center"
            onClick={handleNext}
          >
            <Iconify icon="formkit:right" />
          </button>
        </div>
      )}
    </CustomOverlay>
  );
};

export default OverlayModal;
