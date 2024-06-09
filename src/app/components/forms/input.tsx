"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

interface InputProps {
  placeholder: string;
  label: string;
  type: string;
  errors: any;
  register?: any;
  fieldId: any;
}

export const Input = ({
  fieldId: { id, parent },
  placeholder,
  label,
  type,
  errors,
  register,
}: InputProps) => {
  const [isViewPass, setIsViewPass] = useState(false);

  console.log(errors);

  const onView = () => {
    setIsViewPass(!isViewPass);
  };

  return (
    <div className="w-full flex text-[--text-color] relative flex-col  justify-center items-center">
      <label className="w-full font-semibold text-base">{label} *</label>

      <input
        type={type == "password" ? (isViewPass ? "text" : "password") : type}
        {...register(parent + "." + id)}
        className={
          " w-full h-12 px-4  placeholder:text-base rounded  focus:outline-none  border-[1px] border-[--inputs-border] "
        }
        placeholder={placeholder}
      />
      {errors && errors[id] && (
        <span className="text-red-500 top-[73px]  right-0 absolute text-sm">
          {errors[id].message}
        </span>
      )}
      {type == "password" && (
        <div
          onClick={onView}
          className="absolute cursor-pointer transition-all hover:text-black text-gray-300 top-9 right-4"
        >
          {isViewPass ? <EyeOffIcon /> : <EyeIcon />}
        </div>
      )}
    </div>
  );
};
