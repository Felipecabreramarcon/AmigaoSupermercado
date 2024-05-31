"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export const Header = ({ cartItemsNumber, setCartOpen }: any) => {
  return (
    <div className="w-full shadow-xl text-black bg-white px-10 h-28 items-center absolute top-0 flex flex-row justify-between">
      <img
        className="w-24"
        src="https://www.amigao.com/media/logo/stores/1/logo-amigao.png"
      />
      <div
        onClick={() => {
          setCartOpen(true);
          document.body.style.overflow = "hidden";
        }}
        className="relative w-auto transition-all hover:scale-110 cursor-pointer mr-10"
      >
        <ShoppingCart size={50} />
        <span className="absolute flex justify-center items-center text-white text-sm  top-0 right-[-10px] w-6 h-6 bg-red-500 rounded-full border-[1px] border-black">
          {cartItemsNumber}
        </span>
        <span>Carrinho</span>
      </div>
    </div>
  );
};
