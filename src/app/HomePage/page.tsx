"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../components/header/header";
import { ItemsRow } from "./components/items/itemsRow";
import { CartScreen } from "./components/cart/cartscreen";
import { getItemsByGenre } from "../helpers/getItemsByGenre";
import { FavoritesScreen } from "./components/favorites/favoritesScreen";
import { addToCart, onFavoriteClick } from "../helpers/addToCart";
import { useGetStorageData } from "../helpers/useGetStorageData";

export default function HomePage() {
  const [isOpenFavorite, setIsOpenFavorite] = useState(false);

  const {
    loading,
    storageData: userData,
    setRefresh,
    favoriteItems,
    setFavoriteItems,
    cartItems,
    setCartItems,
  } = useGetStorageData();
  console.log(userData);

  const [isCartOpen, setIsCartOpen] = useState(false);

  console.log(favoriteItems, "favItems");
  const genders = ["bebidas", "Alimentos Básicos"];

  return (
    <div
      className={` ${
        isCartOpen ? "overflow-hidden" : "overflow-y-auto"
      } text-black overflow-x-hidden pt-28 min-h-screen flex flex-col justify-center items-center bg-white relative h-auto w-screen`}
    >
      <Header
        favoriteItems={favoriteItems}
        setCartOpen={setIsCartOpen}
        setIsOpenFavorite={setIsOpenFavorite}
        cartItemsNumber={cartItems && cartItems.length}
      />
      <FavoritesScreen
        setIsOpenFavorite={setIsOpenFavorite}
        isOpenFavorite={isOpenFavorite}
        onFavoriteClick={onFavoriteClick}
        addToCart={addToCart}
        setCartItems={setCartItems}
        setFavoriteItems={setFavoriteItems}
        favoriteItems={favoriteItems}
      />
      <CartScreen
        setCartItems={setCartItems}
        data={cartItems}
        isOpen={isCartOpen}
        close={setIsCartOpen}
      />

      {!loading ? (
        <div className="w-full flex flex-col gap-10">
          {genders?.map((gender: string, index: number) => {
            return (
              <div key={index}>
                <h1 className="text-4xl text-center mb-4 mt-32 ">{gender}</h1>

                <div className="w-full  h-auto py-10  ">
                  <ItemsRow
                    favoriteItems={favoriteItems || []}
                    onFavoriteClick={onFavoriteClick}
                    setFavoriteItems={setFavoriteItems}
                    data={getItemsByGenre(gender) || []}
                    addToCart={addToCart}
                    setCartItems={setCartItems}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-40 w-40 bg-transparent animate-[spin_1s_ease_infinite] border-8 rounded-full border-[--inputs-border] border-b-[--button-color]"></div>
      )}
    </div>
  );
}
