import React from 'react';

interface Props {
  value: number | string;
  label?: string;
  name?: string ;
  isRequired?: boolean;
}

const CustomReadOnlyDiv: React.FC<Props> = ({ value, name, label, isRequired, ...props }) => {
  return (
    <div className="space-y-1">
     {
        label && ( <label>
            {isRequired && <span className="text-red-600">*</span>} {label}
          </label>)
     }
      <div
      id={name}
        className="bg-[#FAFAFA] h-[2.5rem]  border border-solid border-[#F3F2F2] flex items-center rounded-lg"
      >
        <div className="pl-2 text-[0.8rem]">{value}</div>
      </div>
    </div>
  );
};

export default CustomReadOnlyDiv;
