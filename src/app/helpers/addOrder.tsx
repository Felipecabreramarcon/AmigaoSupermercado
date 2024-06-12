import { useEffect } from "react";

export const addOrder = (order: any) => {
  console.log(order);
  if (typeof window !== "undefined") {
    const storageData = JSON.parse(localStorage.getItem("Orders") as string);
    if (storageData) {
      localStorage.setItem("Orders", JSON.stringify([...storageData, order]));
    } else {
      localStorage.setItem("Orders", JSON.stringify([order]));
    }
  }
};
