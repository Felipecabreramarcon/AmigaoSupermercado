import { inputStyle } from "@/app/styles/inputStyle";

interface InputProps {
  placeholder: string;
  label: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: any;
}

export const Input = ({
  placeholder,
  label,
  type,
  required,
  value,
  onChange,
}: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      <label className="w-[74%]">{label}</label>
      <input
        onChange={(e) => onChange(e.target.value, label)}
        required={required}
        type={type}
        value={value}
        className={inputStyle()}
        placeholder={placeholder}
      />
    </div>
  );
};
