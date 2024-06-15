import { useEffect, useState } from "react";

export const useGetStorageData = () => {
  const [storageData, setStorageData] = useState<any>(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [favoriteItems, setFavoriteItems] = useState<any>([]);
  const [cartItems, setCartItems] = useState<any>([]);
  const [allStorageData, setAllStorageData] = useState<any>([]);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
      setLoading(true);

      console.log("entrei");

      setAllStorageData({
        orders: JSON.parse(localStorage.getItem("Orders") as string),
        users: JSON.parse(localStorage.getItem("User") as string),
        stockItems: JSON.parse(localStorage.getItem("stockItems") as string),
      });
      const storageData = JSON.parse(localStorage.getItem("User") as string);
      if (storageData) {
        const actualUser = JSON.parse(
          localStorage.getItem("actualUser") as string
        );
        const userData = storageData.find(
          (el: any) => el.email === actualUser.email
        );
        setStorageData(userData);
        console.log(userData);
        const stockItems = JSON.parse(
          localStorage.getItem("stockItems") as string
        );

        if (stockItems && userData) {
          console.log("fasdsaf");
          const cartItemsfilthered = userData?.cart?.filter((elem: any) => {
            return stockItems?.find((el: any) => {
              console.log("elem.id", elem.id, el.id);
              return el.id === elem.id;
            });
          });
          console.log("cartItemsfilthered", cartItemsfilthered);
          console.log(allStorageData);

          setFavoriteItems(userData.favorites);
          setCartItems(cartItemsfilthered);
        }
        setLoading(false);
      }
    }
  }, [refresh]);

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem("User") as string);

    if (usersData && cartItems) {
      const newData = usersData.map((data: any) => {
        if (data.email === storageData.email) {
          return { ...data, cart: [...cartItems] };
        } else {
          return data;
        }
      });
      localStorage.setItem("User", JSON.stringify(newData));
    }
  }, [cartItems]);

  console.log(allStorageData);
  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem("User") as string);

    if (usersData && favoriteItems) {
      const favoriteItemsfilthered = favoriteItems.filter((elem: any) => {
        return allStorageData.stockItems.find((el: any) => el.id === elem.id);
      });

      console.log("aiai", favoriteItemsfilthered);
      const newData = usersData.map((data: any) => {
        if (data.email === storageData.email) {
          return { ...data, favorites: [...favoriteItemsfilthered] };
        } else {
          return data;
        }
      });
      localStorage.setItem("User", JSON.stringify(newData));
    }
  }, [favoriteItems]);

  return {
    setAllStorageData,
    allStorageData,
    loading,
    storageData,
    setRefresh,
    favoriteItems,
    setFavoriteItems,
    cartItems,
    setCartItems,
  };
};
