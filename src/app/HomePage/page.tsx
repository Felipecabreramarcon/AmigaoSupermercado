"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../components/header/header";
import { bebidas } from "../items/bebidas";
import { ItemsRow } from "./components/items/itemsRow";
import { CartScreen } from "./components/cart/cartscreen";
import { getItemsByGenre } from "../helpers/getItemsByGenre";
import { FavoritesScreen } from "./components/favorites/favoritesScreen";

export default function HomePage() {
  const [cartItemsNumber, setCartItemsNumber] = useState(0);
  const [isOpenFavorite, setIsOpenFavorite] = useState(false);

  const actualUser = JSON.parse(
    window?.localStorage.getItem("actualUser") as string
  );

  const cartItemsFromLocal = () => {
    const storageData = JSON.parse(
      window?.localStorage.getItem("User") as string
    );
    if (storageData) {
      const user = storageData.find(
        (data: any) => data.email === actualUser.email
      );
      if (user && user.cart) {
        return user.cart;
      }
    }
  };
  const favoritesFromLocal = () => {
    const storageData = JSON.parse(
      window?.localStorage.getItem("User") as string
    );
    if (storageData) {
      const user = storageData.find(
        (data: any) => data.email === actualUser.email
      );
      if (user && user.favorites) {
        return user.favorites;
      } else if (user && !user.favorites) {
        user.favorites = [];
        const newStorageData = storageData.map((data: any) => {
          if (data.email === actualUser.email) {
            return { ...user, favorites: [] };
          } else {
            return data;
          }
        });
        window?.localStorage.setItem("User", JSON.stringify(newStorageData));
        return [];
      }
    }
  };

  const [favoriteItems, setFavoriteItems] = useState<any[]>(
    favoritesFromLocal()
  );

  useEffect(() => {
    const addFavoriteToLocal = () => {
      const storageData = JSON.parse(
        window?.localStorage.getItem("User") as string
      );
      if (storageData) {
        const newStorageData = storageData.map((data: any) => {
          if (data.email === actualUser.email) {
            return { ...data, favorites: favoriteItems };
          } else {
            return data;
          }
        });
        window?.localStorage.setItem("User", JSON.stringify(newStorageData));
      }
    };
    addFavoriteToLocal();
  }, [favoriteItems]);

  const onFavoriteClick = (item: any) => {
    console.log("entrou");
    if (item && favoriteItems.find((el: any) => el.id === item.id)) {
      console.log("entrou if1");
      setFavoriteItems((prev: any) => {
        return prev.filter((el: any) => el.id !== item.id);
      });
    } else if (item && !favoriteItems.find((el: any) => el.id === item.id)) {
      console.log("entrou if2");
      setFavoriteItems((prev: any) => {
        return [...prev, item];
      });
    }
  };

  const [cartItems, setCartItems] = useState<any[]>(cartItemsFromLocal() || []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // console.log(cartItems);

  useEffect(() => {
    const actualUser = JSON.parse(
      window?.localStorage.getItem("actualUser") as string
    );

    const cartItemsFromLocalLength = () => {
      const storageData = JSON.parse(
        window?.localStorage.getItem("User") as string
      );
      if (storageData) {
        const user = storageData.find(
          (data: any) => data.email === actualUser.email
        );
        if (user && user.cart) {
          setCartItemsNumber(user.cart.length);
        }
      }
    };

    cartItemsFromLocalLength();
  }, []);

  useEffect(() => {
    const actualUser = JSON.parse(
      window?.localStorage.getItem("actualUser") as string
    );
    const storageData = JSON.parse(
      window?.localStorage.getItem("User") as string
    );

    if (storageData) {
      const newUserData = storageData.map((data: any) => {
        if (data.email === actualUser.email) {
          setCartItemsNumber(cartItems.length);
          return { ...data, cart: [...cartItems] };
        } else {
          return data;
        }
      });
      window?.localStorage.setItem("User", JSON.stringify(newUserData));
    }
  }, [cartItems]);

  const addToCart = (item: any) => {
    if (item) {
      setCartItems((prev: any) => {
        return [...prev, item];
      });
      setCartItemsNumber(cartItemsNumber + 1);
    }
  };
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
        cartItemsNumber={cartItemsNumber}
      />
      <FavoritesScreen
        setIsOpenFavorite={setIsOpenFavorite}
        isOpenFavorite={isOpenFavorite}
        onFavoriteClick={onFavoriteClick}
        addToCart={addToCart}
        favoriteItems={favoriteItems}
      />
      <CartScreen
        setCartItems={setCartItems}
        data={cartItems}
        isOpen={isCartOpen}
        close={() => {
          setIsCartOpen(false);
          document.body.style.overflow = "unset";
        }}
      />

      <div className="w-full flex flex-col gap-10">
        {genders.map((gender: string, index: number) => {
          return (
            <>
              <h1 className="text-4xl text-center mb-4 mt-32 ">{gender}</h1>

              <div
                key={index}
                className="w-full shadow-xl h-auto py-10 bg-slate-500/50 "
              >
                <ItemsRow
                  favoriteItems={favoriteItems}
                  onFavoriteClick={onFavoriteClick}
                  data={getItemsByGenre(gender)}
                  addToCart={addToCart}
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
