"use client";
import { CircleX, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FinalizationModal } from "../finalizationScreenModal/finalizationModalScreen";
import { useGetStorageData } from "@/app/helpers/useGetStorageData";

export const CartScreen = ({ data, isOpen, close, setCartItems }: any) => {
  const [isFinalizationOpen, setIsFinalizationOpen] = useState(false);

  const { setRefresh } = useGetStorageData();

  const lessQuant = (id: string) => {
    if (setCartItems) {
      setCartItems((prev: any) => {
        console.log(prev);

        const newData = prev?.map((el: any) => {
          if (String(el.id) === String(id) && el.quantity > 1) {
            return { ...el, quantity: el.quantity - 1 };
          } else return el;
        });
        console.log(newData);
        return newData;
      });
      if (setRefresh) {
        setRefresh(true);
      }
    }
  };
  const moreQuant = (id: string) => {
    if (setCartItems) {
      setCartItems((prev: any) => {
        const newData = prev?.map((el: any) => {
          if (String(el.id) === String(id)) {
            return { ...el, quantity: el.quantity + 1 };
          } else return el;
        });
        return newData;
      });
    }
    if (setRefresh) {
      setRefresh(true);
    }
  };

  const onChangeInputQuant = (e: any) => {
    setCartItems((prev: any) => {
      const newData = prev.map((el: any) => {
        if (String(el.id) === String(e.target.name)) {
          return { ...el, quantity: e.target.value };
        } else return el;
      });
      return newData;
    });
    if (setRefresh) {
      setRefresh(true);
    }
  };

  const excludeItem = (id: string) => {
    setCartItems((prev: any) => {
      return prev?.filter((elem: any) => String(elem?.id) !== String(id));
    });
    if (setRefresh) {
      setRefresh(true);
    }
  };
  // console.log(data);
  // console.log(filteredData);
  const totalValue =
    data &&
    data?.length > 0 &&
    " R$ " +
      String(
        data
          ?.reduce((acc: number, act: any) => {
            return (
              acc +
              Number(act.preco.replace("R$ ", "").replace(",", ".")) *
                Number(act.quantity)
            );
          }, 0)
          .toFixed(2)
      ).replace(".", ",");
  if (isOpen)
    return (
      <div
        className={`${isOpen ? "" : "hidden"} w-[30%] overflow-x-hidden  ${
          isFinalizationOpen ? "right-[150%]" : ""
        } h-screen fixed top-0 flex gap-7 flex-col justify-center items-center z-[25] right-0 bg-[--background] shadow-2xl`}
      >
        <FinalizationModal
          cartItems={data}
          setCartItems={setCartItems}
          setIsFinalizationOpen={setIsFinalizationOpen}
          isFinalizationOpen={isFinalizationOpen}
          close={close}
        />
        <div
          onClick={() => {
            close(false);
            document.body.style.overflowY = "unset";
          }}
          className="absolute top-3 right-4 cursor-pointer transition-all hover:text-red-500"
        >
          <CircleX size={30} />
        </div>
        <h1 className="text-3xl absolute top-5">Carrinho</h1>

        <div className="text-xl absolute bottom-28 flex gap-1 font-semibold">
          {data?.length > 0 && (
            <>
              <p>Valor total:</p> <p> {totalValue}</p>
            </>
          )}
        </div>
        {data?.length > 0 && (
          <button
            onClick={() => {
              setIsFinalizationOpen(true);
              document.body.style.overflowY = "hidden";
            }}
            className=" bg-white border-4 border-[#203669] duration-300 hover:bg-[#203669] hover:text-white transition-all  px-4 py-2 rounded-[10px]  text-[#203669] font-bold text-xl absolute bottom-10"
          >
            Finalizar Compra
          </button>
        )}
        <div className="flex h-[70vh] mb-10 box-border overflow-auto flex-col gap-3 justify-start py-2 items-center w-full">
          {data?.length === 0 && (
            <div className="flex relative flex-col m-auto justify-center items-center gap-12">
              <h1 className="text-4xl">Carrinho vazio</h1>
              <ShoppingCart size={100} />
              <div className="absolute top-18 flex justify-center items-center text-white text-sm  right-[50px] w-8 h-8 bg-red-500 rounded-full border-[1px] border-black">
                0
              </div>
            </div>
          )}
          {data?.map((elem: any, index: number) => {
            return (
              <div
                key={index}
                className="w-[70%] z-0 relative border-[--border-light] rounded border-2 py-6 px-4 justify-center items-center bg-white flex flex-row text-black h-60 "
              >
                <div
                  onClick={() => excludeItem(elem?.id)}
                  className="absolute cursor-pointer hover:text-red-600 transition-all text-[#203669] top-2 left-2"
                >
                  <Trash2 />
                </div>
                <img className="w-28 h-28" src={elem.img} alt="" />
                <div className="flex flex-col gap-4">
                  <span className="font-semibold">{elem?.nome}</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm gap-1  text-gray-600 flex">
                      Preço Unitario:{" "}
                      <p className="text-[#203669] font-semibold">
                        {elem.preco}
                      </p>
                    </span>
                    <span className="text-sm text-gray-600 flex gap-1">
                      Preço Total:{" "}
                      <p className="text-red-500 font-semibold">
                        {elem &&
                          "R$ " +
                            String(
                              (
                                Number(
                                  elem.preco
                                    .replace("R$ ", "")
                                    .replace(",", ".")
                                ) * elem.quantity
                              ).toFixed(2)
                            ).replace(".", ",")}
                      </p>
                    </span>
                  </div>
                  <div className=" z-0 w-3/4 p-0.5 h-10 rounded border-[1px] border-[--inputs-border] flex justify-center items-center">
                    <button
                      onClick={() => lessQuant(elem?.id)}
                      className="h-full hover:text-black/75 hover:bg-[#e5e7eb] rounded-md border-[1px] border-transparent transition-all  text-[#e5e7eb]  w-full flex justify-center items-center"
                    >
                      <Minus />
                    </button>
                    <input
                      value={elem?.quantity}
                      name={elem?.id}
                      onChange={(e) => onChangeInputQuant(e)}
                      className="w-full focus:outline-none text-center"
                    />

                    <button
                      onClick={() => moreQuant(elem?.id)}
                      className="h-full z-40 hover:bg-[#e5e7eb] border-[1px] rounded-md border-transparent hover:text-black/75 transition-all text-[#e5e7eb] w-full flex justify-center items-center"
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
};
