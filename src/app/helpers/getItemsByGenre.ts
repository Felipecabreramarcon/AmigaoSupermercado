import { allItems } from "../items/allItems";
import { useGetStorageData } from "./useGetStorageData";

export const getItemsByGenre = (genre: string) => {
  const { allStorageData, setAllStorageData, loading } = useGetStorageData();

  const itemsList = allStorageData.stockItems;

  if (genre === "Todos os Produtos") return itemsList;

  return itemsList?.filter((item: any) => item.categoria === genre);
};
