"use client";
import { Header } from "@/app/components/header/header";
import { addToCart, onFavoriteClick } from "@/app/helpers/addToCart";
import { formatCurrencyText } from "@/app/helpers/formatCurrencyText";
import { getItemById } from "@/app/helpers/getItemById";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FavoritesScreen } from "../components/favorites/favoritesScreen";
import { CartScreen } from "../components/cart/cartscreen";
import { useIsInCart } from "@/app/helpers/useIsInCart";
import { useGetStorageData } from "@/app/helpers/useGetStorageData";

const ItemPage = () => {
  const [itemQuant, setItemQuant] = useState<any>(1);
  const { id } = useParams();
  const [isOpenFavorite, setIsOpenFavorite] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);

  const {
    storageData: localData,
    loading: loadingData,
    setRefresh: refreshData,
    favoriteItems,
    setFavoriteItems,
    cartItems,
    setCartItems,
  } = useGetStorageData();

  useEffect(() => {
    if (itemQuant == "") {
      setItemQuant(1);
    }
  }, [itemQuant]);

  const itemData = getItemById(Number(id));

  const backToHome = () => {
    window.location.href = "/HomePage";
  };

  const moreItemQuant = () => {
    setItemQuant(itemQuant + 1);
  };
  const lessItemQuant = () => {
    if (itemQuant > 1) {
      setItemQuant(itemQuant - 1);
    }
  };

  const onChangeInputQuant = (e: any) => {
    setItemQuant(e.target.value);
  };

  const totalValue = () => {
    const preco = Number(itemData.preco.replace("R$", "").replace(",", "."));
    return formatCurrencyText(String((preco * itemQuant).toFixed(2)));
  };
  const totalValueInCart = () => {
    const preco = Number(itemData.preco.replace("R$", "").replace(",", "."));
    return formatCurrencyText(
      String((preco * (itemQuant + isPresent)).toFixed(2))
    );
  };
  const [isPresent, setQuantity] = useState<any>(false);
  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("User") as string);
    if (storageData) {
      const actualUser = JSON.parse(
        localStorage.getItem("actualUser") as string
      );
      const userData = storageData.find(
        (el: any) => el.email === actualUser.email
      );
      console.log(userData);
      console.log(id);
      const item = userData?.cart.find((el: any) => el?.id === Number(id));
      console.log("item", item);
      if (item) {
        setQuantity(item.quantity);
      } else {
        setQuantity(0);
      }
    }
  }, []);

  const isPresentText = () => {
    if (isPresent) {
      return (
        <p className="text-base text-yellow-500 absolute bottom-2  ">
          Item já adicionado ao carrinho! Presente com {isPresent}{" "}
          {isPresent == 1 ? "Unidade." : "Unidades."}
        </p>
      );
    } else
      return (
        <p className="text-base  text-yellow-500 absolute bottom-2">
          Item não adicionado ao carrinho!
        </p>
      );
  };
  console.log(localData);
  if (itemData) {
    return (
      <div className="text-[--text-color2] relative h-screen bg-[--background] flex flex-col justify-center items-center">
        {/* <Header /> */}
        <div
          onClick={backToHome}
          className="w-40 text-xl bg-white hover:text-white transition-all duration-200 hover:bg-[#203669] font-bold text-[#203669] absolute top-36 gap-2 border-4 border-[#203669] h-14 left-8 cursor-pointer rounded-[10px] flex justify-center items-center "
        >
          Voltar
          <ArrowLeft size={30} />
        </div>
        <Header
          favoriteItems={favoriteItems}
          setCartOpen={setIsOpenCart}
          isPageId={true}
          setIsOpenFavorite={setIsOpenFavorite}
          cartItemsNumber={cartItems && cartItems.length}
        />
        <FavoritesScreen
          setIsOpenFavorite={setIsOpenFavorite}
          isOpenFavorite={isOpenFavorite}
          onFavoriteClick={onFavoriteClick}
          setFavoriteItems={setFavoriteItems}
          addToCart={addToCart}
          favoriteItems={favoriteItems}
        />
        <CartScreen
          setCartItems={setCartItems}
          data={cartItems}
          isOpen={isOpenCart}
          close={setIsOpenCart}
        />
        {!loadingData ? (
          <div className="w-[70%] h-[40%] flex justify-center  gap-3">
            <div className="w-4/5 bg-white flex justify-center items-center  border-2 rounded border-[--inputs-border]">
              <div className="h-full w-[35%] py-5 px-5">
                <div className="p-2 border-[1px] py-2 rounded">
                  {<img src={itemData.img} alt="" />}{" "}
                </div>
              </div>
              <div className="h-full w-3/4 relative flex flex-col py-5 gap-2 pr-8">
                <h1 className="text-[20px] text-black/70 font-semibold mb-4">
                  {itemData?.nome}
                </h1>
                <p className="text-base text-gray-300 ">
                  Código: {itemData.id}
                </p>
                <p className="text-[18px] text-[--text-dark] font-normal">
                  Categoria: {itemData.categoria}
                </p>

                <p className="text-[15px] text-[--text-dark] font-normal">
                  {itemData.desc}
                </p>
                {isPresentText()}
              </div>
            </div>
            <div className="w-2/5 bg-white  gap-3 pt-20 pb-5 flex flex-col justify-start items-center border-2 relative rounded border-[--inputs-border]">
              <span className="absolute  top-8 left-10 text-red-600 font-bold text-2xl">
                {itemData.preco}{" "}
              </span>
              <div className="w-[80%] flex text-sm text-[#203669] font-semibold justify-center items-center border-2 border-[#203669] h-12 rounded-[5px]">
                Unidade
              </div>
              <div className="w-full flex flex-col justify-center items-center mb-4">
                <div className="w-[80%] px-2 py-0.5 flex rounded-b-none text-sm text-[#203669] font-semibold justify-between items-center border-[1px] border-gray-200 h-12 rounded-[5px]">
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      lessItemQuant();
                    }}
                    className="h-full w-14 cursor-pointer transition-all hover:bg-[--border-light] rounded flex justify-center items-center text-2xl"
                  >
                    <Minus />
                  </p>
                  <input
                    value={itemQuant}
                    onChange={(e) => onChangeInputQuant(e)}
                    className="h-full w-full focus:outline-none text-center flex justify-center items-center text-xl"
                  />

                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      moreItemQuant();
                    }}
                    className="h-full w-14 cursor-pointer transition-all hover:bg-[--border-light] rounded flex justify-center items-center text-2xl"
                  >
                    <Plus />
                  </p>
                </div>
                <div className="w-[80%] text-center px-2 text-sm py-0.5 border-t-0 rounded rounded-t-none border-[1px] border-gray-200 ">
                  Valor Total dos Items: {totalValue()}
                </div>
              </div>
              <button
                onClick={() => {
                  addToCart(itemData, Number(itemQuant), setCartItems);
                  setItemQuant(1);
                }}
                className="w-[80%] gap-2 flex text-sm text-white font-semibold justify-center items-center  bg-[#2f257f] h-14 rounded-[5px]"
              >
                <ShoppingCart size={20} /> Adicionar
              </button>
              <span>
                Valor total do produto após a adição: {totalValueInCart()}
              </span>
            </div>
          </div>
        ) : (
          <div className="h-40 w-40 bg-transparent animate-[spin_1s_ease_infinite] border-8 rounded-full border-[--inputs-border] border-b-[--button-color]"></div>
        )}
      </div>
    );
  }
};
export default ItemPage;
