import { ErrorMessage, Field, useField, useFormikContext } from 'formik';
import React, { FC, useState } from 'react';

interface Props {
    name: string;
    label?: string;
    id?: string
}

const CustomCheckBox: FC<Props> = ({ name, label, id }) => {

    const [field] = useField({ name });
    const { setFieldValue } = useFormikContext();

    const handleChange = () => {
        setFieldValue(name, !field.value);
    };

    return (
        <div className='space-y-2'>
            <div className='flex gap-3 items-center'>
                <Field
                    id={id}
                    type='checkbox'
                    checked={field.value}
                    onChange={handleChange}
                    className="w-4 h-4 text-theme accent-theme bg-gray-100 border-gray-300 rounded focus:ring-theme"
                />
                {
                    label && (
                        <label htmlFor={id}>{label}</label>
                    )
                }
            </div>
            <ErrorMessage name={name} component="div" className='text-red-500 mini_sub_text' />
        </div>
    );
};

export default CustomCheckBox;
