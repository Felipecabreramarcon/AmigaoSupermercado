import { ShoppingBasket, Truck, Users } from "lucide-react";

export const Sidebar = ({ handleChangeSelected, selected, rerender }: any) => {
  return (
    <div className="h-full fixed left-0 w-1/6 bg-[#15283c] shadow-lg  bg-[url(https://themewagon.github.io/pluto/images/layout_img/pattern_h.png)]">
      <div className="bg-[#214162] h-32 flex">
        <div className="h-full pl-10 flex justify-center items-center">
          <img
            className="w-20 h-20"
            src="https://cdn-icons-png.freepik.com/512/8742/8742495.png"
            alt=""
          />
          <div className="flex px-5 gap-1 flex-col ">
            <span className="text-xl font-semibold text-white">Admin</span>
            <span className="font-normal text-green-600">administrador</span>
          </div>
        </div>
      </div>
      <div
        className={`w-full flex items-center  cursor-pointer bg-[#15283c] font-semibold text-white text-[20px] h-16 border-b-[#ff5722] text-center px-2 py-2 border-b-[1px]`}
      >
        <div
          onClick={() => {
            handleChangeSelected(0);
            rerender();
          }}
          className={`h-full items-center pl-4 rounded flex ${
            selected === 0 && "bg-[#253d57] "
          } w-full hover:bg-[#253d57] `}
        >
          Geral
        </div>
      </div>
      <div className={`flex flex-col pt-5 gap-2 h-full w-full text-white px-4`}>
        <div
          onClick={() => {
            handleChangeSelected(1);
            rerender();
          }}
          className={`flex h-14 ${
            selected === 1 && "bg-[#253d57]"
          } font-medium px-4 rounded transition-all cursor-pointer hover:bg-[#253d57] gap-5 text-lg items-center w-full`}
        >
          <Users size={25} />
          Usuários
        </div>
        <div
          onClick={() => {
            handleChangeSelected(2);
            rerender();
          }}
          className={`flex h-14 ${
            selected === 2 && "bg-[#253d57] "
          } font-medium px-4 rounded transition-all cursor-pointer hover:bg-[#253d57] gap-5 text-lg items-center w-full`}
        >
          <ShoppingBasket size={25} />
          Editar produtos
        </div>
        <div
          onClick={() => {
            handleChangeSelected(3);
            rerender();
          }}
          className={`flex h-14 ${
            selected === 3 && "bg-[#253d57] "
          } font-medium px-4 rounded transition-all cursor-pointer hover:bg-[#253d57] gap-5 text-lg items-center w-full`}
        >
          <Truck size={25} />
          Pedidos
        </div>
      </div>
    </div>
  );
};
