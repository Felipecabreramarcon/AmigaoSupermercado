"use client";
import { ShoppingBasket, Truck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Sidebar } from "./_components/Sidebar";
import { CreateAdminSelected } from "./_components/CreateAdminSelected";
import { useGetStorageData } from "../helpers/useGetStorageData";
import { allItems } from "../items/allItems";

const options = ["Usuários", "Editar produtos", "Pedidos", "Configurações"];

const AdminPage = () => {
  const [selected, setSelected] = useState(0);
  const { allStorageData, setAllStorageData, setRefresh, loading } =
    useGetStorageData();
  const [products, setProducts] = useState<any>([]);

  const rerender = () => {
    setRefresh(true);
  };

  useEffect(() => {
    const actualizeLocal = () => {
      const stock = JSON.parse(localStorage.getItem("stockItems") as string);
      if (products.length > 0 && products.length !== stock.length) {
        localStorage.setItem("stockItems", JSON.stringify(products));
        setRefresh(true);
      }
    };
    actualizeLocal();
  }, [products]);

  useEffect(() => {
    if (!loading) {
      setProducts(allStorageData.stockItems);
    }
  }, [loading]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("stockItems") as string);
    if (data.length === 0) {
      localStorage.setItem("stockItems", JSON.stringify(allItems()));
    }
  }, []);

  const handleChangeSelected = (index: number) => {
    setSelected(index);
  };

  return (
    <div className="h-screen w-screen flex justify-end items-center">
      <Sidebar
        rerender={rerender}
        selected={selected}
        handleChangeSelected={handleChangeSelected}
      />
      <CreateAdminSelected
        loading={loading}
        products={products}
        setProducts={setProducts}
        rerender={rerender}
        allStorageData={allStorageData}
        selected={selected}
      />
    </div>
  );
};

export default AdminPage;
