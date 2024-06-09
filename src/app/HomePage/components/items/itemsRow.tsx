import { Button } from "@/app/components/forms/Button";
import { Heart } from "lucide-react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export const ItemsRow = ({
  data,
  addToCart,
  onFavoriteClick,
  favoriteItems,
}: any) => {
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
  return (
    <div
      className={`w-full  m-auto h-auto grid ${getGridColsClass(
        data?.length
      )} gap-y-10  px-10`}
    >
      {data?.map((elem: any, index: number) => {
        return (
          <div
            className=" w-60 z-10  relative bg-white border-4 border-[#203669] px-6 flex flex-col justify-center items-center place-self-center gap-5 h-[350px] pb-14 rounded-xl"
            key={index}
          >
            <div
              onClick={() => onFavoriteClick(elem)}
              className={`${
                favoriteItems?.find((el: any) => el.id === elem.id)
                  ? "text-red-500 border-black"
                  : "border-gray-100"
              } absolute w-10 text-gray-300 pt-[2px] hover:border-black hover:text-black cursor-pointer transition-all flex border-2 rounded-full  justify-center items-center h-10 top-1 right-1`}
            >
              {favoriteItems?.find((el: any) => el.id === elem.id) ? (
                <AiFillHeart size={30} />
              ) : (
                <AiOutlineHeart size={30} />
              )}
            </div>
            <img
              onClick={() => moveToPageItem(elem.id)}
              className="w-32 cursor-pointer"
              src={elem.img}
              alt=""
            />
            <span
              onClick={() => moveToPageItem(elem.id)}
              className="h-auto mb-7 cursor-pointer text-sm text-gray-500 font-semibold  hover:underline"
            >
              {elem?.nome}
            </span>
            <span className="text-lg absolute text-red-500 bottom-14 font-bold">
              {elem.preco}
            </span>
            <button
              onClick={() => addToCart(elem)}
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
