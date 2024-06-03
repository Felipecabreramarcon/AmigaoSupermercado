"use client";
import { Header } from "@/app/components/header/header";
import { getItemById } from "@/app/helpers/getItemById";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";

const ItemPage = () => {
  const { id } = useParams();

  const itemData = getItemById(Number(id));
  const backToHome = () => {
    window.location.href = "/HomePage";
  };

  //   console.log(itemData);
  if (itemData) {
    return (
      <div className="text-black relative h-screen bg-slate-100 flex flex-col justify-center items-center">
        {/* <Header /> */}
        <div
          onClick={backToHome}
          className="w-40 text-xl bg-white hover:text-white transition-all duration-200 hover:bg-[#203669] font-bold text-[#203669] absolute top-8 gap-2 border-4 border-[#203669] h-14 left-8 cursor-pointer rounded-[10px] flex justify-center items-center "
        >
          Voltar
          <ArrowLeft size={30} />
        </div>
        <div className="w-[60%] h-[35%] flex justify-center  gap-3">
          <div className="w-4/5 bg-white flex justify-center items-center h-full border-2 rounded-lg border-[#203669]">
            <div className="h-full w-[35%] py-5 px-5">
              <div className="p-2 border-[1px] py-2 rounded-[10px]">
                <img src={itemData.img} alt="" />{" "}
              </div>
            </div>
            <div className="h-full w-3/4 flex flex-col py-5 gap-2 pr-8">
              <h1 className="text-xl text-gray-600 font-semibold mb-4">
                {itemData.nome}
              </h1>
              <p className="text-base text-gray-300 mb-1">
                Código: {itemData.id}
              </p>

              <p className="text-sm">{itemData.desc}</p>
            </div>
          </div>
          <div className="w-2/5 bg-white h-[76%] gap-3 pt-14 flex flex-col justify-start items-center border-2 relative rounded-lg border-[#203669]">
            <span className="absolute  top-4 left-10 text-red-600 font-bold text-2xl">
              {itemData.preco}{" "}
            </span>
            <div className="w-[80%] flex text-sm text-[#203669] font-semibold justify-center items-center border-2 border-[#203669] h-10 rounded-[5px]">
              Unidade
            </div>
            <div className="w-[80%] mb-4 flex text-sm text-[#203669] font-semibold justify-between items-center border-[1px] border-gray-200 h-10 rounded-[5px]">
              <p className="h-full w-10 flex justify-center items-center text-2xl">
                -
              </p>
              <p className="h-full w-10 flex justify-center items-center text-2xl">
                2
              </p>
              <p className="h-full w-10 flex justify-center items-center text-2xl">
                +
              </p>
            </div>
            <button className="w-[80%] gap-2 flex text-sm text-white font-semibold justify-center items-center  bg-[#2f257f]  h-12 rounded-[5px]">
              <ShoppingCart size={20} /> Adicionar
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default ItemPage;
