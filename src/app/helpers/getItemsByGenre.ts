import { allItems } from "../items/allItems";

export const getItemsByGenre = (genre: string) => {
  const itemsList = allItems();
  // console.log(itemsList);
  // console.log(itemsList?.filter((item: any) => item.categoria === genre));
  return itemsList?.filter((item: any) => item.categoria === genre);
};
