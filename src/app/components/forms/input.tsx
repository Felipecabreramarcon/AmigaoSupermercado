"use client";

import { inputStyle } from "@/app/styles/inputStyle";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

interface InputProps {
  placeholder: string;
  label: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: any;
  errors: any;
}

export const Input = ({
  placeholder,
  label,
  type,
  required,
  value,
  onChange,
  errors,
}: InputProps) => {
  const [isViewPass, setIsViewPass] = useState(false);

  const onView = () => {
    setIsViewPass(!isViewPass);
  };

  return (
    <div className="w-full flex relative flex-col gap-2 justify-center items-center">
      <label className="w-[74%]">{label}</label>

      <input
        onChange={(e) => onChange(e.target.value, label)}
        required={required}
        type={type == "password" ? (isViewPass ? "text" : "password") : type}
        value={value}
        className={inputStyle()}
        placeholder={placeholder}
      />
      {errors && errors[label] && (
        <span className="text-red-500 top-20 absolute text-xs">
          {typeof errors[label] === "string"
            ? errors[label]
            : "Preencha Corretamente"}
        </span>
      )}
      {label == "senha" && (
        <div
          onClick={onView}
          className="absolute transition-all hover:text-black text-gray-300 top-10 right-28"
        >
          {isViewPass ? <EyeOffIcon /> : <EyeIcon />}
        </div>
      )}
    </div>
  );
};
