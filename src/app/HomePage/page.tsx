"use client";
import React, { use, useEffect, useState } from "react";
import { Header } from "../components/header/header";
import { ItemsRow } from "./components/items/itemsRow";
import { CartScreen } from "./components/cart/cartscreen";
import { getItemsByGenre } from "../helpers/getItemsByGenre";
import { FavoritesScreen } from "./components/favorites/favoritesScreen";
import { addToCart, onFavoriteClick } from "../helpers/addToCart";
import { useGetStorageData } from "../helpers/useGetStorageData";

export default function HomePage() {
  const [isOpenFavorite, setIsOpenFavorite] = useState(false);
  const [gender, setGender] = useState("Todos os Produtos");
  const {
    loading,
    storageData: userData,
    setRefresh,
    favoriteItems,
    setFavoriteItems,
    cartItems,
    setCartItems,
  } = useGetStorageData();

  const [isCartOpen, setIsCartOpen] = useState(true);
  const [searchData, setSearchData] = useState<any>([]);
  const [method, setMethod] = useState("filtro");

  console.log(searchData);

  const genders = [
    "Todos os Produtos",
    "Alimentos Básicos",
    "Bebidas",
    "Doces",
    "HortiFruti",
    "Higiene e Beleza",
  ];

  return (
    <div
      className={` overflow-hidden text-black pt-64 min-h-screen flex flex-col justify-center items-center bg-[--background] relative h-screen w-screen`}
    >
      <Header
        favoriteItems={favoriteItems}
        setCartOpen={setIsCartOpen}
        searchData={searchData}
        setMethod={setMethod}
        setSearchData={setSearchData}
        setIsOpenFavorite={setIsOpenFavorite}
        cartItemsNumber={cartItems && cartItems.length}
      />
      <FavoritesScreen
        setIsOpenFavorite={setIsOpenFavorite}
        isOpenFavorite={isOpenFavorite}
        onFavoriteClick={onFavoriteClick}
        addToCart={addToCart}
        searchData={searchData}
        setCartItems={setCartItems}
        setFavoriteItems={setFavoriteItems}
        favoriteItems={favoriteItems}
      />
      <CartScreen
        setCartItems={setCartItems}
        data={cartItems}
        setRefresh={setRefresh}
        isOpen={isCartOpen}
        close={setIsCartOpen}
      />

      {!loading && searchData ? (
        <>
          {" "}
          <img
            className="w-[80%] h-[20vh]"
            src={
              "https://www.amigao.com/media/wysiwyg/banner-topo-home_473.jpg"
            }
          />{" "}
          <div className="w-full pl-24 flex pt-20  flex-row gap-10">
            <div className="w-[20%] h-[50vh]  justify-end items-end flex  ">
              <div className="h-full w-[80%] rounded bg-white px-5 py-5 flex gap-5 flex-col border-2 border-[--inputs-border]">
                <h1 className="text-xl text-center font-semibold mb-3 ">
                  Selecione a categoria
                </h1>
                {genders.map((el: any, index: number) => {
                  return (
                    <div
                      onClick={() => {
                        setGender(el);
                        setMethod("filtro");
                      }}
                      className={` ${
                        gender === el && method == "filtro"
                          ? "bg-[--button-color] text-white font-semibold"
                          : "bg-white hover:text-[--button-color] text-[--text-color2] border-[1px] "
                      }    h-20 cursor-pointer  flex  text-lg font-normal rounded justify-center items-center `}
                      key={index}
                    >
                      {el}
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className={`w-2/3 h-[80vh] ${
                isCartOpen ? "overflow-hidden pr-1" : "overflow-y-auto"
              }  flex justify-start items-start  `}
            >
              {searchData.lenght !== 0 && method == "search" ? (
                <ItemsRow
                  favoriteItems={favoriteItems || []}
                  onFavoriteClick={onFavoriteClick}
                  setFavoriteItems={setFavoriteItems}
                  data={searchData}
                  addToCart={addToCart}
                  setCartItems={setCartItems}
                />
              ) : (
                <ItemsRow
                  favoriteItems={favoriteItems || []}
                  onFavoriteClick={onFavoriteClick}
                  setFavoriteItems={setFavoriteItems}
                  data={getItemsByGenre(gender) || []}
                  addToCart={addToCart}
                  setCartItems={setCartItems}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="h-40 w-40 bg-transparent animate-[spin_1s_ease_infinite] border-8 rounded-full border-[--inputs-border] border-b-[--button-color]"></div>
      )}
    </div>
  );
}
