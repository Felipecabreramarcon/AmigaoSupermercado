"use client";
import { Button } from "@/app/components/forms/Button";
import { formatCurrencyText } from "@/app/helpers/formatCurrencyText";
import { Heart, Minus, Plus } from "lucide-react";
import { use, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export const ItemsRow = ({
  data,
  addToCart,
  onFavoriteClick,
  favoriteItems,
  setCartItems,
  setFavoriteItems,
}: any) => {
  const [itemQuant, setItemQuant] = useState<any>();

  useEffect(() => {
    if (data) {
      setItemQuant(
        data?.reduce((acc: any, el: any) => {
          acc = { ...acc, [el.id]: 1 };
          return acc;
        }, {})
      );
    }
  }, [data]);

  console.log(itemQuant);
  const moveToPageItem = (id: number) => {
    window.location.href = `/HomePage/${id}`;
  };
  const getGridColsClass = (length: number) => {
    switch (length) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      case 5:
        return "grid-cols-5";
      default:
        return "sm:grid-cols-3 2xl:grid-cols-6 ";
    }
  };

  useEffect(() => {
    if (data && itemQuant) {
      data.forEach((el: any) => {
        if (itemQuant[el.id] === "") {
          setItemQuant({ ...itemQuant, [el.id]: 1 });
        }
      });
    }
  }, [itemQuant]);

  const moreItemQuant = (id: number) => {
    setItemQuant((prev: any) => {
      return { ...prev, [id]: prev[id] + 1 };
    });
  };
  const lessItemQuant = (id: number) => {
    if (itemQuant[id] > 1) {
      setItemQuant((prev: any) => {
        return { ...prev, [id]: prev[id] - 1 };
      });
    }
  };

  const onChangeInputQuant = (e: any) => {
    setItemQuant((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  if (itemQuant)
    return (
      <div
        className={`w-full  m-auto h-auto grid ${getGridColsClass(
          data?.length
        )} gap-y-10  px-10`}
      >
        {data?.map((elem: any, index: number) => {
          return (
            <div
              className=" w-60 z-10 relative text-[--text-color2] bg-white border-4 border-[#203669] px-6 flex flex-col justify-center items-center place-self-center gap-5 h-[400px] pb-14 rounded-xl"
              key={index}
            >
              <div
                onClick={() =>
                  onFavoriteClick(elem, favoriteItems, setFavoriteItems)
                }
                className={`${
                  favoriteItems?.find((el: any) => el.id === elem.id)
                    ? "text-red-500 "
                    : "text-[--inputs-border]"
                } absolute w-8  pt-[2px]  hover:text-[--text-color] cursor-pointer transition-all flex    justify-center items-center h-8 top-1 right-1`}
              >
                {favoriteItems?.find((el: any) => el.id === elem.id) ? (
                  <AiFillHeart size={25} />
                ) : (
                  <AiOutlineHeart size={25} />
                )}
              </div>
              <img
                onClick={() => moveToPageItem(elem.id)}
                className="w-32 h-36 cursor-pointer"
                src={elem.img}
                alt=""
              />
              <div className=" z-0 w-full p-0.5 h-10 rounded border-[1px] border-[--inputs-border] flex justify-center items-center">
                <button
                  onClick={() => lessItemQuant(elem.id)}
                  className="h-full hover:text-black/75 hover:bg-[#e5e7eb] rounded-md border-[1px] border-transparent transition-all  text-[#e5e7eb]  w-full flex justify-center items-center"
                >
                  <Minus />
                </button>
                <input
                  value={itemQuant[elem.id]}
                  name={elem?.id}
                  onChange={(e) => onChangeInputQuant(e)}
                  className="w-full focus:outline-none text-center"
                />

                <button
                  onClick={() => moreItemQuant(elem.id)}
                  className="h-full z-40 hover:bg-[#e5e7eb] border-[1px] rounded-md border-transparent hover:text-black/75 transition-all text-[#e5e7eb] w-full flex justify-center items-center"
                >
                  <Plus />
                </button>
              </div>
              <span
                onClick={() => moveToPageItem(elem.id)}
                className="h-20 mb-7 cursor-pointer text-sm font-semibold  hover:underline"
              >
                {elem?.nome.length > 30
                  ? elem?.nome.slice(0, 30) + "..."
                  : elem?.nome}
              </span>
              <div className="absolute flex justify-center items-center flex-col bottom-14">
                {" "}
                <span className="text-lg  text-red-500  font-bold">
                  {elem.preco}
                </span>
                {itemQuant[elem.id] > 1 && (
                  <span className="text-xs text-[--text-color] font-semibold gap-2 flex justify-center items-center">
                    Valor total dos items:
                    <p className="text-xs font-bold ">
                      {" "}
                      {formatCurrencyText(
                        String(
                          (
                            Number(
                              elem.preco.replace(",", ".").replace("R$ ", "")
                            ) * itemQuant[elem.id]
                          ).toFixed(2)
                        )
                      )}
                    </p>
                  </span>
                )}
              </div>

              <button
                onClick={() =>
                  addToCart(elem, itemQuant[elem.id], setCartItems)
                }
                className="w-[102%] h-14 border-4 border-transparent rounded-xl border-t-[6px] hover:border-[#203669] hover:rounded-xl hover:rounded-t-none rounded-t-none transition-all duration-200  font-semibold text-white absolute bottom-[-2px] hover:bg-white hover:text-[#203669]  bg-[#203669] "
              >
                Adicionar ao carrinho
              </button>
            </div>
          );
        })}
      </div>
    );
};
