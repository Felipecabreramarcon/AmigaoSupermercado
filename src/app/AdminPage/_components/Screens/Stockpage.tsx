import { PackageSearch, Trash, Trash2, UsersRound } from "lucide-react";
import { Header } from "./Header";
import { useGetStorageData } from "@/app/helpers/useGetStorageData";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/forms/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formatCurrencyText } from "@/app/helpers/formatCurrencyText";

const productSchema = z.object({
  nome: z.string().min(1, "Campo obrigatório"),
  img: z.string().min(1, "Campo obrigatório"),
  preco: z.string().min(1, "Campo obrigatório"),
  desc: z.string().min(1, "Campo obrigatório"),
});

export const StockPage = ({ rerender, products, setProducts }: any) => {
  const { allStorageData, setAllStorageData, loading, setRefresh } =
    useGetStorageData();

  const {
    setValue,
    register,
    setError,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: any) => {
    const newProduct = {
      id: products.length + 1,
      nome: data.nome,
      img: data.img,
      preco: formatCurrencyText(data.preco),
      desc: data.desc,
    };

    setProducts([newProduct, ...products]);
    reset();
  };
  const deleteProduct = (id: number) => {
    const newProducts = products.filter((elem: any) => elem.id !== id);
    setProducts(newProducts);
  };

  console.log(errors, products);
  return (
    <div className="w-5/6 h-full flex  flex-col bg-[#f5f5f5]">
      <Header />
      <div className="w-full  bg-[#c5b8b88c] h-full pt-10 flex flex-col">
        {!loading ? (
          <>
            <div className="w-full gap-y-16 px-20 gap-5 grid justify-center grid-cols-3">
              <div className=" w-full rounded-3xl shadow-2xl h-48 flex pl-16 justify-between items-center bg-[#ffffff8c] ">
                <PackageSearch size={75} />{" "}
                <div className="flex gap-2 w-full pl-8 h-1/2 pt-2 flex-col ">
                  <span className="text-2xl font-semibold">
                    Número de Produtos Cadastrados
                  </span>
                  <span className="text-xl font-bold ">{products?.length}</span>
                </div>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" w-full  px-6 py-2 col-span-2 gap-1 rounded-3xl shadow-2xl h-48 flex-col  flex items-center bg-[#ffffff8c] "
              >
                <div className="flex  flex-row w-full ">
                  {" "}
                  <div className="flex  flex-col px-2 relative h-20 w-[40%] ">
                    <label className="font-semibold">Nome</label>
                    <input
                      {...register("nome")}
                      type="text"
                      className="w-full border-2 focus:outline-none border-[--inputs-border] rounded h-12 px-2 text-sm"
                      placeholder="Molho de azeitona"
                    />
                    {errors.nome && (
                      <span className="absolute self-end pr-2 text-sm text-red-500 top-1 ">
                        {errors.nome.message}
                      </span>
                    )}
                  </div>
                  <div className="flex  flex-col px-2 relative h-20 w-[40%] ">
                    <label className="font-semibold">Url da imagem</label>

                    <input
                      {...register("img")}
                      type="text"
                      className="w-full border-2 focus:outline-none border-[--inputs-border] rounded h-12 px-2 text-sm"
                      placeholder="www.fotodeumacaixadesalgado.jpg"
                    />
                    {errors.nome && (
                      <span className="absolute self-end pr-2 text-sm text-red-500 top-1 ">
                        {errors.nome.message}
                      </span>
                    )}
                  </div>{" "}
                  <div className="flex  flex-col px-2 relative h-20 w-52 ">
                    <label className="font-semibold">Preço</label>
                    <input
                      {...register("preco")}
                      type="text"
                      className="w-full border-2 focus:outline-none border-[--inputs-border] rounded h-12 px-2 text-sm"
                      placeholder="R$ 5,00"
                    />
                    {errors.nome && (
                      <span className="absolute self-end pr-2 text-sm text-red-500 top-1 ">
                        {errors.nome.message}
                      </span>
                    )}
                  </div>
                </div>{" "}
                <div className="flex w-full ">
                  {" "}
                  <div className="flex flex-col px-2 relative h-20  w-full">
                    <label className="font-semibold">Descrição</label>
                    <input
                      {...register("desc")}
                      className="w-full border-2 focus:outline-none border-[--inputs-border] rounded h-14 px-2 text-sm"
                      placeholder="Descrição do produto"
                      type="text"
                    />
                    {errors.nome && (
                      <span className="absolute self-end pr-2 text-sm text-red-500 top-1 ">
                        {errors.nome.message}
                      </span>
                    )}
                  </div>
                  <div className="w-[25%] p-1 pr-3 flex flex-col items-center justify-end ">
                    {" "}
                    <Button type="submit" label={"Adicionar novo"} />
                  </div>
                </div>
              </form>
            </div>
            <div className="h-full  w-full flex flex-col pt-10 pb-10 px-20 ">
              <div className="w-auto flex overflow-x-auto h-full ">
                <div className="flex h-full pb-4 gap-4">
                  {products?.map((elem: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="w-96 relative rounded-xl  shadow-2xl gap-2 flex flex-col py-5  items-center bg-white"
                      >
                        <div
                          onClick={() => deleteProduct(elem.id)}
                          className="absolute right-6 text-[--text-color2] cursor-pointer transition hover:text-black"
                        >
                          {<Trash2 />}
                        </div>
                        <span className="text-lg font-semibold pr-6 truncate h-1/6 w-5/6">
                          {elem.nome}
                        </span>
                        <img
                          src={elem.img}
                          className="w-28 h-28 border-2 border-[--inputs-border] p-2"
                        />
                        <div className="flex w-full mt-2 px-4 flex-col ">
                          {" "}
                          <label className="text-base font-semibold">
                            Descrição
                          </label>
                          <span className="w-full text-xl h-56 overflow-y-auto px-2">
                            {elem.desc}
                          </span>
                        </div>{" "}
                        <div className="flex w-full justify-center mt-2 px-4 flex-col ">
                          {" "}
                          <label className="text-base font-semibold">
                            Preço
                          </label>
                          <span className="w-full text-xl text-red-500 font-semibold  overflow-y-auto px-2">
                            {elem.preco}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div className="h-40 w-40 mb-10 bg-transparent animate-[spin_1s_ease_infinite] border-8 rounded-full border-[--inputs-border] border-b-[--button-color]"></div>
          </div>
        )}
      </div>
    </div>
  );
};
