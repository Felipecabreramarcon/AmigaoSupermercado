import { allItems } from "../items/allItems";

export const getItemById = (id: number) => {
  const itemsList = allItems();
  return itemsList?.find((item: any) => item.id === id);
};
