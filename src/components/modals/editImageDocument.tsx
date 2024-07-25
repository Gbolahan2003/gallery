'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactImage from 'next/image';
import CustomModal from './customModal';
import { Button } from '../element/button';
import { UploadImageProps } from '@/app/redux/imageDocuments/interface';
import { EditImage, fetchImageMetadata, getImageByID } from '@/app/redux/imageDocuments/fetaures';
import { useAuth } from '@/context/authContext';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { showItem } from '../utils';
import { batch } from 'react-redux';
import { openEditor } from 'react-profile';
import 'react-profile/themes/dark';

const UpdateImageModal: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const dispatch = useAppDispatch();
  const { currentUser } = useAuth();
  const imageId = useAppSelector((state) => state.utils.deleteId);
  
  useEffect(() => {
    if (currentUser?.uid && imageId) {
      dispatch(getImageByID(currentUser.uid, imageId));
    }
  }, [currentUser, imageId, dispatch]);

  const singleImage = useAppSelector((state) => state.imageDocument.singleImageData);

  useEffect(() => {
    if (singleImage?.imageUrl) {
      setImagePreview(singleImage.imageUrl);
    }
  }, [singleImage]);

  const readImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
        img.onerror = reject;
        img.src = event.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>|any) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    let editedFile = file;

    if (editImage) {
      const edited:any = await openEditor({ src: file, language: 'en' }) || null;
      editedFile = edited?.editedImage ? await dataURLtoFile(edited.editedImage.getDataURL(), file.name) : file;
    }

    formik.setFieldValue('image', editedFile);
    setImagePreview(URL.createObjectURL(editedFile));
  };

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr:any = dataurl.split(',');
    const mime = arr[0]?.match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const formik = useFormik<UploadImageProps>({
    initialValues: {
      name: singleImage?.name || '',
      description: singleImage?.description || '',
      image: singleImage?.imageUrl || null,
      height: singleImage?.height || 20,
      width: singleImage?.width || 20,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
      image: Yup.mixed().required('Image is required').nullable(),
    }),
    onSubmit: async (values: UploadImageProps) => {
      if (!values.image) return;

      setLoading(true);
      const { width, height } = await readImageDimensions(values.image as File);
      console.log(width, height);

      if (width && height) {
        const submitted = await dispatch(EditImage({
          ...values,
          width,
          height,
        }, currentUser.uid, imageId));

        if (submitted) {
          toast.success('Image Uploaded successfully');
          dispatch(showItem(null));
          batch(async () => {
            await dispatch(fetchImageMetadata(currentUser.uid));
          });
        }
        setLoading(false);
      }
    }
  });

  return (
    <CustomModal title="Edit image">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label htmlFor="image" className="text-white font-medium">Select Image:</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-500"
            onChange={handleImageChange}
          />
          <div className="flex items-center space-x-2 mt-2">
            <input
              id="editImage"
              name="editImage"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={editImage}
              onChange={() => setEditImage(!editImage)}
            />
            <label htmlFor="editImage" className="text-white">Edit Image</label>
          </div>
          {imagePreview && <ReactImage src={imagePreview} alt="Preview" width={300} height={300} className="mt-2 w-full h-48 object-cover rounded-md" />}
          {/* {formik.touched.image && formik.errors.image ? (
            <div className="text-red-500 text-sm">{formik?.errors?.image}</div>
          ) : null} */}
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="text-white font-medium">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-500"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="description" className="text-white font-medium">Description:</label>
          <textarea
            id="description"
            name="description"
            className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-500"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-sm">{formik.errors.description}</div>
          ) : null}
        </div>
        <div className="flex justify-end">
          <Button
            isLoading={loading}
            disabled={loading}
            size="lg"
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Upload
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default UpdateImageModal;
