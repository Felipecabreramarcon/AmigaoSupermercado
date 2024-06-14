import { allItems } from "../items/allItems";
import { useGetStorageData } from "./useGetStorageData";

export const getItemById = (id: number) => {
  const { allStorageData, setAllStorageData, loading } = useGetStorageData();

  if (!loading) {
    const itemsList = allStorageData.stockItems;
    return itemsList?.find((item: any) => item.id === id);
  }
};
