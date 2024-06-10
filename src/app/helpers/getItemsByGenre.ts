import { allItems } from "../items/allItems";

export const getItemsByGenre = (genre: string) => {
  const itemsList = allItems();

  if (genre === "Todos os Produtos") return itemsList;

  return itemsList?.filter((item: any) => item.categoria === genre);
};
