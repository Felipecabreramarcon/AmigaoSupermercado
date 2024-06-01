"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../components/header/header";
import { bebidas } from "../items/bebidas";
import { ItemsRow } from "./components/items/itemsRow";
import { Button } from "../components/forms/Button";
import { CartScreen } from "./components/cart/cartscreen";

export default function HomePage() {
  const [cartItemsNumber, setCartItemsNumber] = useState(0);
  const actualUser = JSON.parse(localStorage.getItem("actualUser") as string);

  const cartItemsFromLocal = () => {
    const storageData = JSON.parse(localStorage.getItem("User") as string);
    if (storageData) {
      const user = storageData.find(
        (data: any) => data.email === actualUser.email
      );
      if (user && user.cart) {
        return user.cart;
      }
    }
  };

  const [cartItems, setCartItems] = useState<any[]>(cartItemsFromLocal() || []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const bebidasData = bebidas();

  // console.log(cartItems);

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem("actualUser") as string);

    const cartItemsFromLocal = () => {
      const storageData = JSON.parse(localStorage.getItem("User") as string);
      if (storageData) {
        const user = storageData.find(
          (data: any) => data.email === actualUser.email
        );
        if (user && user.cart) {
          setCartItemsNumber(user.cart.length);
        }
      }
    };

    cartItemsFromLocal();
  }, []);

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem("actualUser") as string);
    const storageData = JSON.parse(localStorage.getItem("User") as string);

    if (storageData) {
      const newUserData = storageData.map((data: any) => {
        if (data.email === actualUser.email) {
          setCartItemsNumber(cartItems.length);
          return { ...data, cart: [...cartItems] };
        } else {
          return data;
        }
      });
      localStorage.setItem("User", JSON.stringify(newUserData));
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

  return (
    <div className="text-black overflow-x-hidden min-h-screen flex flex-col justify-center items-center bg-white relative h-auto w-screen">
      <Header setCartOpen={setIsCartOpen} cartItemsNumber={cartItemsNumber} />

      <CartScreen
        setCartItems={setCartItems}
        data={cartItems}
        isOpen={isCartOpen}
        close={() => {
          setIsCartOpen(false);
          document.body.style.overflow = "unset";
        }}
      />

      <h1 className="text-4xl mb-4 mt-32 ">Bebidas</h1>
      <div className="w-full shadow-xl h-auto py-10 bg-slate-500/50 ">
        <ItemsRow data={bebidasData} addToCart={addToCart} />
      </div>
    </div>
  );
}
