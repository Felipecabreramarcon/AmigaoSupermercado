import { Button } from "@/app/components/forms/Button";
import { PackageSearch, ShoppingBag, UsersRound } from "lucide-react";
import { Header } from "./Header";

export const GeneralPage = ({ allStorageData, produtos, loading }: any) => {
  const usuarios = allStorageData.users;
  const pedidos = allStorageData.orders;

  return (
    <div className="w-5/6 h-full flex  flex-col bg-[#f5f5f5]">
      <Header />
      <div className="w-full  bg-[#c5b8b88c] h-full pt-20 flex flex-col">
        {!loading ? (
          <div className="w-full gap-y-16 px-20  grid justify-center grid-cols-2">
            <div className=" w-[90%] rounded-3xl shadow-2xl h-44 flex pl-16 justify-between items-center bg-[#ffffff8c] ">
              <UsersRound size={75} />{" "}
              <div className="flex gap-2 w-full pl-8 h-1/2 pt-2 flex-col ">
                <span className="text-2xl font-semibold">
                  Número de Usuários Cadastrados
                </span>
                <span className="text-3xl font-bold">{usuarios?.length}</span>
              </div>
            </div>

            <div className="shadow-2xl rounded-3xl w-[90%] flex pl-16 justify-between items-center bg-[#ffffff8c] ">
              <PackageSearch size={75} />
              <div className="flex gap-2 pl-8 w-full h-1/2 pt-2 flex-col ">
                <span className="text-2xl font-semibold">
                  Número de Produtos Cadastrados
                </span>
                <span className="text-3xl font-bold">{produtos?.length}</span>
              </div>
            </div>

            <div className=" w-[90%] rounded-3xl shadow-2xl h-44 flex pl-16 justify-between items-center bg-[#ffffff8c] ">
              <ShoppingBag size={75} />{" "}
              <div className="flex gap-2 w-full pl-8 h-1/2 pt-2 flex-col ">
                <span className="text-2xl font-semibold">
                  Número de Pedidos feitos
                </span>
                <span className="text-3xl font-bold">{pedidos?.length}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div className="h-40 w-40 mb-10 bg-transparent animate-[spin_1s_ease_infinite] border-8 rounded-full border-[--inputs-border] border-b-[--button-color]"></div>
          </div>
        )}
      </div>
    </div>
  );
};
