'use client';
import Iconify from '@/components/element/icon';
import React, { useState } from 'react';
import ReactImage from 'next/image';
import { Tooltip } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setDeleteId, setImageIndex, setShareImage, showItem } from '@/components/utils';
import { ImageMetadata } from '../redux/imageDocuments/interface';
import DeleteModal from '@/components/modals/deleteModal';
import { deleteImageData } from '../redux/imageDocuments/fetaures';
import { useAuth } from '@/context/authContext';
import { shareImage } from '@/components/utils/interface';

interface ImageProps {
  ImageData: ImageMetadata[] | null;
}

const Images: React.FC<ImageProps> = ({ ImageData }) => {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.utils.show);
  const { currentUser } = useAuth();

  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

  const handleImageLoad = (index: number) => {
    setLoadingStates((prev) => ({ ...prev, [index]: false }));
  };

  const handleImageLoadStart = (index: number) => {
    setLoadingStates((prev) => ({ ...prev, [index]: true }));
  };

  

  return (
    <>
      <main className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ImageData?.length ? (
          ImageData.map((image, index) => {
            const imageDesc: shareImage = {
              imageUrl: image.imageUrl,
              name: image.name,
              description: image.description,
            };

            return (
              <div
                key={index}
                className={`relative hover:cursor-pointer bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
                  loadingStates[index] ? 'animate-pulse' : ''
                }`}
              >
                <div className="relative w-full image-container" style={{ paddingBottom: '100%', overflow: 'hidden' }}>
                  <ReactImage
                    src={image.imageUrl}
                    alt={image.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md image transition-opacity duration-300"
                    onLoadingComplete={() => handleImageLoad(index)}
                    onLoad={() => handleImageLoadStart(index)}
                  />
                  <div className="absolute inset-0 flex top-0 right-0 opacity-0 hover:opacity-100 transition-opacity duration-300 overlay">
                    <div className="">
                      <button
                        className="bg-red-600 hover:bg-red-800 text-white p-2 rounded-md m-2"
                        onClick={() => {
                          dispatch(setDeleteId(image.id)), dispatch(showItem('deleteModal'));
                        }}
                      >
                        <Tooltip content="Delete">
                          <Iconify icon="fluent:delete-24-regular" />
                        </Tooltip>
                      </button>
                      <button
                        className="bg-blue-600 text-white p-2 hover:bg-theme rounded-md m-2"
                        onClick={async () => {
                          await dispatch(setDeleteId(image.id), dispatch(showItem('UpdateImageModal')));
                        }}
                      >
                        <Tooltip content="Edit" className="4xl">
                          <Iconify icon="fluent:edit-28-filled" />
                        </Tooltip>
                      </button>
                      <button
                        className="bg-blue-600 text-white hover:bg-white p-2 rounded-md m-2 hover:text-black"
                        onClick={() => {
                          dispatch(setShareImage(imageDesc)), dispatch(showItem('ShareModal'));
                        }}
                      >
                        <Tooltip content="share">
                          <Iconify icon="fluent:share-24-filled" />
                        </Tooltip>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pr-6">
                  <div className="">
                    <h3 className="text-white font-semibold mt-2">{image.name}</h3>
                    <p className="text-gray-400">{image.description}</p>
                    <p className="text-gray-500 text-sm">{new Date(image.uploadedAt).toLocaleString()}</p>
                  </div>
                  <div className="">
                    <button
                    className='flex flex-col justify-center items-center gap-0'
                      onClick={() => {
                        dispatch(showItem('OverlayModal')), dispatch(setImageIndex(index));
                      }}
                    >
                      <Iconify icon="zondicons:view-show" className="text-2xl" />
                      <div>View</div>
                    </button>
                  </div>
                </div>
              </div>
            );
          } )              
        ) : (
         ''
        )}
      </main>
    </>
  );
};

export default Images;
