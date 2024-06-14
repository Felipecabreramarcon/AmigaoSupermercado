"use client";

import { GeneralPage } from "./Screens/GeneralPage";
import { OrdersScreen } from "./Screens/OrdersScreen";
import { StockPage } from "./Screens/Stockpage";
import { UsersPage } from "./Screens/UsersPage";

export const CreateAdminSelected = ({
  selected,
  allStorageData,
  rerender,
  products,
  setProducts,
  loading,
}: any) => {
  if (selected === 0) {
    return (
      <GeneralPage
        loading={loading}
        produtos={products}
        allStorageData={allStorageData}
      />
    );
  }

  if (selected === 1) {
    return <UsersPage allStorageData={allStorageData} />;
  }

  if (selected === 2) {
    return (
      <StockPage
        products={products}
        setProducts={setProducts}
        rerender={rerender}
      />
    );
  }
  if (selected === 3) {
    return <OrdersScreen allStorageData={allStorageData} />;
  }
};
