import { ArrowLeft } from "lucide-react";
import { ItemsRow } from "../items/itemsRow";

export const FavoritesScreen = ({
  favoriteItems,
  isOpenFavorite,
  setIsOpenFavorite,
  addToCart,
  setCartItems,
  onFavoriteClick,
  setFavoriteItems,
  searchData,
}: any) => {
  if (favoriteItems?.length === 0 && isOpenFavorite) {
    setIsOpenFavorite(false);
    document.body.style.overflowY = "unset";
  }

  return (
    <div
      className={`fixed py-32 z-20 flex flex-col overflow-hidden justify-center items-center w-screen h-screen top-24 bg-white  ${
        favoriteItems?.length > 0 && isOpenFavorite ? "" : "hidden"
      }
       `}
    >
      <div
        onClick={() => {
          setIsOpenFavorite(false);
          document.body.style.overflowY = "unset";
        }}
        className="w-40 text-xl hover:text-white transition-all duration-200 hover:bg-[#203669] font-bold text-[#203669] absolute top-8 gap-2 border-4 border-[#203669] h-14 left-8 cursor-pointer rounded-[10px] flex justify-center items-center "
      >
        Voltar
        <ArrowLeft size={30} />
      </div>
      <h1 className="absolute top-12 text-3xl font-bold text-[#203669]">
        Favoritados
      </h1>
      <div className="w-full overflow-y-auto py-20">
        <ItemsRow
          data={favoriteItems}
          favoriteItems={favoriteItems}
          setCartItems={setCartItems}
          searchData={searchData}
          addToCart={addToCart}
          onFavoriteClick={onFavoriteClick}
          setFavoriteItems={setFavoriteItems}
        />
      </div>
      {favoriteItems?.nome}
    </div>
  );
};
