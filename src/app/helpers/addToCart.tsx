export const addToCart = (item: any, quant: number, setCartItems: any) => {
  if (item) {
    setCartItems((prev: any) => {
      if (!prev.find((el: any) => el.id === item.id)) {
        return [...prev, { ...item, quantity: quant || 1 }];
      }

      const newData = prev.map((el: any) => {
        if (el.id === item.id) {
          return { ...el, quantity: el.quantity + quant || 1 };
        } else {
          return { ...el, quantity: el?.quantity || 1 };
        }
      });
      console.log(newData, "newData");
      return [...newData];
    });
  }
};

export const onFavoriteClick = (
  item: any,
  favoriteItems: any,
  setFavoriteItems: any
) => {
  console.log("entrou");
  if (item && favoriteItems?.find((el: any) => el.id === item.id)) {
    console.log("entrou if1");
    setFavoriteItems((prev: any) => {
      return prev?.filter((el: any) => el.id !== item.id);
    });
  } else if (item && !favoriteItems?.find((el: any) => el.id === item.id)) {
    console.log("entrou if2");
    setFavoriteItems((prev: any) => {
      return [...prev, item];
    });
  }
};
