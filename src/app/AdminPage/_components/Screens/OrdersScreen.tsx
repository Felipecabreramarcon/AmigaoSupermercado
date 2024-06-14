import { Button } from "@/app/components/forms/Button";
import { PackageSearch, ShoppingBag, UsersRound } from "lucide-react";
import { Header } from "./Header";

export const OrdersScreen = ({ allStorageData }: any) => {
  const pedidos = allStorageData?.orders;

  return (
    <div className="w-5/6 h-full flex  flex-col bg-[#f5f5f5]">
      <Header />

      <div className="w-full  bg-[#c5b8b88c] h-full pt-20 gap-20 flex flex-col">
        <div className="w-full gap-y-16 px-20 grid justify-center grid-cols-2">
          <div className=" w-[60%] rounded-3xl shadow-2xl h-32 flex pl-8 justify-between items-center bg-[#ffffff8c] ">
            <ShoppingBag size={50} />{" "}
            <div className="flex gap-1 w-full pl-8  pt-2 flex-col ">
              <span className="text-lg font-semibold">Número de Pedidos</span>
              <span className="text-2xl font-bold">{pedidos?.length}</span>
            </div>
          </div>
        </div>

        <div className="w-full px-20 gap-4 flex flex-col">
          <div className="w-full flex text-xl px-2 font-semibold items-center justify-between ">
            <span className="w-56">Id Pedido</span>
            <span className="w-56">Método de Entrega</span>

            <span className="w-56">Destino</span>
            <span className="w-56">Método de Pagamento</span>
            <span className="w-56 text-right">Contato</span>
          </div>
          {pedidos?.map((el: any, index: number) => {
            console.log(el);
            return (
              <div
                key={index}
                className="w-full px-2  rounded-md hover:shadow-2xl  transition-all shadow-lg h-14 flex  justify-between items-center bg-[#ffffff8c] "
              >
                <span className="w-56 text-lg">#{el.orderId}</span>
                <span className="w-56 text-lg">{el.metodoEntrega}</span>
                <span className="w-56 text-lg">
                  {el?.endereco.cidade || "N/A"}
                </span>
                <span className="w-56 text-lg text-center  ">
                  {el.metodoPagamento}
                </span>
                <span className="w-56 text-right text-lg">
                  {el.endereco.telefone}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
