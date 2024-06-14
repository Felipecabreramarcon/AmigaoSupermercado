import { Button } from "@/app/components/forms/Button";
import { PackageSearch, ShoppingBag, UsersRound } from "lucide-react";
import { Header } from "./Header";

export const UsersPage = ({ allStorageData }: any) => {
  const usuarios = allStorageData.users;
  const pedidos = allStorageData.orders;
  const produtos = allStorageData.stockItems;

  return (
    <div className="w-5/6 h-full flex  flex-col bg-[#f5f5f5]">
      <Header />

      <div className="w-full  bg-[#c5b8b88c] h-full pt-20 gap-20 flex flex-col">
        <div className="w-full gap-y-16 px-20 grid justify-center grid-cols-2">
          <div className=" w-[60%] rounded-3xl shadow-2xl h-32 flex pl-8 justify-between items-center bg-[#ffffff8c] ">
            <UsersRound size={50} />{" "}
            <div className="flex gap-2 w-full pl-8  pt-2 flex-col ">
              <span className="text-lg font-semibold">
                Número de Usuários Cadastrados
              </span>
              <span className="text-2xl font-bold">{usuarios?.length}</span>
            </div>
          </div>
        </div>

        <div className="w-full px-20 gap-4 flex flex-col">
          <div className="w-[90%] px-32 flex text-2xl font-semibold justify-between ">
            <span>E-mail</span>
            <span>Data de nascimento</span>
          </div>
          {usuarios.map((el: any, index: number) => {
            return (
              <div
                key={index}
                className="w-[90%] px-32 rounded-md hover:shadow-2xl  transition-all shadow-lg h-14 flex pl-24 justify-between items-center bg-[#ffffff8c] "
              >
                <span className="w-32">{el.email}</span>
                <span className="w-40">{el.nascimento}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
