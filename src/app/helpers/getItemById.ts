
export const getItemById = (id: number) => {
  if (typeof window !== "undefined") {
    const itemsList = JSON.parse(localStorage.getItem("stockItems") as string);



    return itemsList?.find((item: any) => item.id === id);




  }
};
