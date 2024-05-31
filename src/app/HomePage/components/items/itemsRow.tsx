import { Button } from "@/app/components/forms/Button";

export const ItemsRow = ({ data, addToCart }: any) => {
  return (
    <div className="w-full m-auto h-auto grid sm:grid-cols-3 2xl:grid-cols-5 gap-y-10 gap-x-4 px-10">
      {data.map((elem: any, index: number) => {
        return (
          <div
            className=" w-60 bg-white border-2 px-6 flex flex-col justify-center items-center place-self-center gap-5 h-96 py-10 rounded-xl"
            key={index}
          >
            <img className="w-24" src={elem.img} alt="" />
            <span className="h-20 text-sm text-black">{elem.nome}</span>
            <span className="text-lg text-red-500 font-bold">{elem.preco}</span>
            <Button
              label="Adicionar ao carrinho"
              addToCart={addToCart}
              cartItem={elem}
              style="addToCart"
            />
          </div>
        );
      })}
    </div>
  );
};
