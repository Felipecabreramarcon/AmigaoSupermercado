"use client";

import { searchItem } from "@/app/items/searchItem";
import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";

export const Header = ({
  cartItemsNumber,
  setCartOpen,
  favoriteItems,
  setIsOpenFavorite,
  setSearchData,
  searchData,
  setMethod,
}: any) => {
  const [inputSearch, setInputSearch] = useState<any>("");
  console.log(searchData);
  const search = () => {
    if (inputSearch !== "") {
      setSearchData(searchItem(inputSearch));
      setMethod("search");
    }
  };

  if (typeof window !== undefined) {
    window.document.body.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && inputSearch !== "") {
        search();
      }
    });
  }

  return (
    <div className="w-screen z-[24] overflow-x-hidden shadow-xl text-black bg-white px-10 h-28 items-center fixed top-0 flex flex-row justify-between">
      <img
        className="w-24"
        src="https://www.amigao.com/media/logo/stores/1/logo-amigao.png"
      />
      <div className="w-full h-full flex justify-center items-center">
        <input
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          placeholder="Deseja pesquisar por um produto?"
          className="w-1/2 rounded-l-md h-12 focus:outline-none text-sm py-1 px-2 border-2 border-r-0 border-[--inputs-border] "
          type="text"
        />
        <div
          onClick={search}
          className=" rounded-r w-20 h-12 flex justify-center items-center text-white bg-[--button-color]"
        >
          <Search />
        </div>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div
          onClick={() => {
            if (favoriteItems?.length > 0) {
              setIsOpenFavorite(true);
              document.body.style.overflowY = "hidden";
            }
          }}
          className="w-auto flex justify-center items-center flex-col  transition-all relative cursor-pointer"
        >
          <div className="absolute flex justify-center items-center text-white text-sm  top-0 right-[-10px] w-6 h-6 bg-red-500 rounded-full border-[1px] border-black">
            {favoriteItems?.length}
          </div>
          <AiOutlineHeart size={50} />
          <span>Favoritos</span>
        </div>

        <div
          onClick={() => {
            setCartOpen(true);
            document.body.style.overflowY = "hidden";
          }}
          className="relative w-auto flex flex-col justify-center items-center transition-all hover:scale-110 cursor-pointer mr-10"
        >
          <ShoppingCart size={50} />
          <div className="absolute  flex justify-center items-center text-white text-sm  top-0 right-[-10px] w-6 h-6 bg-red-500 rounded-full border-[1px] border-black">
            {cartItemsNumber}
          </div>
          <span className="ml-1">Carrinho</span>
        </div>
      </div>
    </div>
  );
};
