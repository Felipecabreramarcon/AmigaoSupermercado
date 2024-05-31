"use client";
import {
  ChevronLeft,
  ChevronRight,
  CircleX,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

export const CartScreen = ({ data, isOpen, close, setCartItems }: any) => {
  const [itemQuant, setItemQuant] = useState<any>();

  useEffect(() => {
    const dataNames = data.map((elem: any) => elem.nome);

    const formatedData = data.map((elem: any) => {
      const repeatItems = dataNames.filter((name: any) => name === elem.nome);
      return {
        elem,
        quant: repeatItems.length,
      };
    });

    const filteredData = formatedData.filter((elem: any, index: number) => {
      return (
        formatedData.findIndex((el: any) => el.elem.nome === elem.elem.nome) ===
        index
      );
    });

    const quantObj: any = {};
    filteredData.forEach((elem: any) => {
      quantObj[elem.elem.nome] = elem.quant;
    });

    setItemQuant(quantObj);
  }, [data]);

  let filteredData = data
    .map((elem: any) => {
      return elem;
    })
    .filter((elem: any, index: number, self: any[]) => {
      return self.findIndex((el: any) => el.nome === elem.nome) === index;
    });

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

  console.log(itemQuant, filteredData);

  const onChangeInputQuant = (e: any) => {
    console.log(e.target.value);
    const newQuantObj = { ...itemQuant, [e.target.name]: e.target.value };
    setItemQuant(newQuantObj);
  };

  const excludeItem = (name: string) => {
    setCartItems((prev: any) => {
      return prev.filter((elem: any) => elem.nome !== name);
    });
  };

  const totalValue =
    filteredData.length > 0 &&
    Object.keys(itemQuant).length > 0 &&
    " R$ " +
      String(
        filteredData
          ?.reduce((acc: number, act: any) => {
            return (
              acc +
              Number(act.preco.replace("R$ ", "").replace(",", ".")) *
                Number(itemQuant[act.nome])
            );
          }, 0)
          .toFixed(2)
      ).replace(".", ",");

  return (
    <div
      className={`${
        isOpen ? "" : "hidden"
      } w-1/4   h-screen absolute top-0 flex gap-7 flex-col justify-center items-center  right-0 bg-slate-50 shadow-2xl`}
    >
      <div
        onClick={close}
        className="absolute top-3 right-4 cursor-pointer transition-all hover:text-red-500"
      >
        <CircleX size={30} />
      </div>
      <h1 className="text-3xl absolute top-5">Carrinho</h1>

      <div className="text-xl absolute bottom-28">Valor total:{totalValue}</div>

      <div className="flex h-[70vh] mb-10 box-border overflow-auto flex-col gap-3 justify-start py-2 items-center w-full">
        {filteredData.map((elem: any, index: number) => {
          return (
            <div
              key={index}
              className="w-[70%] relative rounded-md border-2 py-5 px-3 justify-center items-center bg-white flex flex-row text-black h-60 "
            >
              <div
                onClick={() => excludeItem(elem.nome)}
                className="absolute cursor-pointer hover:text-red-500 transition-all text-[#b5b6b6] top-1 left-1"
              >
                <Trash2 />
              </div>
              <img className="w-28 h-28" src={elem.img} alt="" />
              <div className="flex flex-col gap-4">
                <span>{elem.nome}</span>
                <span className="text-sm">Preço Unitario: {elem.preco}</span>
                <span className="text-sm">
                  Preço Total:{" "}
                  {itemQuant &&
                    "R$ " +
                      String(
                        (
                          Number(
                            elem.preco.replace("R$ ", "").replace(",", ".")
                          ) * itemQuant[elem.nome]
                        ).toFixed(2)
                      ).replace(".", ",")}
                </span>

                <div className=" w-3/4 h-10 py-1 px-1 rounded-md border-2 flex justify-center items-center">
                  <button
                    onClick={() => lessQuant(elem.nome)}
                    className="h-full hover:text-black/75 hover:bg-[#e5e7eb] rounded-md border-[1px] border-transparent transition-all  text-[#e5e7eb]  w-full flex justify-center items-center"
                  >
                    <Minus />
                  </button>
                  <input
                    value={itemQuant && itemQuant[elem.nome]}
                    name={elem.nome}
                    onChange={(e) => onChangeInputQuant(e)}
                    className="w-full text-center"
                  />

                  <button
                    onClick={() => moreQuant(elem.nome)}
                    className="h-full hover:bg-[#e5e7eb] border-[1px] rounded-md border-transparent hover:text-black/75 transition-all text-[#e5e7eb] w-full flex justify-center items-center"
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
