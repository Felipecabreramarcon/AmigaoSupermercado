"use client";
import {
  ChevronLeft,
  ChevronRight,
  CircleX,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FinalizationModal } from "../finalizationScreenModal/finalizationModalScreen";

export const CartScreen = ({ data, isOpen, close, setCartItems }: any) => {
  const [itemQuant, setItemQuant] = useState<any>();
  const [isFinalizationOpen, setIsFinalizationOpen] = useState(false);

  useEffect(() => {
    const dataNames = data?.map((elem: any) => elem?.nome);

    const formatedData = data?.map((elem: any) => {
      const repeatItems = dataNames?.filter((name: any) => name === elem?.nome);
      return {
        elem,
        quant: repeatItems?.length,
      };
    });

    const filteredData = formatedData?.filter((elem: any, index: number) => {
      return (
        formatedData.findIndex(
          (el: any) => el.elem?.nome === elem.elem?.nome
        ) === index
      );
    });

    const quantObj: any = {};
    filteredData.forEach((elem: any) => {
      quantObj[elem.elem?.nome] = elem.quant;
    });

    setItemQuant(quantObj);
  }, [data]);

  let filteredData = data
    ?.map((elem: any) => {
      return elem;
    })
    ?.filter((elem: any, index: number, self: any[]) => {
      return self.findIndex((el: any) => el?.nome === elem?.nome) === index;
    });

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem("actualUser") as string);
    const storageData = JSON.parse(localStorage.getItem("User") as string);

    if (storageData && itemQuant) {
      const user = storageData?.find(
        (data: any) => data.email === actualUser.email
      );
      user.cart = [];
      filteredData.forEach((elem: any) => {
        for (let i = 0; i < itemQuant[elem?.nome]; i++) {
          user.cart.push(elem);
        }
      });
      // console.log(user.cart, "cart");
      const newUserData = storageData?.map((data: any) => {
        if (data.email === actualUser.email) {
          return user;
        }
        return data;
      });
      // console.log("to mandano o bagui", newUserData);
      localStorage.setItem("User", JSON.stringify(newUserData));
    }
  }, [data, itemQuant]);

  const lessQuant = (name: string) => {
    const newQuant =
      itemQuant[name] == 1 ? itemQuant[name] : Number(itemQuant[name]) - 1;
    const newQuantObj = { ...itemQuant, [name]: newQuant };
    setItemQuant(newQuantObj);
  };
  const moreQuant = (name: string) => {
    const newQuant = Number(itemQuant[name]) + 1;
    const newQuantObj = { ...itemQuant, [name]: newQuant };
    setItemQuant(newQuantObj);
  };

  const onChangeInputQuant = (e: any) => {
    const newQuantObj = { ...itemQuant, [e.target.name]: e.target.value };
    setItemQuant(newQuantObj);
  };

  const excludeItem = (name: string) => {
    setCartItems((prev: any) => {
      return prev?.filter((elem: any) => elem?.nome !== name);
    });
  };
  // console.log(data);
  // console.log(filteredData);
  const totalValue =
    itemQuant &&
    filteredData?.length > 0 &&
    Object?.keys(itemQuant)?.length > 0 &&
    " R$ " +
      String(
        filteredData
          ?.reduce((acc: number, act: any) => {
            return (
              acc +
              Number(act.preco.replace("R$ ", "").replace(",", ".")) *
                Number(itemQuant[act?.nome])
            );
          }, 0)
          .toFixed(2)
      ).replace(".", ",");
  if (isOpen)
    return (
      <div
        className={`${isOpen ? "" : "hidden"} w-1/4 overflow-x-hidden  ${
          isFinalizationOpen ? "right-[150%]" : ""
        } h-screen fixed top-0 flex gap-7 flex-col justify-center items-center z-[25] right-0 bg-slate-50 shadow-2xl`}
      >
        <FinalizationModal
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
        {filteredData?.length > 0 && (
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
          {filteredData?.map((elem: any, index: number) => {
            return (
              <div
                key={index}
                className="w-[70%] z-0 relative rounded-md border-[#203669] border-2 py-5 px-3 justify-center items-center bg-white flex flex-row text-black h-60 "
              >
                <div
                  onClick={() => excludeItem(elem?.nome)}
                  className="absolute cursor-pointer hover:text-red-600 transition-all text-[#203669] top-1 left-1"
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
                        {itemQuant &&
                          "R$ " +
                            String(
                              (
                                Number(
                                  elem.preco
                                    .replace("R$ ", "")
                                    .replace(",", ".")
                                ) * itemQuant[elem?.nome]
                              ).toFixed(2)
                            ).replace(".", ",")}
                      </p>
                    </span>
                  </div>
                  <div className=" z-0 w-3/4 h-10 py-1 px-1 rounded-md border-2 border-[#203669] flex justify-center items-center">
                    <button
                      onClick={() => lessQuant(elem?.nome)}
                      className="h-full hover:text-black/75 hover:bg-[#e5e7eb] rounded-md border-[1px] border-transparent transition-all  text-[#e5e7eb]  w-full flex justify-center items-center"
                    >
                      <Minus />
                    </button>
                    <input
                      value={itemQuant && itemQuant[elem?.nome]}
                      name={elem?.nome}
                      onChange={(e) => onChangeInputQuant(e)}
                      className="w-full focus:outline-none text-center"
                    />

                    <button
                      onClick={() => moreQuant(elem?.nome)}
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
