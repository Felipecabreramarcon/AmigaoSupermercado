import { allItems } from "../items/allItems";
import { useGetStorageData } from "./useGetStorageData";

export const getItemsByGenre = (genre: string) => {


  const itemsList = JSON.parse(localStorage.getItem("stockItems") as string);

  if (genre === "Todos os Produtos") return itemsList;

  return itemsList?.filter((item: any) => item.categoria === genre);
};
