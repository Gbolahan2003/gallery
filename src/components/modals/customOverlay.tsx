import React, { FC, memo } from 'react';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/app/redux/store';
import { showItem } from '../utils';

interface Props {
  title?: string;
  children: React.ReactNode;
  desc?: string;
  size?: "sm" | "md";
  pad?: string;
  onClose?: () => void; // Optional prop for closing the modal with a custom function
}

const CustomOverlay: FC<Props> = ({ title, children, desc, size = "md", pad, onClose }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    onClose?.(); // Call the custom onClose function if provided, otherwise dispatch showItem(null)
    dispatch(showItem(null));
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-y-auto z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm pt-10">
      <div className="absolute right-0 top-0 p-10">
        <button type="button" onClick={handleClose} className="text-gray-500 hover:text-primary-accent focus:outline-none">
          <FaTimes size={24} />
        </button>
      </div>
      <motion.div
        className={`relative flex flex-col justify-center items-center shadow-lg overflow-hidden py-10 ${
          size === "sm" ? "w-3/4 md:w-1/2 lg:w-1/3" : "w-3/4 md:w-3/4 lg:w-2/3"
        }`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      >
        {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
        {desc && <p className="text-lg mb-4">{desc}</p>}
        <div className={`flex justify-between items-center w-full h-full ${pad ? pad : 'px-4'}`}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default memo(CustomOverlay);
