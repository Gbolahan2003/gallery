import React,{useEffect}  from "react";
import Select from "react-select";
import { Field, ErrorMessage, useField, useFormikContext } from "formik";
// import { colorStyles } from "@/app/helper";
import { useAppDispatch } from "@/app/redux/store";
import { useSession } from "next-auth/react";
interface SelectProps {
  label: string;
  name: string;
  placeholder?: string;
  isMulti?: boolean;
  options: { value: string | number; label: string }[] | undefined;
  isRequired?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  iFselected?:(e:any)=> void;
  

}

const CustomSelect: React.FC<SelectProps> = ({
  label,
  name,
  options,
  isRequired,
  defaultValue,
  placeholder,
  disabled,
  iFselected,
  isMulti
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const dispatch = useAppDispatch()
  const { data: session, status } = useSession()
  const selectedOption = options?.find((option) => option.value === field.value);




  const handleSelectChange = (selectedOption: any) => {
    if (selectedOption) {
      if (isMulti) {
        setFieldValue(name, selectedOption.map((each: { value: string, label: string }) => each.value))
      
      } else {
        setFieldValue(name, selectedOption.value);
        if (iFselected){
          iFselected(selectedOption)
        }
      }
    } else {
      setFieldValue(name, '')
    }
  


  };


  return (
    <div  className="space-y-1">
      <label htmlFor={name}>
        {isRequired && <span className="text-red-600">*</span>}
        {label}
      </label>
      <Select
        {...field}
        isMulti={isMulti}
        options={options}
        // styles={colorStyles}
        isDisabled={disabled}
        value={selectedOption}
        defaultValue={defaultValue}
        placeholder={placeholder}
        isClearable
        onChange={(value) => handleSelectChange(value)}
        className="text-sm w-full"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 mini_sub_text"
      />
    </div>
  );
};

export default CustomSelect;
