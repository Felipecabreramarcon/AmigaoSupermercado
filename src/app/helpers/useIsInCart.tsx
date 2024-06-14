import { useEffect, useState } from "react";

export const useIsInCart = (id: number) => {
  const [quantity, setQuantity] = useState<any>(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
      setInterval(() => {
        setLoading(false);
      }, 3000);

      const storageData = JSON.parse(localStorage.getItem("User") as string);
      if (storageData) {
        const actualUser = JSON.parse(
          localStorage.getItem("actualUser") as string
        );
        const userData = storageData.find(
          (el: any) => el.email === actualUser.email
        );
        const item = userData?.cart.find((el: any) => el?.id === id);
        if (item) {
          setQuantity(item.quantity);
        } else {
          setQuantity(0);
        }
      }
    }
  }, [id, refresh]);

  return { loading, quantity, setRefresh };
};
