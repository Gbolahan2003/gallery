import React, { FC, memo } from 'react';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Iconify from '../element/icon'; // Assuming this is an icon component
import { showItem } from '../utils';
import { useAppDispatch } from '@/app/redux/store';

interface Props {
  title: string;
  children: React.ReactNode;
  desc?: string;
  size?: "sm" | "md";
  pad?: string;
  onClose?: () => void; // Optional prop for closing the modal with a custom function
}

const CustomModal: FC<Props> = ({ title, children, desc, size = "md", pad, onClose }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    onClose?.(); // Call the custom onClose function if provided, otherwise dispatch showItem(null)
    dispatch(showItem(null));
  };

  return (
    <div className=" fixed top-0 left-0 w-full h-full overflow-y-auto z-50 bg-opacity-75 backdrop-blur-sm flex bg-black items-center justify-center">
      <motion.div
        className={`bg-background rounded-lg shadow-lg overflow-hidden relative  ${
          size === "sm" ? "md:w-3/4 lg:w-1/3 w-10/12" : "md:w-3/4 lg:w-1/2 w-10/12"
        }`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      >
        <div className={`flex justify-between items-center px-6 py-4 border-b border-gray-200`}>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-primary-text">{title}</h3>
            {desc && <p className="text-gray-500">{desc}</p>}
          </div>
          <button type="button" onClick={handleClose} className="text-gray-500 hover:text-primary-accent focus:outline-none">
            <FaTimes size={24} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
};

export default memo(CustomModal);
