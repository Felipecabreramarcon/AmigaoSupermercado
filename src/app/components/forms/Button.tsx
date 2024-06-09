"use client";
import { Send } from "lucide-react";
import { buttonStyles } from "../../styles/buttonStyles";

interface ButtonProps {
  label: string;
  onClick?: any;
  style?: string;
  buttonStyleProps?: string;
  addToCart?: any;
  cartItem?: any;
  type?: any;
}

export const Button = ({
  type = "button",
  label,
  onClick,
  style = "default",
  buttonStyleProps,
  cartItem,
  addToCart,
}: ButtonProps) => {
  const buttonStyles = (style: string) => {
    if (style == "default")
      return "w-full px-4 h-12 rounded transition-all bg-[--button-color] font-semibold text-white";
    if (style == "outlined") {
      return "w-full h-12 text-lg text-[--button-color] font-semibold hover:text-white hover:bg-[--button-color] transition-all duration-500 border-2 border-[--button-color] rounded";
    }
    if (style == "texted")
      return "w-auto h-5 text-sm border-b-[1px] border-red-500";
    if (style == "addToCart")
      return "text-sm w-full h-12 text-white bg-green-700 rounded-[10px] hover:bg-green-500 hover:text-black  ";
  };

  return (
    <button
      type={type}
      onClick={(e) => {
        onClick && onClick(e);
        addToCart && addToCart(cartItem);
      }}
      className={`${buttonStyles(
        style
      )} ${buttonStyleProps} transition-all flex justify-center items-center flex-row gap-3`}
    >
      {label}
    </button>
  );
};
