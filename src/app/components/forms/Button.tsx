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
}

export const Button = ({
  label,
  onClick,
  style = "default",
  buttonStyleProps,
  cartItem,
  addToCart,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={(e) =>
        (onClick && onClick(e)) || (addToCart && addToCart(cartItem))
      }
      className={`${buttonStyles(
        style
      )} ${buttonStyleProps} transition-all flex justify-center items-center flex-row gap-3`}
    >
      {label}
      {label == "Entrar" && <Send size={20} height={18} />}
    </button>
  );
};
