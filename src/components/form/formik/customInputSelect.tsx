// import { ErrorMessage, Field, useFormikContext } from 'formik'
// import React, { FC } from 'react'

// interface SelectOptions {
//     id: string | number,
//     name: string | number
// }

// interface Props {
//     label: string,
//     name: string,
//     isRequired?: boolean,
//     selectOptions: SelectOptions[] | undefined,
//     placeholder: string
//     defaultValue?: string | number,
//     handleOnChange?: (value: string | number) => void
// }


// const CustomInputSelect: FC<Props> = ({
//     label,
//     name,
//     isRequired,
//     selectOptions,
//     placeholder,
//     defaultValue,
//     handleOnChange,
//     ...props
// }) => {

//     const { setFieldValue } = useFormikContext();

//     return (
//         <div className='space-y-1'>
//             <label htmlFor={name}>{isRequired && <span className="text-red-600">*</span>}{label}</label>
//             <div className='relative'>
//                 <Field name={name} {...props}>
//                     {({ field }: any) => (
//                         <select
//                             className='input'
//                             value={field.value}
//                             placeholder={placeholder}
//                             defaultValue={defaultValue}
//                             onChange={(e) => {
//                                 setFieldValue(name, e.target.value);
//                                 if (handleOnChange) {
//                                     handleOnChange(e.target.value);
//                                 }
//                             }}
//                         >
//                             <option className='text-gray-200 text-sm' value="" >Select an option</option>
//                             {selectOptions && selectOptions.map((option: SelectOptions, index: any) => (
//                                 <option key={index} value={option.id}>
//                                     {option.name}
//                                 </option>
//                             ))}
//                         </select>
//                     )}
//                 </Field>
//             </div>
//             <ErrorMessage name={name} component="div" className='text-red-500 mini_sub_text' />
//         </div>
//     )
// }

// export default CustomInputSelect
import React from 'react'

const CustomInputSelect = () => {
  return (
    <div>CustomInputSelect</div>
  )
}

export default CustomInputSelect